"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyJson = exports.fetch = exports.readerToFn = void 0;
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var fp_fetch_1 = require("fp-fetch");
var fp_ts_1 = require("fp-ts");
/**
 * @summary
 * Removes the `Reader` interface and converts it to a standard function.
 */
var readerToFn = function (fa) { return fa; };
exports.readerToFn = readerToFn;
exports.fetch = fp_fetch_1.fetchCustom({
    parser: fp_fetch_1.jsonParser,
    errorParser: fp_fetch_1.jsonParser,
    fetch: cross_fetch_1.default,
});
var stringifyJson = function (i) {
    return fp_ts_1.either.stringifyJSON(i, function (e) { return e; });
};
exports.stringifyJson = stringifyJson;
