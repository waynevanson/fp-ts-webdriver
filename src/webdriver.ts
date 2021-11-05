/**
 *
 */
import { FetchError } from "fp-fetch"
import {
  either as E,
  json as JSON,
  option as O,
  readerTaskEither as RTE,
  task as T,
  taskEither as TE,
} from "fp-ts"
import { string } from "fp-ts-std"
import { sequenceS } from "fp-ts/lib/Apply"
import { constVoid, flow, pipe } from "fp-ts/lib/function"
import { Json } from "fp-ts/lib/Json"
import { Session as SessionCodec, Success } from "./codecs"
import { fetch } from "./utils"
import { Capabilities, capabilities } from "./webdriver/index"
import * as d from "io-ts/Decoder"

export * from "./webdriver"

/**
 * @category Model
 */
export interface WebdriverDeps {
  capabilities: Capabilities
  /**
   * @summary
   * The `url` to the remote end of the webdriver.
   *
   * Local Servers:
   * - Chromedriver runs by default `localhost:9515`.
   *
   * @todo Remote Servers example
   *
   * @example
   * "localhost:4000"
   */
  endpoint: string

  /**
   * @summary
   * This is appended to fetch's `RequestInit`.
   *
   * `body` and `method` have been omitted as the webdriver protocol specifies
   * these are reserved to specify the type of command.
   */
  requestInit: Omit<RequestInit, "body" | "method">
}

/**
 * @category Model
 */
export interface Webdriver<E, A>
  extends RTE.ReaderTaskEither<WebdriverDeps, E, A> {}

/**
 * @category Model
 */
export interface CommandOptions<A> {
  method: "PUT" | "POST" | "DELETE"
  command?: O.Option<string>
  decoder: d.Decoder<unknown, A>
}

const url = E.tryCatchK(
  (...args: ConstructorParameters<typeof URL>): URL => new URL(...args),
  (e) => e as Error
)

/**
 * Create a command for a session. `/session/${sessionId}` has already been applied,
 * so use the path suffix (ie `/element/active`) of the command.
 *
 * This is used internally for all session based commands.
 *
 * @link [W3C List of Endpoints](https://www.w3.org/TR/webdriver1/#list-of-endpoints)
 *
 * @category Constructors
 */
export function command<A>(options: CommandOptions<A>) {
  return <T extends Json>(body: O.Option<T>) =>
    ({ endpoint, requestInit }: WebdriverDeps) =>
      pipe(
        E.Do,
        E.bindW("url", () =>
          pipe(
            O.fromNullable(options?.command),
            O.compact,
            O.getOrElse(() => ""),
            (path) => url(path, endpoint),
            E.map((url) => url.toString())
          )
        ),
        E.bindW("rest", () =>
          pipe(
            body,
            O.traverse(E.Applicative)(JSON.stringify),
            E.mapLeft((a) => a as TypeError | SyntaxError),
            E.map(
              O.foldW(
                () => ({}),
                (body) => ({ body })
              )
            )
          )
        ),
        TE.fromEither,
        TE.chainW(({ rest, url }) =>
          fetch(url, {
            ...requestInit,
            ...rest,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-cache",
            },
          })
        ),
        TE.chainEitherKW(Success(options.decoder).decode)
      )
}

/**
 * @category Constructors
 */
export const newSession = pipe(
  command({
    method: "POST",
    command: O.some("/session"),
    decoder: SessionCodec,
  })(O.none)
)

/**
 * @category Model
 */
export interface SessionDeps extends WebdriverDeps {
  sessionId: string
}

/**
 * A webdriver with a `sessionId` in its context.
 * @category Model
 */
export interface Session<E, A>
  extends RTE.ReaderTaskEither<SessionDeps, E, A> {}

/**
 * Create a command for a session. `/session/${sessionId}` has already been applied,
 * so use the path suffix (ie `/element/active`) of the command.
 *
 * This is used internally for all session based commands.
 *
 * @link [W3C List of Endpoints](https://www.w3.org/TR/webdriver1/#list-of-endpoints)
 *
 * @category Constructors
 */
export function commandSession<A>(options: CommandOptions<A>) {
  return <T extends Json>(body: O.Option<T>) =>
    pipe(
      RTE.asks(({ sessionId }: SessionDeps) => sessionId),
      RTE.chainW((sessionId) =>
        command({
          ...options,
          command: pipe(
            options?.command,
            O.fromNullable,
            O.compact,
            O.getOrElse(() => ""),
            (command) => `/session/${sessionId}${command}`,
            O.some
          ),
        })(body)
      )
    )
}

/**
 * @category Constructors
 */
export const deleteSession = pipe(
  commandSession({
    command: O.none,
    method: "DELETE",
    decoder: pipe(d.literal(null), d.map(constVoid)),
  })(O.none)
)

/**
 * Creates a session, runs the `Session`  and deletes the
 * session once it's complete. If the session was created, it will always be
 * deleted.
 *
 * @category Deconstructors
 * @todo fix any type
 */
export function bracketed<E, A>(sessionWebdriver: Session<E, A>) {
  return RTE.bracket(
    newSession,
    (session) => (deps) =>
      sessionWebdriver({ ...deps, sessionId: session.sessionId }) as any,
    (sessioncodec) => (deps) =>
      deleteSession({ ...deps, sessionId: sessioncodec.sessionId })
  )
}
