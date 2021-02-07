import * as cd from "../src/chromedriver"

export const setupChromeDriverJest = () => {
  beforeAll(async () => {
    await cd.start()
  })

  afterAll(async () => {
    await cd.stop()
  })
}
