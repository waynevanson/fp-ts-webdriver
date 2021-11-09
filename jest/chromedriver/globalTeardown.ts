import { stop, defaultInstance } from "chromedriver"

export default async function () {
  await new Promise<void>((resolve) => {
    defaultInstance?.once("exit", () => resolve())
    stop()
  })
}
