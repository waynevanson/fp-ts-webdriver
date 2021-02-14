import { either as E, option as O, reader as R, readerTaskEither as RTE, } from "fp-ts";
import { string } from "fp-ts-std";
import { flow, pipe } from "fp-ts/lib/function";
import * as c from "./codecs";
import { fetch, stringifyJson } from "./utils";
// utils
// me
export const make = ({ decoder, fetch: { body, endo, method }, }) => pipe(RTE.ask(), RTE.bindW("body", () => pipe(O.fromNullable(body), O.traverse(E.Applicative)(stringifyJson), RTE.fromEither, RTE.map(O.toUndefined))), RTE.chainTaskEitherK(({ url, requestInit = {}, body }) => fetch(endo(url), Object.assign({}, requestInit, { method, body }))), RTE.chainEitherKW(c.Success(decoder).decode), RTE.map((success) => success.value));
const endosession = (session) => flow(string.append("/session/"), string.append(session.sessionId));
// API
export const newSession = (body) => make({
    decoder: c.Session,
    fetch: { body, method: "POST", endo: string.append("/session") },
});
export const deleteSession = (session) => make({
    decoder: c.NullAsVoid,
    fetch: {
        endo: endosession(session),
        method: "DELETE",
    },
});
export const navigateTo = (url) => (session) => make({
    decoder: c.NullAsVoid,
    fetch: {
        body: { url },
        endo: pipe(endosession(session), R.map(string.append("/url"))),
        method: "POST",
    },
});
export const status = make({
    decoder: c.Status,
    fetch: { method: "GET", endo: string.append("/status") },
});
