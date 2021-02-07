import * as cd from "../src/chromedriver"

export const setupChromeDriverJest = () => {
  beforeAll(async () => {
    await cd.start(9515)()
  })

  afterAll(async () => {
    await cd.stop()
  })
}
