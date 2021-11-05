import { either, readerTaskEither } from "fp-ts"
import * as webdriver from "./webdriver"

//@ts-ignore
console.log(globalThis.port)

const deps: webdriver.WebdriverDeps = {
  //@ts-ignore
  endpoint: `http://127.0.0.1:${globalThis.port as string}`,
  capabilities: {},
  requestInit: {},
}

describe("webdriver", () => {
  describe("bracketed", () => {
    it("should open an close when given a null effect", async () => {
      const result = await webdriver.bracketed(readerTaskEither.ask())(deps)()
      //@ts-ignore
      console.log(result?.left?.body?.value)
      //@ts-ignore
      console.log(result)
      expect(result).toMatchObject(either.right({}))
    })
  })
})
