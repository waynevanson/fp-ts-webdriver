import { SERVFAIL } from "dns"
import { FetchError } from "fp-fetch"
import {
  readerTaskEither as RTE,
  json as JSON,
  stateReaderTaskEither as SRTE,
} from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import { StateT1, StateT2, StateT3 } from "fp-ts/lib/StateT"
import { Success, Session } from "./codecs"
import { fetch } from "./utils"
import { Capabilities, capabilities } from "./webdriver/index"

export * from "./webdriver"

export interface Dependency {
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

export interface Webdriver<E, A>
  extends RTE.ReaderTaskEither<Dependency, E, A> {}

export interface SessionWebdriver<E, A>
  extends RTE.ReaderTaskEither<Dependency & Pick<Session, "sessionId">, E, A> {}

export function fromBodySK(
  options: Record<"method" | "command", string>
): (body: string) => SessionWebdriver<FetchError<unknown>, unknown> {
  return (body) =>
    ({ endpoint, requestInit, sessionId }) =>
      fetch(
        new URL(
          `/session/${sessionId}/${options.command}`,
          endpoint
        ).toString(),
        {
          ...requestInit,
          body,
          method: options.method,
        }
      )
}

export function fromBodyK(
  options: Record<"method" | "command", string>
): (body: string) => Webdriver<FetchError<unknown>, unknown> {
  return (body) =>
    ({ endpoint, requestInit }) =>
      fetch(new URL(options.command, endpoint).toString(), {
        ...requestInit,
        body,
        method: options.method,
      })
}

export const newSession: Webdriver<unknown, Session> = pipe(
  RTE.asks((deps: Dependency) => deps.capabilities),
  RTE.chainEitherKW(capabilities.decode),
  RTE.chainEitherKW(JSON.stringify),
  RTE.chainW(
    (capabilities) =>
      ({ endpoint, requestInit }: Dependency) =>
        fetch(new URL("/session", endpoint).toString(), {
          ...requestInit,
          method: "POST",
          body: capabilities,
        })
  ),
  RTE.chainEitherKW(pipe(Session, Success).decode)
)

export const deleteSession: SessionWebdriver<
  FetchError<unknown>,
  void
> = fromBodySK({ command: "", method: "DELETE" })("")

/**
 * Creates a session, applies the `SessionWebdriver` effect and deletes the
 * session.
 *
 * @category Constructors
 */
export function bracket<E, A>(sessionWebdriver: SessionWebdriver<E, A>) {
  return pipe(
    newSession,
    RTE.chainW((session) =>
      pipe(
        sessionWebdriver,
        RTE.chainFirstW(() => deleteSession),
        RTE.local((dependencies: Dependency) => ({
          ...dependencies,
          sessionId: session.sessionId,
        }))
      )
    )
  )
}
