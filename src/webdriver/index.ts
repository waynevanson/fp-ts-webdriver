/**
 * @since 3.2.0
 */
import { either as E, option as O, readerTaskEither as RTE } from "fp-ts"
import { string } from "fp-ts-std"
import { flow, pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import {
  Element,
  NullAsVoid,
  Session,
  Status,
  Success,
  Timeouts,
} from "../codecs"
import { fetch, stringifyJson } from "../utils"
import {
  ActionSequence,
  Dependencies,
  FetchProps,
  NewSession,
  Webdriver,
  WebdriverSession,
} from "./types"
/**
 * @since 3.2.0
 * @internal
 */
export interface MakeProps<E extends object, A> {
  fetch: FetchProps<E>
  decoder: d.Decoder<unknown, A>
}

/**
 * @summary
 * Creates a `WebDriver` from a Decoder and a few request properties.
 * Reduces boilerplate
 *
 * @param props
 * @category Constructors
 * @internal
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
    RTE.chainEitherKW(Success(decoder).decode),
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
const endosession = (session: Session) =>
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
 * @since 3.2.0
 */
export function newSession(body: NewSession): Webdriver<Session> {
  return make({
    decoder: Session,
    fetch: { body, method: "POST", endo: string.append("/session") },
  })
}

/**
 *
 *
 * @description
 * Status returns information about whether a remote end is in a state in which
 * it can create new sessions, but may additionally include arbitrary meta
 * information that is specific to the implementation.
 *
 * @see [Status](https://www.w3.org/TR/webdriver1/#dfn-status)
 */
export const status: Webdriver<Status> = make({
  decoder: Status,
  fetch: { method: "GET", endo: string.append("/status") },
})

// -----
// Please use `ReaderReaderTaskEither` to compose these sessions together
// via `chain` and `chainFirst`
// -----

/**
 * @summary
 * Deletes the given `Session`.
 *
 * @see [Delete Session](https://www.w3.org/TR/webdriver1/#delete-session)
 * @since 3.2.0
 */
export const deleteSession: WebdriverSession<void> = (session: Session) =>
  make({
    decoder: NullAsVoid,
    fetch: {
      endo: endosession(session),
      method: "DELETE",
    },
  })

/**
 * @since 3.2.0
 */
export function navigateTo(url: string): WebdriverSession<void> {
  return (session) =>
    make({
      decoder: NullAsVoid,
      fetch: {
        body: { url },
        endo: flow(endosession(session), string.append("/url")),
        method: "POST",
      },
    })
}

/**
 * @summary
 * Creates a `Session` that will always close if it opened,
 * by calling a `WebDriverSession`.
 *
 * @param body
 * @category Combinators
 * @since 3.2.0
 */
export function runSession(body: NewSession) {
  return <A>(fa: WebdriverSession<A>): Webdriver<A> =>
    RTE.bracket(newSession(body), (session) => fa(session), deleteSession)
}

/**
 * @since 3.2.0
 */
export const getCurrentUrl: WebdriverSession<string> = (session) =>
  make({
    decoder: d.string,
    fetch: {
      endo: flow(endosession(session), string.append("/url")),
      method: "GET",
    },
  })

/**
 * @since 3.2.0
 */
export const back: WebdriverSession<void> = (session) =>
  make({
    decoder: NullAsVoid,
    fetch: {
      endo: flow(endosession(session), string.append("/back")),
      method: "POST",
      body: {},
    },
  })

/**
 * @since 3.2.0
 */
export const getTimeouts: WebdriverSession<Timeouts> = (session) =>
  make({
    decoder: Timeouts,
    fetch: {
      endo: flow(endosession(session), string.append("/timeouts")),
      method: "GET",
    },
  })

/**
 * @since 3.2.0
 */
export function setTimeouts(timeouts: Timeouts): WebdriverSession<void> {
  return (session) =>
    make({
      decoder: NullAsVoid,
      fetch: {
        endo: flow(endosession(session), string.append("/timeouts")),
        method: "POST",
        body: timeouts,
      },
    })
}

/**
 * @since 3.2.0
 */
export const forward: WebdriverSession<void> = (session) =>
  make({
    decoder: NullAsVoid,
    fetch: {
      endo: flow(endosession(session), string.append("/forward")),
      method: "POST",
      body: {},
    },
  })

/**
 * @since 3.2.0
 */
export const refresh: WebdriverSession<void> = (session) =>
  make({
    decoder: NullAsVoid,
    fetch: {
      endo: flow(endosession(session), string.append("/refresh")),
      method: "POST",
      body: {},
    },
  })

/**
 * @since 3.2.0
 */
export type LocationStrategy =
  | "css selector"
  | "link text"
  | "partial link text"
  | "tag name"
  | "xpath"

/**
 * @since 3.2.0
 */
export function findElement(
  using: LocationStrategy,
  selector: string
): WebdriverSession<Element> {
  return (session) =>
    make({
      decoder: Element,
      fetch: {
        endo: flow(endosession(session), string.append("/element")),
        method: "POST",
        body: { using, value: selector },
      },
    })
}

/**
 * @since 3.2.0
 */
export function elementSendKeys(text: string) {
  return (element: Element): WebdriverSession<void> => (session) =>
    make({
      decoder: NullAsVoid,
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
}

/**
 * @since 3.2.0
 */
export function getElementAttribute(attribute: string) {
  return (element: Element): WebdriverSession<string> => (session) =>
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
}

/**
 * @since 3.2.0
 */
export function performActions(
  actions: ActionSequence["actions"]
): WebdriverSession<void> {
  return (session) =>
    make({
      decoder: NullAsVoid,
      fetch: {
        endo: flow(endosession(session), string.append("/actions")),
        method: "POST",
        body: { actions },
      },
    })
}

/**
 * @since 3.2.0
 */
export const releaseActions: WebdriverSession<void> = (session) =>
  make({
    decoder: NullAsVoid,
    fetch: {
      method: "DELETE",
      endo: flow(endosession(session), string.append("/actions")),
    },
  })
