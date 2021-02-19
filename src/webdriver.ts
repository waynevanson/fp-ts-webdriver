import { FetchError } from "fp-fetch"
import { either as E, option as O, readerTaskEither as RTE } from "fp-ts"
import { string } from "fp-ts-std"
import { Endomorphism, flow, pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import * as c from "./codecs"
import { readerReaderTaskEither as RRTE } from "./fp-ts-modules"
import { fetch, stringifyJson } from "./utils"

export interface Dependencies {
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
   * `body` and `method` have been emitted as the webdriver protocol specifies
   * these are reserved to specify the type of command.
   */
  requestInit?: Omit<RequestInit, "body" | "method">
}
/**
 * @summary
 * Errors expected between:
 * - Handling unsuccessful response codes.
 * - Decoding responses.
 * - Convert `JSON` to `string` via `JSONStringify`.
 */
export type WebdriverErrors = FetchError | d.DecodeError | TypeError

/**
 * @summary
 * The connection between the local end and remote end of the web driver.
 *
 * @category Model
 */
export interface Webdriver<A>
  extends RTE.ReaderTaskEither<Dependencies, WebdriverErrors, A> {}

/**
 * @summary
 * Allows composing a `Session` with the `WebDriver` model.
 *
 * @see WebDriver<A>
 * @category Model
 */
export interface WebdriverSession<A>
  extends RRTE.ReaderReaderTaskEither<
    c.Session,
    Dependencies,
    WebdriverErrors,
    A
  > {}

/**
 * @summary
 * Possible values for the `method` property
 */
export type RequestMethod = "PUT" | "POST" | "GET" | "DELETE" | "UPDATE"

export interface FetchProps<A extends object> {
  /**
   * @summary
   * Used to append values to the string
   */
  endo: Endomorphism<string>
  /**
   * @summary
   * The method used for the request to the remote end.
   */
  method: RequestMethod
  /**
   * @summary
   * The body of the request.
   * This will be stringified and sent in the request to the remote end.
   */
  body?: A
}

export interface MakeProps<E extends object, A> {
  fetch: FetchProps<E>
  decoder: d.Decoder<unknown, A>
}

// utils

/**
 * @summary
 * Creates a `WebDriver` from a Decoder and a few request properties.
 * Reduces boilerplate
 *
 * @param props
 * @category Constructors
 */
export const make = <E extends object, A>({
  decoder,
  fetch: { body, endo, method },
}: MakeProps<E, A>): Webdriver<A> =>
  pipe(
    RTE.ask<Dependencies>(),
    // stringify JSON
    RTE.bindW("body", () =>
      pipe(
        O.fromNullable(body),
        O.traverse(E.Applicative)(stringifyJson),
        RTE.fromEither,
        RTE.map(O.toUndefined)
      )
    ),
    // fetch request
    RTE.chainTaskEitherK(({ endpoint, requestInit = {}, body }) =>
      fetch(endo(endpoint), Object.assign({}, requestInit, { method, body }))
    ),
    // decodes a successful response
    RTE.chainEitherKW(c.Success(decoder).decode),
    // get A from the response
    RTE.map((success) => success.value)
  )

/**
 * @summary
 * Appends the `sessionId` to the `endpoint`.
 *
 * @todo Rename to something more suitable.
 * @internal
 */
const endosession = (session: c.Session) =>
  flow(string.append("/session/"), string.append(session.sessionId))

/**
 *
 * @summary
 * Creates a new webdriver session
 *
 * @param body
 *
 * @see [New Session](https://www.w3.org/TR/webdriver1/#dfn-creating-a-new-session)
 * @category Constructors
 */
export const newSession = (body: c.NewSession): Webdriver<c.Session> =>
  make({
    decoder: c.Session,
    fetch: { body, method: "POST", endo: string.append("/session") },
  })

export const status: Webdriver<c.Status> = make({
  decoder: c.Status,
  fetch: { method: "GET", endo: string.append("/status") },
})

// -----
// Please use `ReaderReaderTaskEither` to compose these sessions together
// via `chain` and `chainFirst`
// -----

export const deleteSession: WebdriverSession<void> = (session: c.Session) =>
  make({
    decoder: c.NullAsVoid,
    fetch: {
      endo: endosession(session),
      method: "DELETE",
    },
  })

export const navigateTo = (url: string): WebdriverSession<void> => (session) =>
  make({
    decoder: c.NullAsVoid,
    fetch: {
      body: { url },
      endo: flow(endosession(session), string.append("/url")),
      method: "POST",
    },
  })

/**
 * @summary
 * Creates a `Session` that will always close if it opened,
 * by calling a `WebDriverSession`.
 *
 * @param body
 * @category Combinators
 */
export const runSession = (body: c.NewSession) => <A>(
  fa: WebdriverSession<A>
) => RTE.bracket(newSession(body), (session) => fa(session), deleteSession)

export const getCurrentUrl: WebdriverSession<string> = (session) =>
  make({
    decoder: d.string,
    fetch: {
      endo: flow(endosession(session), string.append("/url")),
      method: "GET",
    },
  })

export const back: WebdriverSession<void> = (session) =>
  make({
    decoder: c.NullAsVoid,
    fetch: {
      endo: flow(endosession(session), string.append("/back")),
      method: "POST",
      body: {},
    },
  })

export const getTimeouts: WebdriverSession<c.Timeouts> = (session) =>
  make({
    decoder: c.Timeouts,
    fetch: {
      endo: flow(endosession(session), string.append("/timeouts")),
      method: "GET",
    },
  })

export const setTimeouts = (timeouts: c.Timeouts): WebdriverSession<void> => (
  session
) =>
  make({
    decoder: c.NullAsVoid,
    fetch: {
      endo: flow(endosession(session), string.append("/timeouts")),
      method: "POST",
      body: timeouts,
    },
  })

export const forward: WebdriverSession<void> = (session) =>
  make({
    decoder: c.NullAsVoid,
    fetch: {
      endo: flow(endosession(session), string.append("/forward")),
      method: "POST",
      body: {},
    },
  })

export const refresh: WebdriverSession<void> = (session) =>
  make({
    decoder: c.NullAsVoid,
    fetch: {
      endo: flow(endosession(session), string.append("/refresh")),
      method: "POST",
      body: {},
    },
  })

export type LocationStrategy =
  | "css selector"
  | "link text"
  | "partial link text"
  | "tag name"
  | "xpath"

export const findElement = (
  using: LocationStrategy,
  selector: string
): WebdriverSession<c.Element> => (session) =>
  make({
    decoder: c.Element,
    fetch: {
      endo: flow(endosession(session), string.append("/element")),
      method: "POST",
      body: { using, value: selector },
    },
  })

export const elementSendKeys = (text: string) => (
  element: c.Element
): WebdriverSession<void> => (session) =>
  make({
    decoder: c.NullAsVoid,
    fetch: {
      endo: flow(
        endosession(session),
        string.append("/element/"),
        string.append(element["element-6066-11e4-a52e-4f735466cecf"]),
        string.append("/value")
      ),
      method: "POST",
      body: { text },
    },
  })

export const getElementAttribute = (attribute: string) => (
  element: c.Element
): WebdriverSession<string> => (session) =>
  make({
    decoder: d.string,
    fetch: {
      endo: flow(
        endosession(session),
        string.append("/element/"),
        string.append(element["element-6066-11e4-a52e-4f735466cecf"]),
        string.append("/attribute/"),
        string.append(attribute)
      ),
      method: "GET",
    },
  })
