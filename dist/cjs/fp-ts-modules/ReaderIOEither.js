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
var fp_ts_1 = require("fp-ts");
var pipeable_1 = require("fp-ts/lib/pipeable");
var M = fp_ts_1.readerT.getReaderM(fp_ts_1.ioEither.Monad);
exports.ask = M.ask, exports.fromReader = M.fromReader, exports.fromIOEither = M.fromM, exports.of = M.of;
exports.URI = "ReaderIOEither";
exports.Monad = __assign({ URI: exports.URI }, M);
exports.MonadThrow = __assign(__assign({}, exports.Monad), { throwError: function (e) { return function () { return fp_ts_1.ioEither.throwError(e); }; } });
exports.MonadIO = __assign(__assign({}, exports.Monad), { fromIO: function (fa) { return function () { return fp_ts_1.ioEither.fromIO(fa); }; } });
var fromReaderEither = function (fa) { return pipeable_1.pipe(fa, fp_ts_1.reader.map(fp_ts_1.ioEither.fromEither)); };
exports.fromReaderEither = fromReaderEither;
exports.ReaderIOEither = __assign(__assign({}, exports.MonadThrow), exports.MonadIO);
exports.fromIO = exports.MonadIO.fromIO;
exports.ap = (_a = pipeable_1.pipeable(exports.ReaderIOEither), _a.ap), exports.apFirst = _a.apFirst, exports.apSecond = _a.apSecond, exports.chain = _a.chain, exports.chainFirst = _a.chainFirst, exports.filterOrElse = _a.filterOrElse, exports.flatten = _a.flatten, exports.fromEither = _a.fromEither, exports.fromOption = _a.fromOption, exports.fromPredicate = _a.fromPredicate, exports.map = _a.map;
var chainIOEitherKW = function (fab) { return function (fa) {
    return pipeable_1.pipe(fa, exports.chain(function (a) { return (fab(a), exports.fromIOEither); }));
}; };
exports.chainIOEitherKW = chainIOEitherKW;
