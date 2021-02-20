/**
 * @since 3.2.0
 */
import { default as crossfetch } from "cross-fetch";
import { fetchCustom, jsonParser } from "fp-fetch";
import { either as E } from "fp-ts";
/**
 * @summary
 * Removes the `Reader` interface and converts it to a standard function.
 *
 * @since 3.2.0
 */
export const readerToFn = (fa) => fa;
/**
 * @since 3.2.0
 */
export const fetch = fetchCustom({
    parser: jsonParser,
    errorParser: jsonParser,
    fetch: crossfetch,
});
/**
 * @since 3.2.0
 */
export const stringifyJson = (i) => E.stringifyJSON(i, (e) => e);
