/**
 * @since 3.2.0
 */
import { default as crossfetch } from "cross-fetch"
import { fetchCustom, jsonParser } from "fp-fetch"
import { either as E, reader as R } from "fp-ts"

/**
 * @summary
 * Removes the `Reader` interface and converts it to a standard function.
 *
 * @since 3.2.0
 */
export const readerToFn = <R, A>(fa: R.Reader<R, A>): ((r: R) => A) => fa

/**
 * @since 3.2.0
 */
export const fetch = fetchCustom<unknown, E.Json>({
  parser: jsonParser,
  errorParser: jsonParser,
  fetch: crossfetch,
})

/**
 * @since 3.2.0
 */
export const stringifyJson = (i: unknown) =>
  E.stringifyJSON(i, (e) => e as TypeError)
