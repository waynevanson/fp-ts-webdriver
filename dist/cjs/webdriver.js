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
exports.performActions = exports.getElementAttribute = exports.elementSendKeys = exports.findElement = exports.refresh = exports.forward = exports.setTimeouts = exports.getTimeouts = exports.back = exports.getCurrentUrl = exports.runSession = exports.navigateTo = exports.deleteSession = exports.status = exports.newSession = exports.make = void 0;
var fp_ts_1 = require("fp-ts");
var fp_ts_std_1 = require("fp-ts-std");
var function_1 = require("fp-ts/lib/function");
var d = __importStar(require("io-ts/Decoder"));
var c = __importStar(require("./codecs"));
var utils_1 = require("./utils");
/**
 * @summary
 * Creates a `WebDriver` from a Decoder and a few request properties.
 * Reduces boilerplate
 *
 * @param props
 * @category Constructors
 */
var make = function (_a) {
    var decoder = _a.decoder, _b = _a.fetch, body = _b.body, endo = _b.endo, method = _b.method;
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), 
    // stringify JSON
    fp_ts_1.readerTaskEither.bindW("body", function () {
        return function_1.pipe(fp_ts_1.option.fromNullable(body), fp_ts_1.option.traverse(fp_ts_1.either.Applicative)(utils_1.stringifyJson), fp_ts_1.readerTaskEither.fromEither, fp_ts_1.readerTaskEither.map(fp_ts_1.option.toUndefined));
    }), 
    // fetch request
    fp_ts_1.readerTaskEither.chainTaskEitherK(function (_a) {
        var endpoint = _a.endpoint, _b = _a.requestInit, requestInit = _b === void 0 ? {} : _b, body = _a.body;
        return utils_1.fetch(endo(endpoint), Object.assign({}, requestInit, { method: method, body: body }));
    }), 
    // decodes a successful response
    fp_ts_1.readerTaskEither.chainEitherKW(c.Success(decoder).decode), 
    // get A from the response
    fp_ts_1.readerTaskEither.map(function (success) { return success.value; }));
};
exports.make = make;
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
 */
function newSession(body) {
    return exports.make({
        decoder: c.Session,
        fetch: { body: body, method: "POST", endo: fp_ts_std_1.string.append("/session") },
    });
}
exports.newSession = newSession;
exports.status = exports.make({
    decoder: c.Status,
    fetch: { method: "GET", endo: fp_ts_std_1.string.append("/status") },
});
// -----
// Please use `ReaderReaderTaskEither` to compose these sessions together
// via `chain` and `chainFirst`
// -----
var deleteSession = function (session) {
    return exports.make({
        decoder: c.NullAsVoid,
        fetch: {
            endo: endosession(session),
            method: "DELETE",
        },
    });
};
exports.deleteSession = deleteSession;
function navigateTo(url) {
    return function (session) {
        return exports.make({
            decoder: c.NullAsVoid,
            fetch: {
                body: { url: url },
                endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/url")),
                method: "POST",
            },
        });
    };
}
exports.navigateTo = navigateTo;
/**
 * @summary
 * Creates a `Session` that will always close if it opened,
 * by calling a `WebDriverSession`.
 *
 * @param body
 * @category Combinators
 */
function runSession(body) {
    return function (fa) {
        return fp_ts_1.readerTaskEither.bracket(newSession(body), function (session) { return fa(session); }, exports.deleteSession);
    };
}
exports.runSession = runSession;
var getCurrentUrl = function (session) {
    return exports.make({
        decoder: d.string,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/url")),
            method: "GET",
        },
    });
};
exports.getCurrentUrl = getCurrentUrl;
var back = function (session) {
    return exports.make({
        decoder: c.NullAsVoid,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/back")),
            method: "POST",
            body: {},
        },
    });
};
exports.back = back;
var getTimeouts = function (session) {
    return exports.make({
        decoder: c.Timeouts,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/timeouts")),
            method: "GET",
        },
    });
};
exports.getTimeouts = getTimeouts;
function setTimeouts(timeouts) {
    return function (session) {
        return exports.make({
            decoder: c.NullAsVoid,
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
    return exports.make({
        decoder: c.NullAsVoid,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/forward")),
            method: "POST",
            body: {},
        },
    });
};
exports.forward = forward;
var refresh = function (session) {
    return exports.make({
        decoder: c.NullAsVoid,
        fetch: {
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/refresh")),
            method: "POST",
            body: {},
        },
    });
};
exports.refresh = refresh;
function findElement(using, selector) {
    return function (session) {
        return exports.make({
            decoder: c.Element,
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
        return exports.make({
            decoder: c.NullAsVoid,
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
        return exports.make({
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
        return exports.make({
            decoder: c.NullAsVoid,
            fetch: {
                endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/actions")),
                method: "POST",
                body: { actions: actions },
            },
        });
    };
}
exports.performActions = performActions;
