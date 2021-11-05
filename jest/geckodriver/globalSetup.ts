import { start } from "geckodriver"

export default async function () {
  start(["--port=9000", "--verbose"])

  await new Promise((res) => setTimeout(res, 5_000))
}
