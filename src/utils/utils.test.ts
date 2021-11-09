import * as utils from "./index"

describe("url", () => {
  it("should return Right(URL) the same way as `new URL`", () => {
    expect(utils.url("/session", "http://localhost:9999")).toBeRight()
  })

  it("should return Left when constructing a bad URL", () => {
    expect(utils.url("/session", "")).toBeLeft()
  })

  it("should not throw when given a bad URL", () => {
    expect(() => utils.url("/session", "")).not.toThrow()
  })
})
