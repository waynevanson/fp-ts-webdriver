/**
 * How we're naming variables:
 *
 * - functions returning codecs are camelCase
 * - codecs are PascalCase
 */
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as t from "../types"
import { Null } from "./helpers"
import * as s from "./specification"

export const success = <A>(
  value: c.Codec<unknown, A, A>
): c.Codec<unknown, t.Success<A>, t.Success<A>> => c.type({ value })

export const newSession = pipe(
  c.type({
    sessionId: c.string,
  }),
  c.intersect(c.partial({ capabilities: c.UnknownRecord })),
  success
)

export const deleteSession = success(Null)
