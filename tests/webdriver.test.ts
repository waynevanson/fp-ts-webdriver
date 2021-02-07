import {
  either as E,
  reader as R,
  readerTask as RT,
  readerTaskEither as RTE,
} from "fp-ts"
import { flow } from "fp-ts/lib/function"
import { pipe } from "fp-ts/lib/pipeable"
import * as webdriver from "../src"
import { setupChromeDriverJest } from "./helpers"
import { responses } from "../src/codecs/"

const config: webdriver.WebdriverState = { url: "http://localhost:9515" }

describe("webdriver", () => {
  setupChromeDriverJest()

  test(
    "start and end a session",
    pipe(
      webdriver.newSession({ capabilities: {} }),
      RTE.map(({ sessionId }) => sessionId),
      RTE.chain(webdriver.deleteSession),
      RT.chain((result) =>
        RT.fromIO(() => expect(result).toMatchObject(E.right({ value: null })))
      )
    )(config)
  )

  describe("navigateTo", () => {
    test(
      "navigates to the webpage",
      pipe(
        webdriver.newSession({ capabilities: {} }),
        RTE.map(({ sessionId }) => sessionId),
        RTE.chainFirstW(webdriver.navigateTo("https://www.google.com.au")),
        RTE.chain(webdriver.deleteSession),
        RT.chain((result) =>
          RT.fromIO(() =>
            expect(result).toMatchObject(E.right({ value: null }))
          )
        )
      )(config)
    )
  })
})
