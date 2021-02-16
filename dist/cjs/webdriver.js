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
exports.getTimeouts = exports.back = exports.getCurrentUrl = exports.status = exports.runSession = exports.navigateTo = exports.deleteSession = exports.newSession = exports.make = void 0;
var fp_ts_1 = require("fp-ts");
var fp_ts_std_1 = require("fp-ts-std");
var function_1 = require("fp-ts/lib/function");
var d = __importStar(require("io-ts/Decoder"));
var c = __importStar(require("./codecs"));
var utils_1 = require("./utils");
// utils
// me
var make = function (_a) {
    var decoder = _a.decoder, _b = _a.fetch, body = _b.body, endo = _b.endo, method = _b.method;
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.bindW("body", function () {
        return function_1.pipe(fp_ts_1.option.fromNullable(body), fp_ts_1.option.traverse(fp_ts_1.either.Applicative)(utils_1.stringifyJson), fp_ts_1.readerTaskEither.fromEither, fp_ts_1.readerTaskEither.map(fp_ts_1.option.toUndefined));
    }), fp_ts_1.readerTaskEither.chainTaskEitherK(function (_a) {
        var url = _a.url, _b = _a.requestInit, requestInit = _b === void 0 ? {} : _b, body = _a.body;
        return utils_1.fetch(endo(url), Object.assign({}, requestInit, { method: method, body: body }));
    }), fp_ts_1.readerTaskEither.chainEitherKW(c.Success(decoder).decode), fp_ts_1.readerTaskEither.map(function (success) { return success.value; }));
};
exports.make = make;
var endosession = function (session) {
    return function_1.flow(fp_ts_std_1.string.append("/session/"), fp_ts_std_1.string.append(session.sessionId));
};
// API
var newSession = function (body) {
    return exports.make({
        decoder: c.Session,
        fetch: { body: body, method: "POST", endo: fp_ts_std_1.string.append("/session") },
    });
};
exports.newSession = newSession;
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
var navigateTo = function (url) { return function (session) {
    return exports.make({
        decoder: c.NullAsVoid,
        fetch: {
            body: { url: url },
            endo: function_1.flow(endosession(session), fp_ts_std_1.string.append("/url")),
            method: "POST",
        },
    });
}; };
exports.navigateTo = navigateTo;
var runSession = function (body) { return function (fa) { return fp_ts_1.readerTaskEither.bracket(exports.newSession(body), function (session) { return fa(session); }, exports.deleteSession); }; };
exports.runSession = runSession;
exports.status = exports.make({
    decoder: c.Status,
    fetch: { method: "GET", endo: fp_ts_std_1.string.append("/status") },
});
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
