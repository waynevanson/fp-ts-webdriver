import { constNull, constVoid, pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as s from "io-ts/Schemable"

export interface Success<A> {
  value: A
}
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

export interface Session {
  sessionId: string
  capabilities?: Record<string, unknown>
}
export const Session: c.Codec<unknown, Session, Session> = pipe(
  c.struct({ sessionId: c.string }),
  c.intersect(c.partial({ capabilities: c.UnknownRecord }))
)

export interface Status {
  ready: boolean
  message: string
}
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
