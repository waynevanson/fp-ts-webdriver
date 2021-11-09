import { start } from "chromedriver"

export default async function () {
  await start(["--port=9000"], true)
}
