import chromedriver from "chromedriver"
import {
  console as C,
  either as E,
  ioEither as IOE,
  task as T,
  taskEither as TE,
} from "fp-ts"
import { identity, pipe } from "fp-ts/lib/function"
import * as WD from "webdriver"
import { session, client } from "../src"

const start = (...args: string[]) =>
  TE.tryCatch(() => chromedriver.start(args, true), identity)

const stop = TE.tryCatch(
  () =>
    new Promise<void>((res, rej) => {
      try {
        chromedriver.stop()
        res()
      } catch (e) {
        rej(e)
      }
    }),
  identity
)
const bracket = <E, A, B>(
  acquire: TE.TaskEither<E, A>,
  release: (a: A, e: E.Either<E, B>) => TE.TaskEither<E, void>
) => (use: (a: A) => TE.TaskEither<E, B>) => TE.bracket(acquire, use, release)

describe("session", () => {
  beforeAll(async (done) => {
    await pipe(
      start("--port=4444"),
      TE.getOrElseW(T.fromIOK(C.warn)),
      T.map(done)
    )()
  })

  afterAll(async (done) => {
    await pipe(stop, TE.getOrElseW(T.fromIOK(C.warn)), T.map(done))()
  }, 10000)

  describe("newSession", () => {
    it("should be an instance of Webdriver", async () => {
      const props: session.NewSessionProps = {
        options: {
          capabilities: {},
        },
      }
      const result = await pipe(
        session.newSession(props),
        TE.chainIOEitherK((client) =>
          // not a chain first lol
          IOE.tryCatch(() => client.deleteSession(), identity)
        ),
        TE.getOrElseW(T.of),
        T.chainFirst(T.fromIOK(C.warn))
      )()
      expect(result).toBeInstanceOf(WD)
    })
  })
})
