"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachSession = exports.reloadSession = exports.newSession = void 0;
/**
 * top level functions for WD
 */
var webdriver_1 = __importDefault(require("webdriver"));
var fp_ts_1 = require("fp-ts");
var util_1 = require("./util");
exports.newSession = fp_ts_1.function.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainTaskEitherK(function (_a) {
    var options = _a.options, modifier = _a.modifier, proto = _a.proto, commandWrapper = _a.commandWrapper;
    return fp_ts_1.function.pipe(fp_ts_1.taskEither.tryCatchK(webdriver_1.default.newSession, fp_ts_1.function.identity), util_1.call(options, modifier, proto, commandWrapper));
}));
exports.reloadSession = fp_ts_1.function.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainTaskEitherK(fp_ts_1.taskEither.tryCatchK(webdriver_1.default.reloadSession, fp_ts_1.function.identity)));
exports.attachSession = fp_ts_1.function.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainTaskEitherK(function (_a) {
    var options = _a.options, modifier = _a.modifier, proto = _a.proto, commandWrapper = _a.commandWrapper;
    return fp_ts_1.function.pipe(fp_ts_1.taskEither.tryCatchK(webdriver_1.default.attachToSession, fp_ts_1.function.identity), util_1.call(options, modifier, proto, commandWrapper));
}));
