import { constNull, constVoid, pipe } from "fp-ts/lib/function";
import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
// CODECS
export function Success(value) {
    return c.type({ value: c.fromDecoder(value) });
}
export const Null = c.literal(null);
export const Literal = pipe(d.union(c.string, c.number, c.boolean), d.nullable, c.fromDecoder);
export const JsonPrimitive = Literal;
export const JsonArray = pipe(c.array(c.lazy("Json", () => Json)));
export const JsonObject = pipe(c.record(c.lazy("Json", () => Json)));
export const Json = pipe(d.union(JsonPrimitive, JsonArray, JsonObject), c.fromDecoder);
export const Session = pipe(c.type({
    sessionId: c.string,
}), c.intersect(c.partial({ capabilities: c.UnknownRecord })));
/**
 * @summary
 * `imap`s `null` to `void` to identify the combinator where the effect is important.
 */
export const NullAsVoid = pipe(c.literal(null), c.imap(constVoid, constNull));
export const Status = c.type({
    ready: c.boolean,
    message: c.string,
});
