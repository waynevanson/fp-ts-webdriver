import { stop, defaultInstance } from "geckodriver"

export default async function () {
  const really = new Promise<void>((resolve) =>
    defaultInstance?.once("exit", () => resolve())
  )
  stop()
  await really
}
