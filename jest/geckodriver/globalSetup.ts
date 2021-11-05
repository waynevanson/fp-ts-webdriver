import { start } from "geckodriver"

export default async function () {
  start(["--port 7000", "--verbose"])

  await new Promise((res) => setTimeout(res, 5_000))
}
