import { either as E, readerTaskEither as RTE } from "fp-ts"
import { constVoid, pipe } from "fp-ts/lib/function"
import { readerReaderTaskEither as RRTE, webdriver as WD } from "../src"
import { Capabilities } from "../src/codecs"
import { chromedriverJestSetup } from "./chromedriver"

const port = 4444
const dependencies: WD.Dependencies = { endpoint: `http://localhost:${port}` }

// runs in headless!
const capabilities: Capabilities = {
  alwaysMatch: {
    "goog:chromeOptions": { args: ["--headless"] },
  },
}

const body = { capabilities }

const runTest = <A>(fa: WD.WebdriverSession<A>) =>
  pipe(fa, WD.runSession(body))(dependencies)

// increase this if tests timeout
jest.setTimeout(30000)

describe("webdriver", () => {
  // engage jest hooks for the chromedriver.
  chromedriverJestSetup(port)()

  describe("Sessions", () => {
    describe("newSession/deleteSession", () => {
      test("creates and deletes a new session", async () => {
        const result = await pipe(
          WD.newSession(body),
          RTE.chain(WD.deleteSession)
        )(dependencies)()

        expect(result).toMatchObject(E.right(constVoid()))
      })
    })

    describe("status", () => {
      test("status returns ready when a window is made", async () => {
        const result = await pipe(() => WD.status, runTest)()

        expect(result).toMatchObject(
          E.right({
            message: "ChromeDriver ready for new sessions.",
            ready: true,
          })
        )
      })

      test("status returns ready when there is no session active", async () => {
        const result = await WD.status(dependencies)()

        expect(result).toMatchObject(
          E.right({
            message: "ChromeDriver ready for new sessions.",
            ready: true,
          })
        )
      })
    })
  })

  describe("Navigation", () => {
    describe("navigateTo", () => {
      test("navigateTo", async () => {
        const result = await pipe(
          WD.navigateTo("https://google.com.au"),
          runTest
        )()

        expect(result).toMatchObject(E.right(constVoid()))
      })
    })

    describe("Timeouts", () => {
      describe("getTimeouts", () => {
        test("get the default timeouts for the page", async () => {
          const result = await pipe(WD.getTimeouts, runTest)()

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

    describe("setTimeouts", () => {
      test("sets the timeouts, ensuring they've changed", async () => {
        const timeouts = {
          implicit: 0,
          pageLoad: 40000,
          script: 40000,
        }

        const result = await pipe(
          WD.setTimeouts(timeouts),
          RRTE.chain(() => WD.getTimeouts),
          runTest
        )()

        expect(result).toMatchObject(E.right(timeouts))
      })
    })
  })

  describe("Navigation", () => {
    describe("getCurrentUrl", () => {
      test("gets the current url", async () => {
        const url = "https://www.google.com.au/"

        const result = await pipe(
          WD.navigateTo(url),
          RRTE.chain(() => WD.getCurrentUrl),
          runTest
        )()

        expect(result).toMatchObject(E.right(url))
      })
    })

    describe("back", () => {
      test("navigate to 2 urls and navigates back to the 1st", async () => {
        const urlA = "https://www.google.com.au/"
        const urlB = "https://www.youtube.com/"
        const result = await pipe(
          WD.navigateTo(urlA),
          RRTE.chain(() => WD.navigateTo(urlB)),
          RRTE.chain(() => WD.back),
          RRTE.chain(() => WD.getCurrentUrl),
          runTest
        )()

        expect(result).toMatchObject(E.right(urlA))
      })
    })

    describe("forward", () => {
      test("navigate to 2 urls, then back, then forward", async () => {
        const urlA = "https://www.google.com.au/"
        const urlB = "https://www.youtube.com/"
        const result = await pipe(
          WD.navigateTo(urlA),
          RRTE.chain(() => WD.navigateTo(urlB)),
          RRTE.chain(() => WD.back),
          RRTE.chain(() => WD.forward),
          RRTE.chain(() => WD.getCurrentUrl),
          runTest
        )()

        expect(result).toMatchObject(E.right(urlB))
      })
    })

    describe("refresh", () => {
      test("go to a page, type in the box and refresh to see it gone", async () => {
        const urlA = "https://www.google.com.au/"
        const searchBar = WD.findElement("css selector", 'input[name="q"]')
        const searchBarText = WD.getElementAttribute("value")
        const text = "Hello, World!"

        const result = await pipe(
          WD.navigateTo(urlA),
          RRTE.chain(() => searchBar),
          RRTE.chainFirst(WD.elementSendKeys(text)),
          RRTE.chainFirst(() => WD.refresh),
          // get element again because element hash has changed
          RRTE.chain(() => searchBar),
          RRTE.chain(searchBarText),
          runTest
        )()

        expect(result).toMatchObject(E.right(""))
      })
    })
  })

  describe("Element Interaction", () => {
    describe("elementSendKeys", () => {
      test("sends keys to a search bar", async () => {
        const searchBar = WD.findElement("css selector", 'input[name="q"]')
        const searchBarText = WD.getElementAttribute("value")

        const text = "Hello, World!"

        const result = await pipe(
          WD.navigateTo("https://www.google.com.au/"),
          RRTE.chain(() => searchBar),
          RRTE.chainFirst(WD.elementSendKeys(text)),
          RRTE.chain(searchBarText),
          runTest
        )()

        expect(result).toMatchObject(E.right(text))
      })
    })
  })

  describe("Element Retrieval", () => {
    describe("findElement", () => {
      test("finds css element", async () => {
        const searchBar = WD.findElement("css selector", 'input[name="q"]')

        const test = pipe(
          WD.navigateTo("https://www.google.com.au/"),
          RRTE.chain(() => searchBar)
        )

        const result = await pipe(test, WD.runSession(body))(dependencies)()
        expect(result).toHaveProperty([
          "right",
          "element-6066-11e4-a52e-4f735466cecf",
        ])
      })
    })

    describe("getElementAttribute", () => {
      test("gets an attribute of an element", async () => {
        const searchButton = WD.findElement(
          "css selector",
          'input[value="Google Search"]'
        )

        const attribute = WD.getElementAttribute("value")

        const test = pipe(
          WD.navigateTo("https://www.google.com.au/"),
          RRTE.chain(() => searchButton),
          RRTE.chain(attribute)
        )

        const result = await pipe(test, WD.runSession(body))(dependencies)()
        expect(result).toMatchObject(E.right("Google Search"))
      })
    })
  })

  describe("Actions", () => {
    describe("performActions", () => {
      describe("null actions", () => {
        test("duration is a number greater than 0", async () => {
          const result = await pipe(
            WD.performActions([
              {
                id: "1212",
                type: "none",
                actions: [{ type: "pause", duration: 1000 }],
              },
            ]),
            runTest
          )()
          expect(result).toMatchObject(E.right(constVoid()))
        })

        test("duration is 0", async () => {
          const result = await pipe(
            WD.performActions([
              {
                id: "1212",
                type: "none",
                actions: [{ type: "pause", duration: 0 }],
              },
            ]),
            runTest
          )()

          expect(result).toMatchObject(E.right(constVoid()))
        })

        test("duration is undefined", async () => {
          const result = await pipe(
            WD.performActions([
              {
                id: "1212",
                type: "none",
                actions: [{ type: "pause" }],
              },
            ]),
            runTest
          )()

          expect(result).toMatchObject(E.right(constVoid()))
        })
      })


          const result = await pipe(test, WD.runSession(body))(dependencies)()

          expect(result).toMatchObject(E.right(constVoid()))
        })
      })
    })
  })
})
