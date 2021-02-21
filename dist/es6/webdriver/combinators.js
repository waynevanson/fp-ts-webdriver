import { either as E, option as O, readerTaskEither as RTE } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Success } from "../codecs";
import { fetch, stringifyJson } from "../utils";
import { deleteSession, newSession } from "./specification";
/**
 * @summary
 * Creates a `WebDriver` from a Decoder and a few request properties.
 * Reduces boilerplate
 *
 * @param props
 * @category Constructors
 * @internal
 */
export const make = ({ decoder, fetch: { body, endo, method }, }) => pipe(RTE.ask(), 
// stringify JSON
RTE.bindW("body", () => pipe(O.fromNullable(body), O.traverse(E.Applicative)(stringifyJson), RTE.fromEither, RTE.map(O.toUndefined))), 
// fetch request
RTE.chainTaskEitherK(({ endpoint, requestInit = {}, body }) => fetch(endo(endpoint), Object.assign({}, requestInit, { method, body }))), 
// decodes a successful response
RTE.chainEitherKW(Success(decoder).decode), 
// get A from the response
RTE.map((success) => success.value));
/**
 * @summary
 * Creates a `Session` that will always close if it opened,
 * by calling a `WebDriverSession`.
 *
 * @param body
 * @category Combinators
 * @since 3.2.0
 */
export function runSession(body) {
    return (fa) => RTE.bracket(newSession(body), (session) => fa(session), deleteSession);
}
