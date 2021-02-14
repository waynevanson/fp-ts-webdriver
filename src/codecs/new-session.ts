import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import { JsonObject } from "./helpers"
import { Capabilities } from "./processing-capabilities"

export type NewSession = JsonObject & {
  capabilities: Capabilities
}

export const NewSession: c.Codec<unknown, NewSession, NewSession> = pipe(
  c.type({ capabilities: Capabilities }),
  c.intersect(JsonObject)
)
