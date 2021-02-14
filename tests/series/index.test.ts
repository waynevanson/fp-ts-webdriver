/**
 * @description
 * These tests must have the `--runInBand` flag in jest turned on,
 * so they're run in series.
 */
import { either as E, readerTaskEither as RTE } from "fp-ts"
import { constVoid, pipe } from "fp-ts/lib/function"
import { webdriver as WD } from "../../src"
import { Capabilities } from "../../src/codecs"
import { chromedriverJestSetup } from "./chromedriver"

const port = 4444
const dependencies = { url: `http://localhost:${port}` }

// runs in headless!
const capabilities: Capabilities = {
  alwaysMatch: {
    "goog:chromeOptions": { args: ["--headless"] },
  },
}

describe("webdriver", () => {
  chromedriverJestSetup(port)()

  describe("newSession", () => {
    test("creates and deletes a new session", async () => {
      const result = await pipe(
        WD.newSession({ capabilities }),
        RTE.chain(WD.deleteSession)
      )(dependencies)()

      expect(result).toMatchObject(E.right(constVoid()))
    })

    test("navigateTo", async () => {
      const result = await pipe(
        WD.newSession({ capabilities }),
        RTE.chainFirst(WD.navigateTo("https://google.com.au")),
        RTE.chain(WD.deleteSession)
      )(dependencies)()

      expect(result).toMatchObject(E.right(constVoid()))
    })
  })

  describe("status", () => {
    test("status", async () => {
      const result = await pipe(
        WD.newSession({ capabilities }),
        RTE.bindW("status", () => WD.status),
        RTE.chainFirst((session) => WD.deleteSession(session)),
        RTE.map(({ status }) => status)
      )(dependencies)()

      expect(result).toMatchObject(
        E.right({
          message: "ChromeDriver ready for new sessions.",
          ready: true,
        })
      )
    })
  })
})
