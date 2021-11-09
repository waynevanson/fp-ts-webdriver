import { readerTaskEither } from "fp-ts"
import * as webdriver from "./webdriver"

const deps: webdriver.WebdriverDeps = {
  endpoint: `${globalThis.webdriver?.host}:${globalThis.webdriver?.port}`,
  capabilities: globalThis.webdriver?.capabilities as any,
  requestInit: {},
}

describe("webdriver", () => {
  describe("bracketed", () => {
    it("should open an close when given a null effect", async () => {
      const result = await webdriver.bracketed(readerTaskEither.ask())(deps)()
      expect(result).toBeRight()
    })
  })
})
