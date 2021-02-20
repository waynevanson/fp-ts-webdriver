/**
 * @since 3.2.0
 */
import * as c from "io-ts/Codec";
// CODECS
/**
 * @since 3.2.0
 */
export const Timeouts = c.partial({
    script: c.nullable(c.number),
    pageLoad: c.number,
    implicit: c.number,
});
