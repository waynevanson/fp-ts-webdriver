import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import { Null } from "../helpers"

// TYPES

export interface Success<A> {
  value: A
}

// CODECS
export function Success<A>(
  value: c.Codec<unknown, A, A>
): c.Codec<unknown, Success<A>, Success<A>> {
  return c.type({ value })
}

export interface NewSession
  extends Success<{
    sessionId: string
    capabilities?: Record<string, unknown>
  }> {}

export const NewSession: c.Codec<unknown, NewSession, NewSession> = pipe(
  c.type({
    sessionId: c.string,
  }),
  c.intersect(c.partial({ capabilities: c.UnknownRecord })),
  Success
)

export const DeleteSession = Success(Null)
export const NavigateTo = Success(Null)
