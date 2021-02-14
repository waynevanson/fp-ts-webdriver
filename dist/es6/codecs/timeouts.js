import * as c from "io-ts/Codec";
// CODECS
export const Timeouts = c.partial({
    script: c.nullable(c.number),
    pageLoad: c.number,
    implicit: c.number,
});
