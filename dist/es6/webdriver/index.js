import { either as E, option as O, readerTaskEither as RTE } from "fp-ts";
import { string } from "fp-ts-std";
import { flow, pipe } from "fp-ts/lib/function";
import * as d from "io-ts/Decoder";
import * as c from "../codecs";
import { fetch, stringifyJson } from "../utils";
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
RTE.chainEitherKW(c.Success(decoder).decode), 
// get A from the response
RTE.map((success) => success.value));
/**
 * @summary
 * Appends the `sessionId` to the `endpoint`.
 *
 * @todo Rename to something more suitable.
 * @internal
 */
const endosession = (session) => flow(string.append("/session/"), string.append(session.sessionId));
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
export function newSession(body) {
    return make({
        decoder: c.Session,
        fetch: { body, method: "POST", endo: string.append("/session") },
    });
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
export const status = make({
    decoder: c.Status,
    fetch: { method: "GET", endo: string.append("/status") },
});
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
export const deleteSession = (session) => make({
    decoder: c.NullAsVoid,
    fetch: {
        endo: endosession(session),
        method: "DELETE",
    },
});
/**
 * @since 3.2.0
 */
export function navigateTo(url) {
    return (session) => make({
        decoder: c.NullAsVoid,
        fetch: {
            body: { url },
            endo: flow(endosession(session), string.append("/url")),
            method: "POST",
        },
    });
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
export function runSession(body) {
    return (fa) => RTE.bracket(newSession(body), (session) => fa(session), deleteSession);
}
/**
 * @since 3.2.0
 */
export const getCurrentUrl = (session) => make({
    decoder: d.string,
    fetch: {
        endo: flow(endosession(session), string.append("/url")),
        method: "GET",
    },
});
/**
 * @since 3.2.0
 */
export const back = (session) => make({
    decoder: c.NullAsVoid,
    fetch: {
        endo: flow(endosession(session), string.append("/back")),
        method: "POST",
        body: {},
    },
});
/**
 * @since 3.2.0
 */
export const getTimeouts = (session) => make({
    decoder: c.Timeouts,
    fetch: {
        endo: flow(endosession(session), string.append("/timeouts")),
        method: "GET",
    },
});
/**
 * @since 3.2.0
 */
export function setTimeouts(timeouts) {
    return (session) => make({
        decoder: c.NullAsVoid,
        fetch: {
            endo: flow(endosession(session), string.append("/timeouts")),
            method: "POST",
            body: timeouts,
        },
    });
}
/**
 * @since 3.2.0
 */
export const forward = (session) => make({
    decoder: c.NullAsVoid,
    fetch: {
        endo: flow(endosession(session), string.append("/forward")),
        method: "POST",
        body: {},
    },
});
/**
 * @since 3.2.0
 */
export const refresh = (session) => make({
    decoder: c.NullAsVoid,
    fetch: {
        endo: flow(endosession(session), string.append("/refresh")),
        method: "POST",
        body: {},
    },
});
/**
 * @since 3.2.0
 */
export function findElement(using, selector) {
    return (session) => make({
        decoder: c.Element,
        fetch: {
            endo: flow(endosession(session), string.append("/element")),
            method: "POST",
            body: { using, value: selector },
        },
    });
}
/**
 * @since 3.2.0
 */
export function elementSendKeys(text) {
    return (element) => (session) => make({
        decoder: c.NullAsVoid,
        fetch: {
            endo: flow(endosession(session), string.append("/element/"), string.append(element["element-6066-11e4-a52e-4f735466cecf"]), string.append("/value")),
            method: "POST",
            body: { text },
        },
    });
}
/**
 * @since 3.2.0
 */
export function getElementAttribute(attribute) {
    return (element) => (session) => make({
        decoder: d.string,
        fetch: {
            endo: flow(endosession(session), string.append("/element/"), string.append(element["element-6066-11e4-a52e-4f735466cecf"]), string.append("/attribute/"), string.append(attribute)),
            method: "GET",
        },
    });
}
/**
 * @since 3.2.0
 */
export function performActions(actions) {
    return (session) => make({
        decoder: c.NullAsVoid,
        fetch: {
            endo: flow(endosession(session), string.append("/actions")),
            method: "POST",
            body: { actions },
        },
    });
}
/**
 * @since 3.2.0
 */
export const releaseActions = (session) => make({
    decoder: c.NullAsVoid,
    fetch: {
        method: "DELETE",
        endo: flow(endosession(session), string.append("/actions")),
    },
});
