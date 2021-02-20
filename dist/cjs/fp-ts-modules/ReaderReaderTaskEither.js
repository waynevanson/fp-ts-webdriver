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
exports.fromPredicate = exports.fromOption = exports.fromEither = exports.filterOrElse = exports.map = exports.flatten = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.readerReaderTaskEither = exports.MonadTask = exports.MonadThrow = exports.Monad = exports.of = exports.fromReader = exports.fromReaderTaskEither = exports.asks = exports.ask = exports.URI = void 0;
/**
 * @since 3.2.0
 */
var fp_ts_1 = require("fp-ts");
var pipeable_1 = require("fp-ts/lib/pipeable");
exports.URI = "ReaderReaderTaskEither";
var M = fp_ts_1.readerT.getReaderM(fp_ts_1.readerTaskEither.readerTaskEither);
exports.ask = M.ask, exports.asks = M.asks, exports.fromReaderTaskEither = M.fromM, exports.fromReader = M.fromReader, exports.of = M.of;
exports.Monad = __assign({ URI: exports.URI }, M);
exports.MonadThrow = __assign(__assign({}, exports.Monad), { throwError: function (e) { return function () { return fp_ts_1.readerTaskEither.throwError(e); }; } });
exports.MonadTask = __assign(__assign({}, exports.Monad), { fromIO: function (fa) { return function () { return pipeable_1.pipe(fp_ts_1.readerTaskEither.fromIO(fa)); }; }, fromTask: function (fa) { return function () { return pipeable_1.pipe(fp_ts_1.readerTaskEither.fromTask(fa)); }; } });
exports.readerReaderTaskEither = __assign(__assign({}, exports.MonadTask), exports.MonadThrow);
exports.ap = (_a = pipeable_1.pipeable(exports.readerReaderTaskEither), _a.ap), exports.apFirst = _a.apFirst, exports.apSecond = _a.apSecond, exports.chain = _a.chain, exports.chainFirst = _a.chainFirst, exports.flatten = _a.flatten, exports.map = _a.map, exports.filterOrElse = _a.filterOrElse, exports.fromEither = _a.fromEither, exports.fromOption = _a.fromOption, exports.fromPredicate = _a.fromPredicate;
