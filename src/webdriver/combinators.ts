import { either as E, option as O, readerTaskEither as RTE } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import { Success } from "../codecs"
import { fetch, stringifyJson } from "../utils"
import { deleteSession, newSession } from "./specification"
import {
  Dependencies,
  FetchProps,
  NewSession,
  Webdriver,
  WebdriverSession,
} from "./types"

/**
 * @summary
 * Custom combinators for the webdriver, not specified in the webdriver protocol.
 */

/*
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
