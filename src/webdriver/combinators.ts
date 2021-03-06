import { either as E, option as O, readerTaskEither as RTE } from "fp-ts"
import { Applicative4 } from "fp-ts/lib/Applicative"
import { pipe } from "fp-ts/lib/function"
import { Kind4, URIS4 } from "fp-ts/lib/HKT"
import * as d from "io-ts/Decoder"
import { Element, Success } from "../codecs"
import { Rect } from "../codecs/rectangle"
import { fetch, stringifyJson } from "../utils"
import { deleteSession, newSession, performActions } from "./specification"
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

declare module "fp-ts/ReadonlyRecord" {
  export function traverse<F extends URIS4>(
    F: Applicative4<F>
  ): <S, R, E, A, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => <K extends string>(
    ta: ReadonlyRecord<K, A>
  ) => Kind4<F, S, R, E, ReadonlyRecord<K, B>>
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

const rectCenter = ({ x, y, height, width }: Rect) => ({
  x: x + width / 2,
  y: y + height / 2,
})

export function dragAndDrop(from: Element, to: Element) {
  return performActions([
    {
      id: `drag and drop from ${JSON.stringify(from)} to ${JSON.stringify(to)}`,
      type: "pointer",
      parameters: { pointerType: "mouse" },
      actions: [
        {
          type: "pointerMove",
          origin: from,
          duration: 1000,
          x: 0,
          y: 0,
        },
        {
          type: "pointerDown",
          button: 0,
        },
        {
          type: "pointerMove",
          origin: "pointer",
          duration: 100,
          x: 20,
          y: 0,
        },
        {
          type: "pointerMove",
          origin: to,
          duration: 1000,
          x: 0,
          y: 0,
        },
        { type: "pause", duration: 100 },
        {
          type: "pointerUp",
          button: 0,
        },
      ],
    },
  ])
}
