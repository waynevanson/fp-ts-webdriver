"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.releaseActions = exports.performActions = exports.getElementAttribute = exports.elementSendKeys = exports.findElement = exports.getTitle = exports.refresh = exports.forward = exports.setTimeouts = exports.getTimeouts = exports.back = exports.getCurrentUrl = exports.navigateTo = exports.deleteSession = exports.status = exports.newSession = void 0;
var fp_ts_std_1 = require("fp-ts-std");
var function_1 = require("fp-ts/lib/function");
var d = __importStar(require("io-ts/Decoder"));
var codecs_1 = require("../codecs");
var combinators_1 = require("./combinators");
/**
 * @summary
 * Appends the `sessionId` to the `endpoint`.
 *
 * @todo Rename to something more suitable.
 * @internal
 */
var endosession = function (session) {
    return function_1.flow(fp_ts_std_1.string.append("/session/"), fp_ts_std_1.string.append(session.sessionId));
};
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
function newSession(body) {
    return combinators_1.make({
        decoder: codecs_1.Session,
        fetch: { body: body, method: "POST", endo: fp_ts_std_1.string.append("/session") },
    });
}
exports.newSession = newSession;
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
exports.status = combinators_1.make({
    decoder: codecs_1.Status,
    fetch: { method: "GET", endo: fp_ts_std_1.string.append("/status") },
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
var deleteSession = function (session) {
    return combinators_1.make({
        decoder: codecs_1.NullAsVoid,
        fetch: {
            endo: endosession(session),
            method: "DELETE",
        },
    });
};
exports.deleteSession = deleteSession;
function navigateTo(url) {
    return function (session) {
        return combinators_1.make({
            decoder: codecs_1.NullAsVoid,
            fetch: {
                body: { url: url },
                endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/url")),
                method: "POST",
            },
        });
    };
}
exports.navigateTo = navigateTo;
var getCurrentUrl = function (session) {
    return combinators_1.make({
        decoder: d.string,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/url")),
            method: "GET",
        },
    });
};
exports.getCurrentUrl = getCurrentUrl;
var back = function (session) {
    return combinators_1.make({
        decoder: codecs_1.NullAsVoid,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/back")),
            method: "POST",
            body: {},
        },
    });
};
exports.back = back;
var getTimeouts = function (session) {
    return combinators_1.make({
        decoder: codecs_1.Timeouts,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/timeouts")),
            method: "GET",
        },
    });
};
exports.getTimeouts = getTimeouts;
function setTimeouts(timeouts) {
    return function (session) {
        return combinators_1.make({
            decoder: codecs_1.NullAsVoid,
            fetch: {
                endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/timeouts")),
                method: "POST",
                body: timeouts,
            },
        });
    };
}
exports.setTimeouts = setTimeouts;
var forward = function (session) {
    return combinators_1.make({
        decoder: codecs_1.NullAsVoid,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/forward")),
            method: "POST",
            body: {},
        },
    });
};
exports.forward = forward;
var refresh = function (session) {
    return combinators_1.make({
        decoder: codecs_1.NullAsVoid,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/refresh")),
            method: "POST",
            body: {},
        },
    });
};
exports.refresh = refresh;
var getTitle = function (session) {
    return combinators_1.make({
        decoder: d.string,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/title")),
            method: "GET",
        },
    });
};
exports.getTitle = getTitle;
function findElement(using, selector) {
    return function (session) {
        return combinators_1.make({
            decoder: codecs_1.Element,
            fetch: {
                endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/element")),
                method: "POST",
                body: { using: using, value: selector },
            },
        });
    };
}
exports.findElement = findElement;
function elementSendKeys(text) {
    return function (element) { return function (session) {
        return combinators_1.make({
            decoder: codecs_1.NullAsVoid,
            fetch: {
                endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/element/"), fp_ts_std_1.string.append(element["element-6066-11e4-a52e-4f735466cecf"]), fp_ts_std_1.string.append("/value")),
                method: "POST",
                body: { text: text },
            },
        });
    }; };
}
exports.elementSendKeys = elementSendKeys;
function getElementAttribute(attribute) {
    return function (element) { return function (session) {
        return combinators_1.make({
            decoder: d.string,
            fetch: {
                endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/element/"), fp_ts_std_1.string.append(element["element-6066-11e4-a52e-4f735466cecf"]), fp_ts_std_1.string.append("/attribute/"), fp_ts_std_1.string.append(attribute)),
                method: "GET",
            },
        });
    }; };
}
exports.getElementAttribute = getElementAttribute;
function performActions(actions) {
    return function (session) {
        return combinators_1.make({
            decoder: codecs_1.NullAsVoid,
            fetch: {
                endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/actions")),
                method: "POST",
                body: { actions: actions },
            },
        });
    };
}
exports.performActions = performActions;
var releaseActions = function (session) {
    return combinators_1.make({
        decoder: codecs_1.NullAsVoid,
        fetch: {
            method: "DELETE",
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/actions")),
        },
    });
};
exports.releaseActions = releaseActions;
