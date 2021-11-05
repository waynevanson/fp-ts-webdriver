import { stop, defaultInstance } from "chromedriver"

export default async function () {
  const really = new Promise<void>((resolve) =>
    defaultInstance?.once("exit", () => resolve())
  )
  stop()
  await really
}
