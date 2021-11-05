import { default as crossfetch } from "cross-fetch"
import { fetchCustom, jsonParser } from "fp-fetch"
import { either as E } from "fp-ts"

export const fetch = fetchCustom<unknown, E.Json>({
  parser: jsonParser,
  errorParser: jsonParser,
  fetch: crossfetch,
})

/**
 * @summary
 * `JSON.stringify` that returns the error as `Left<TypeError>` instead of being uncast.
 */
export const stringifyJson = (i: unknown) =>
  E.stringifyJSON(i, (e) => e as TypeError)
