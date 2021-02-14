import { pipe } from "fp-ts/lib/function";
import * as c from "io-ts/Codec";
import { JsonObject } from "./helpers";
import { Capabilities } from "./processing-capabilities";
export const NewSession = pipe(c.type({ capabilities: Capabilities }), c.intersect(JsonObject));
