import geckodriver from "geckodriver"
import { taskEither as TE, io as IO, task as T, either as E } from "fp-ts"
import { pipe } from "fp-ts/lib/function"

export function start(...args: string[]) {
  return TE.tryCatch(
    () =>
      new Promise<void>((res, rej) => {
        try {
          geckodriver.start(...args).once("message", () => res())
        } catch (e) {
          rej(e)
        }
      }),
    (e) => e
  )
}

export const stop = TE.tryCatch(
  () =>
    new Promise<void>((res, rej) => {
      try {
        geckodriver.defaultInstance?.once("exit", () => res())
        geckodriver.stop()
      } catch (e) {
        rej(e)
      }
    }),
  (e) => e
)

const dry = (done: jest.DoneCallback) =>
  T.map(
    E.fold(
      (e): void => done.fail(String(e)),
      () => done()
    )
  )

// untested
export const firefoxJestSetup = (port: number): IO.IO<void> => () => {
  beforeAll(async (done) => {
    await pipe(start("-p", `${port}`), dry(done))()
  })

  afterAll(async (done) => {
    await pipe(stop, dry(done))()
  }, 10000)
}
