import {
  either as E,
  readerTaskEither as RTE,
  taskEither as TE,
  task as T,
  console as C,
} from "fp-ts"
import { constVoid, identity, pipe } from "fp-ts/lib/function"
import { webdriver as WD } from "../../src"
import cd from "chromedriver"
import { Capabilities } from "../../src/codecs"

const start = (...args: string[]) =>
  TE.tryCatch(() => cd.start(args, true), identity)

const stop = TE.tryCatch(
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

/**
 * @description
 * These tests must have the `--runInBand` flag in jest turned on,
 * so they're run in series.
 */
const port = 4444
const dependencies = { url: `http://localhost:${port}` }

// runs in headless!
const capabilities: Capabilities = {
  alwaysMatch: {
    "goog:chromeOptions": { args: ["--headless"] },
  },
}

describe("webdriver", () => {
  beforeAll(async (done) => {
    await pipe(
      start(`--port=${port}`),
      T.map(
        E.fold(
          (e): void => done.fail(String(e)),
          () => done()
        )
      )
    )()
  })

  afterAll(async (done) => {
    await pipe(
      stop,
      T.map(
        E.fold(
          (e): void => done.fail(String(e)),
          () => done()
        )
      )
    )()
  }, 10000)

  describe("newSession", () => {
    test("creates and deletes a new session", async () => {
      const result = await pipe(
        WD.newSession({ capabilities }),
        RTE.chain(WD.deleteSession)
      )(dependencies)()

      expect(result).toMatchObject(E.right(constVoid()))
    })

    test("navigateTo", async () => {
      const result = await pipe(
        WD.newSession({ capabilities }),
        RTE.chainFirst(WD.navigateTo("https://google.com.au")),
        RTE.chain(WD.deleteSession)
      )(dependencies)()

      expect(result).toMatchObject(E.right(constVoid()))
    })
  })

  test("status", async () => {
    const result = await pipe(
      WD.newSession({ capabilities }),
      RTE.bindW("status", () => WD.status),
      RTE.chainFirst((session) => WD.deleteSession(session)),
      RTE.map(({ status }) => status)
    )(dependencies)()

    expect(result).toMatchObject(
      E.right({
        message: "ChromeDriver ready for new sessions.",
        ready: true,
      })
    )
  })
})
