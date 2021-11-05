import { constNull, constVoid, pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as s from "io-ts/Schemable"

// TYPES

export interface Success<A> {
  value: A
}

export type Literal = s.Literal

export interface Session {
  sessionId: string
  capabilities?: Record<string, unknown>
}

export interface Status {
  ready: boolean
  message: string
}

// CODECS

export function Success<A>(
  value: d.Decoder<unknown, A>
): c.Codec<unknown, Success<A>, A> {
  return pipe(
    c.struct({ value: c.fromDecoder(value) }),
    c.imap(
      (a) => a.value,
      (value) => ({ value })
    )
  )
}

export const Null = c.literal(null)

export const Literal: c.Codec<unknown, Literal, Literal> = pipe(
  d.union(c.string, c.number, c.boolean),
  d.nullable,
  c.fromDecoder
)

export const Session: c.Codec<unknown, Session, Session> = pipe(
  c.type({
    sessionId: c.string,
  }),
  c.intersect(c.partial({ capabilities: c.UnknownRecord }))
)

/**
 * @summary
 * `imap` `null` to `void` to identify the combinator where the effect is important.
 */
export const NullAsVoid = pipe(c.literal(null), c.imap(constVoid, constNull))

/**
 * @summary
 * Information about the remote end's readiness state and why it is/isn't ready.
 */
export const Status: c.Codec<unknown, Status, Status> = c.type({
  /**
   * @summary
   * The remote end's readiness state: ready to take commands.
   */
  ready: c.boolean,
  /**
   * @summary
   * Message related about the ready state.
   */
  message: c.string,
})
