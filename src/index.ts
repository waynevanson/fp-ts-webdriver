import { readerTaskEither as RTE } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import { requests, responses } from "./codecs"
import { fetch } from "./utils"

export interface WebdriverState {
  url: string
}

export const newSession = (props: requests.NewSession) =>
  pipe(
    RTE.ask<WebdriverState>(),
    RTE.chainTaskEitherK(({ url }) =>
      fetch(`${url}/session`, { body: JSON.stringify(props), method: "POST" })
    ),
    RTE.chainEitherKW(responses.NewSession.decode),
    RTE.map((success) => success.value)
  )

export const deleteSession = (sessionId: string) =>
  pipe(
    RTE.ask<WebdriverState>(),
    RTE.chainTaskEitherK(({ url }) =>
      fetch(`${url}/session/${sessionId}`, { method: "DELETE" })
    ),
    RTE.chainEitherKW(responses.DeleteSession.decode)
  )

export const navigateTo = (url: string) => (sessionId: string) =>
  pipe(
    RTE.ask<WebdriverState>(),
    RTE.chainTaskEitherK((state) =>
      fetch(`${state.url}/session/${sessionId}/url`, {
        body: JSON.stringify({ url }),
        method: "POST",
      })
    ),
    RTE.chainEitherKW(responses.NavigateTo.decode)
  )
