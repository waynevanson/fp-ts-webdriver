import { start } from "geckodriver"

export default async function () {
  const pr = start(["--port=7000"])

  // pr.stdout?.pipe(process.stdout)
  // pr.stderr?.pipe(process.stderr)

  await new Promise((res) => setTimeout(res, 5_000))
}
