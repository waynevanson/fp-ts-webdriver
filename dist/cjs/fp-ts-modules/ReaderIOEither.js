"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainIOEitherKW = exports.map = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.flatten = exports.filterOrElse = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.fromIO = exports.ReaderIOEither = exports.fromReaderEither = exports.MonadIO = exports.MonadThrow = exports.Monad = exports.URI = exports.of = exports.fromIOEither = exports.fromReader = exports.ask = void 0;
/**
 * @since 3.2.0
 */
var fp_ts_1 = require("fp-ts");
var pipeable_1 = require("fp-ts/lib/pipeable");
var M = fp_ts_1.readerT.getReaderM(fp_ts_1.ioEither.Monad);
/**
 * @since 3.2.0
 */
exports.ask = M.ask, 
/**
 * @since 3.2.0
 */
exports.fromReader = M.fromReader, exports.fromIOEither = M.fromM, 
/**
 * @since 3.2.0
 */
exports.of = M.of;
/**
 * @since 3.2.0
 */
exports.URI = "ReaderIOEither";
/**
 * @since 3.2.0
 */
exports.Monad = __assign({ URI: exports.URI }, M);
/**
 * @since 3.2.0
 */
exports.MonadThrow = __assign(__assign({}, exports.Monad), { throwError: function (e) { return function () { return fp_ts_1.ioEither.throwError(e); }; } });
/**
 * @since 3.2.0
 */
exports.MonadIO = __assign(__assign({}, exports.Monad), { fromIO: function (fa) { return function () { return fp_ts_1.ioEither.fromIO(fa); }; } });
/**
 * @since 3.2.0
 */
var fromReaderEither = function (fa) { return pipeable_1.pipe(fa, fp_ts_1.reader.map(fp_ts_1.ioEither.fromEither)); };
exports.fromReaderEither = fromReaderEither;
/**
 * @since 3.2.0
 */
exports.ReaderIOEither = __assign(__assign({}, exports.MonadThrow), exports.MonadIO);
/**
 * @since 3.2.0
 */
exports.fromIO = exports.MonadIO.fromIO;
/**
 * @since 3.2.0
 */
/**
 * @since 3.2.0
 */
exports.ap = (_a = pipeable_1.pipeable(exports.ReaderIOEither), _a.ap), 
/**
 * @since 3.2.0
 */
exports.apFirst = _a.apFirst, 
/**
 * @since 3.2.0
 */
exports.apSecond = _a.apSecond, 
/**
 * @since 3.2.0
 */
exports.chain = _a.chain, 
/**
 * @since 3.2.0
 */
exports.chainFirst = _a.chainFirst, 
/**
 * @since 3.2.0
 */
exports.filterOrElse = _a.filterOrElse, 
/**
 * @since 3.2.0
 */
exports.flatten = _a.flatten, 
/**
 * @since 3.2.0
 */
exports.fromEither = _a.fromEither, 
/**
 * @since 3.2.0
 */
exports.fromOption = _a.fromOption, 
/**
 * @since 3.2.0
 */
exports.fromPredicate = _a.fromPredicate, 
/**
 * @since 3.2.0
 */
exports.map = _a.map;
/**
 * @since 3.2.0
 */
var chainIOEitherKW = function (fab) { return function (fa) {
    return pipeable_1.pipe(fa, exports.chain(function (a) { return (fab(a), exports.fromIOEither); }));
}; };
exports.chainIOEitherKW = chainIOEitherKW;
