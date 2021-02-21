/**
 * @description
 * Please note that `fp-ts/Either#Json` is not being used because the objects
 * are ready only, leading to a poor developer experience.
 
 */
import { pipe } from "fp-ts/lib/function";
import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
import { Literal } from "./helpers";
export const JsonPrimitive = Literal;
export const JsonArray = pipe(c.array(c.lazy("Json", () => Json)));
export const JsonObject = pipe(c.record(c.lazy("Json", () => Json)));
export const Json = pipe(d.union(JsonPrimitive, JsonArray, JsonObject), c.fromDecoder);
