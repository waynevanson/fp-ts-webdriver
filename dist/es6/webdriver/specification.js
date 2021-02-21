import { string } from "fp-ts-std";
import { flow } from "fp-ts/lib/function";
import * as d from "io-ts/Decoder";
import { Element, NullAsVoid, Session, Status, Timeouts } from "../codecs";
import { make } from "./combinators";
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
        decoder: Session,
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
    decoder: Status,
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
    decoder: NullAsVoid,
    fetch: {
        endo: endosession(session),
        method: "DELETE",
    },
});
export function navigateTo(url) {
    return (session) => make({
        decoder: NullAsVoid,
        fetch: {
            body: { url },
            endo: flow(endosession(session), string.append("/url")),
            method: "POST",
        },
    });
}
export const getCurrentUrl = (session) => make({
    decoder: d.string,
    fetch: {
        endo: flow(endosession(session), string.append("/url")),
        method: "GET",
    },
});
export const back = (session) => make({
    decoder: NullAsVoid,
    fetch: {
        endo: flow(endosession(session), string.append("/back")),
        method: "POST",
        body: {},
    },
});
export const getTimeouts = (session) => make({
    decoder: Timeouts,
    fetch: {
        endo: flow(endosession(session), string.append("/timeouts")),
        method: "GET",
    },
});
export function setTimeouts(timeouts) {
    return (session) => make({
        decoder: NullAsVoid,
        fetch: {
            endo: flow(endosession(session), string.append("/timeouts")),
            method: "POST",
            body: timeouts,
        },
    });
}
export const forward = (session) => make({
    decoder: NullAsVoid,
    fetch: {
        endo: flow(endosession(session), string.append("/forward")),
        method: "POST",
        body: {},
    },
});
export const refresh = (session) => make({
    decoder: NullAsVoid,
    fetch: {
        endo: flow(endosession(session), string.append("/refresh")),
        method: "POST",
        body: {},
    },
});
export function findElement(using, selector) {
    return (session) => make({
        decoder: Element,
        fetch: {
            endo: flow(endosession(session), string.append("/element")),
            method: "POST",
            body: { using, value: selector },
        },
    });
}
export function elementSendKeys(text) {
    return (element) => (session) => make({
        decoder: NullAsVoid,
        fetch: {
            endo: flow(endosession(session), string.append("/element/"), string.append(element["element-6066-11e4-a52e-4f735466cecf"]), string.append("/value")),
            method: "POST",
            body: { text },
        },
    });
}
export function getElementAttribute(attribute) {
    return (element) => (session) => make({
        decoder: d.string,
        fetch: {
            endo: flow(endosession(session), string.append("/element/"), string.append(element["element-6066-11e4-a52e-4f735466cecf"]), string.append("/attribute/"), string.append(attribute)),
            method: "GET",
        },
    });
}
export function performActions(actions) {
    return (session) => make({
        decoder: NullAsVoid,
        fetch: {
            endo: flow(endosession(session), string.append("/actions")),
            method: "POST",
            body: { actions },
        },
    });
}
export const releaseActions = (session) => make({
    decoder: NullAsVoid,
    fetch: {
        method: "DELETE",
        endo: flow(endosession(session), string.append("/actions")),
    },
});
