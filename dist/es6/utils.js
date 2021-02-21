import { default as crossfetch } from "cross-fetch";
import { fetchCustom, jsonParser } from "fp-fetch";
import { either as E } from "fp-ts";
/**
 * @summary
 * Removes the `Reader` interface and converts it to a standard function.
 */
export const readerToFn = (fa) => fa;
export const fetch = fetchCustom({
    parser: jsonParser,
    errorParser: jsonParser,
    fetch: crossfetch,
});
export const stringifyJson = (i) => E.stringifyJSON(i, (e) => e);
