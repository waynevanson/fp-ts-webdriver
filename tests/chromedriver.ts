/**
 * @summary
 * Start and stop chromedriver for testing in jest.
 */
import cd from "chromedriver"
import { either as E, io as IO, task as T, taskEither as TE } from "fp-ts"
import { identity, pipe } from "fp-ts/lib/function"

export const start = (...args: string[]) =>
  TE.tryCatch(() => cd.start(args, true), identity)

export const stop = TE.tryCatch(
  () =>
    new Promise<void>((res, rej) => {
      try {
        cd.stop()
        res()
      } catch (e) {
        rej(e)
      }
    }),
  identity
)

const dry = (done: jest.DoneCallback) =>
  T.map(
    E.fold(
      (e): void => done.fail(String(e)),
      () => done()
    )
  )

export const chromedriverJestSetup = (port: number): IO.IO<void> => () => {
  beforeAll(async (done) => {
    await pipe(start(`--port=${port}`, "--silent"), dry(done))()
  })

  afterAll(async (done) => {
    await pipe(stop, dry(done))()
  }, 10000)
}
