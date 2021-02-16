/**
 * @description
 * These tests must have the `--runInBand` flag in jest turned on,
 * so they're run in series.
 */
import { either as E, readerTaskEither as RTE } from "fp-ts"
import { constVoid, pipe } from "fp-ts/lib/function"
import { readerReaderTaskEither as RRTE, webdriver as WD } from "../src"
import { Capabilities } from "../src/codecs"
import { chromedriverJestSetup } from "./chromedriver"

const port = 4444
const dependencies = { url: `http://localhost:${port}` }

// runs in headless!
const capabilities: Capabilities = {
  alwaysMatch: {
    "goog:chromeOptions": { args: ["--headless"] },
  },
}

const body = { capabilities }

jest.setTimeout(30000)

describe("webdriver", () => {
  chromedriverJestSetup(port)()

  describe("newSession", () => {
    test("creates and deletes a new session", async () => {
      const result = await pipe(
        WD.newSession(body),
        RTE.chain(WD.deleteSession)
      )(dependencies)()

      expect(result).toMatchObject(E.right(constVoid()))
    })

    test("navigateTo", async () => {
      const test = WD.navigateTo("https://google.com.au")
      const result = await pipe(test, WD.runSession(body))(dependencies)()

      expect(result).toMatchObject(E.right(constVoid()))
    })
  })

  describe("status", () => {
    test("status returns ready when a window is made", async () => {
      const test = () => WD.status
      const result = await pipe(test, WD.runSession(body))(dependencies)()

      expect(result).toMatchObject(
        E.right({
          message: "ChromeDriver ready for new sessions.",
          ready: true,
        })
      )
    })

    test("status returns ready when there is no session active", async () => {
      const test = WD.status
      const result = await test(dependencies)()

      expect(result).toMatchObject(
        E.right({
          message: "ChromeDriver ready for new sessions.",
          ready: true,
        })
      )
    })
  })

  describe("getCurrentUrl", () => {
    test("gets the current url", async () => {
      const url = "https://www.google.com.au/"
      const test = pipe(
        WD.navigateTo(url),
        RRTE.chain(() => WD.getCurrentUrl)
      )
      const result = await pipe(test, WD.runSession(body))(dependencies)()

      expect(result).toMatchObject(E.right(url))
    })
  })

  describe("back", () => {
    test("navigate to 2 urls and navigates back to the 1st", async () => {
      const urlA = "https://www.google.com.au/"
      const urlB = "https://www.youtube.com/"
      const test = pipe(
        WD.navigateTo(urlA),
        RRTE.chain(() => WD.navigateTo(urlB)),
        RRTE.chain(() => WD.back),
        RRTE.chain(() => WD.getCurrentUrl)
      )

      const result = await pipe(test, WD.runSession(body))(dependencies)()

      expect(result).toMatchObject(E.right(urlA))
    })
  })

  describe("getTimeouts", () => {
    test("get the default timeouts for the page", async () => {
      const test = WD.getTimeouts

      const result = await pipe(test, WD.runSession(body))(dependencies)()
      expect(result).toMatchObject(
        E.right({
          implicit: 0,
          pageLoad: 300000,
          script: 30000,
        })
      )
    })
  })
})
