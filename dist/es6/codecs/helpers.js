import { constNull, constVoid, pipe } from "fp-ts/lib/function";
import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
// CODECS
export function Success(value) {
    return c.type({ value: c.fromDecoder(value) });
}
export const Null = c.literal(null);
export const Literal = pipe(d.union(c.string, c.number, c.boolean), d.nullable, c.fromDecoder);
export const Session = pipe(c.type({
    sessionId: c.string,
}), c.intersect(c.partial({ capabilities: c.UnknownRecord })));
/**
 * @summary
 * `imap`s `null` to `void` to identify the combinator where the effect is important.
 
 */
export const NullAsVoid = pipe(c.literal(null), c.imap(constVoid, constNull));
/**
 * @summary
 * Information about the remote end's readiness state and why it is/isn't ready.
 
 */
export const Status = c.type({
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
});
