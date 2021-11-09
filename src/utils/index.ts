import { default as crossfetch } from "cross-fetch"
import { fetchCustom, jsonParser } from "fp-fetch"
import { either as E, json as Json } from "fp-ts"
import { flow } from "fp-ts/lib/function"

export const fetch = fetchCustom<unknown, Json.Json>({
  parser: jsonParser,
  errorParser: jsonParser,
  fetch: crossfetch,
})

export const stringify = flow(
  Json.stringify,
  E.mapLeft((e) => e as TypeError)
)

export const parse = flow(
  Json.parse,
  E.mapLeft((e) => e as SyntaxError)
)

export const url = E.tryCatchK(
  (...args: ConstructorParameters<typeof URL>): URL => new URL(...args),
  (e) => e as TypeError
)

export function tap(label: string) {
  return <A>(a: A): A => {
    console.dir({ [label]: a })
    return a
  }
}
