// open chromedriver
// close chromedriver
import chromedriver from "chromedriver"
import { taskEither as TE } from "fp-ts"
import { pipe } from "fp-ts/lib/function"

export const start = TE.tryCatch(
  () => chromedriver.start([`--silent`], true),
  (e) => e
)

export const stop = pipe(() => chromedriver.stop(), TE.fromIO)
