import { FetchError } from "fp-fetch"
import { either as E, option as O, readerTaskEither as RTE } from "fp-ts"
import { string } from "fp-ts-std"
import { Endomorphism, flow, pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import * as c from "./codecs"
import { readerReaderTaskEither as RRTE } from "./fp-ts-modules"
import { fetch, stringifyJson } from "./utils"

export interface Dependencies {
  url: string
  requestInit?: Omit<RequestInit, "body" | "method">
}

export type WebdriverErrors = FetchError | d.DecodeError | TypeError

export interface Webdriver<A>
  extends RTE.ReaderTaskEither<Dependencies, WebdriverErrors, A> {}

// me
export type RequestMethod = "PUT" | "POST" | "GET" | "DELETE" | "UPDATE"

// me
export interface FetchProps<A> {
  endo: Endomorphism<string>
  method: RequestMethod
  body?: A
}

// me
export interface WebdriverProps<E extends object, A> {
  fetch: FetchProps<E>
  decoder: d.Decoder<unknown, A>
}

// utils

// me
export const make = <E extends object, A>({
  decoder,
  fetch: { body, endo, method },
}: WebdriverProps<E, A>): Webdriver<A> =>
  pipe(
    RTE.ask<Dependencies>(),
    RTE.bindW("body", () =>
      pipe(
        O.fromNullable(body),
        O.traverse(E.Applicative)(stringifyJson),
        RTE.fromEither,
        RTE.map(O.toUndefined)
      )
    ),
    RTE.chainTaskEitherK(({ url, requestInit = {}, body }) =>
      fetch(endo(url), Object.assign({}, requestInit, { method, body }))
    ),
    RTE.chainEitherKW(c.Success(decoder).decode),
    RTE.map((success) => success.value)
  )

export interface WebdriverSession<A>
  extends RRTE.ReaderReaderTaskEither<
    c.Session,
    Dependencies,
    WebdriverErrors,
    A
  > {}

const endosession = (session: c.Session) =>
  flow(string.append("/session/"), string.append(session.sessionId))

// API

export const newSession = (body: c.NewSession): Webdriver<c.Session> =>
  make({
    decoder: c.Session,
    fetch: { body, method: "POST", endo: string.append("/session") },
  })

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

export const runSession = (body: c.NewSession) => <A>(
  fa: WebdriverSession<A>
) => RTE.bracket(newSession(body), (session) => fa(session), deleteSession)

export const status: Webdriver<c.Status> = make({
  decoder: c.Status,
  fetch: { method: "GET", endo: string.append("/status") },
})

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
