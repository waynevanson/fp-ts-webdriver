import { either as E, readerTaskEither } from "fp-ts"
import * as webdriver from "./webdriver"

//@ts-ignore
const PORT = globalThis.port as string

const deps: webdriver.WebdriverDeps = {
  //@ts-ignore
  endpoint: `http://127.0.0.1:${PORT}`,
  capabilities: {
    firstMatch: [
      {
        "goog:chromeOptions": {
          args: ["headless"],
        },
      },
    ],
  },
  requestInit: {},
}

describe("webdriver", () => {
  describe("bracketed", () => {
    it("should open an close when given a null effect", async () => {
      const result = await webdriver.bracketed(readerTaskEither.ask())(deps)()
      //@ts-ignore
      console.log(result.left.body.value)
      expect(result).toMatchObject(E.right({}))
    }, 10_000)
  })
})
