import { either as E, option as O, readerTaskEither as RTE, } from "fp-ts";
import { string } from "fp-ts-std";
import { flow, pipe } from "fp-ts/lib/function";
import * as d from "io-ts/Decoder";
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
        endo: flow(endosession(session), string.append("/url")),
        method: "POST",
    },
});
export const runSession = (body) => (fa) => RTE.bracket(newSession(body), (session) => fa(session), deleteSession);
export const status = make({
    decoder: c.Status,
    fetch: { method: "GET", endo: string.append("/status") },
});
export const getCurrentUrl = (session) => make({
    decoder: d.string,
    fetch: {
        endo: flow(endosession(session), string.append("/url")),
        method: "GET",
    },
});
export const back = (session) => make({
    decoder: c.NullAsVoid,
    fetch: {
        endo: flow(endosession(session), string.append("/back")),
        method: "POST",
        body: {},
    },
});
export const getTimeouts = (session) => make({
    decoder: c.Timeouts,
    fetch: {
        endo: flow(endosession(session), string.append("/timeouts")),
        method: "GET",
    },
});
