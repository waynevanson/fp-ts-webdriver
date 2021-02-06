import crossfetch from "cross-fetch"
import { fetchCustom, jsonParser } from "fp-fetch"
import { either as E, readerTaskEither as RTE } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import { responses } from "./codecs"
import { NewSessionProps } from "./types"

export const fetch = fetchCustom<unknown, E.Json>({
  parser: jsonParser,
  errorParser: jsonParser,
  fetch: crossfetch,
})

export interface WebdriverState {
  url: string
}

export const newSession = (props: NewSessionProps) =>
  pipe(
    RTE.ask<WebdriverState>(),
    RTE.chainTaskEitherK(({ url }) =>
      fetch(`${url}/session`, { body: JSON.stringify(props), method: "POST" })
    ),
    RTE.chainEitherKW(responses.newSession.decode)
  )

export const deleteSession = (sessionId: string) =>
  pipe(
    RTE.ask<WebdriverState>(),
    RTE.chainTaskEitherK(({ url }) =>
      fetch(`${url}/session/${sessionId}`, { method: "DELETE" })
    ),
    RTE.chainEitherKW(responses.deleteSession.decode)
  )
