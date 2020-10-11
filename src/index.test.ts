import { init } from "./index"

const mock = {
  consolelog: jest.spyOn(console, "log").mockImplementation(() => {
    return
  }),
}

describe(init, () => {
  test("outputs to console.log", () => {
    init()
    expect(mock.consolelog).toBeCalled()
  })
})
