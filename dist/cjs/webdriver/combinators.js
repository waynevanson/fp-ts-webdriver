"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSession = exports.make = void 0;
var fp_ts_1 = require("fp-ts");
var function_1 = require("fp-ts/lib/function");
var codecs_1 = require("../codecs");
var utils_1 = require("../utils");
var specification_1 = require("./specification");
/**
 * @summary
 * Creates a `WebDriver` from a Decoder and a few request properties.
 * Reduces boilerplate
 *
 * @param props
 * @category Constructors
 * @internal
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
    fp_ts_1.readerTaskEither.chainEitherKW(codecs_1.Success(decoder).decode), 
    // get A from the response
    fp_ts_1.readerTaskEither.map(function (success) { return success.value; }));
};
exports.make = make;
/**
 * @summary
 * Creates a `Session` that will always close if it opened,
 * by calling a `WebDriverSession`.
 *
 * @param body
 * @category Combinators
 * @since 3.2.0
 */
function runSession(body) {
    return function (fa) {
        return fp_ts_1.readerTaskEither.bracket(specification_1.newSession(body), function (session) { return fa(session); }, specification_1.deleteSession);
    };
}
exports.runSession = runSession;
