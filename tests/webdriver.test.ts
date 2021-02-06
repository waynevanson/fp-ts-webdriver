import { pipe } from "fp-ts/lib/pipeable"
import * as webdriver from "../src"
import { either as E, readerTaskEither as RTE } from "fp-ts"

import * as cd from "../src/chromedriver"

const setupChromeDriverJest = () => {
  beforeAll(async () => {
    await cd.start(9515)()
  })

  afterAll(async () => {
    await cd.stop()
  })
}

describe("webdriver", () => {
  setupChromeDriverJest()

  test("start and end a session", async () => {
    const result = await pipe(
      webdriver.newSession({ capabilities: {} }),
      RTE.map(({ value: { sessionId } }) => sessionId),
      RTE.chain(webdriver.deleteSession)
    )({ url: "http://localhost:9515" })()

    expect(result).toMatchObject(E.right({ value: null }))
  }, 10000)
})
