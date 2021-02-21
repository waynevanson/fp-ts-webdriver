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
exports.Status = exports.NullAsVoid = exports.Session = exports.Literal = exports.Null = exports.Success = void 0;
var function_1 = require("fp-ts/lib/function");
var c = __importStar(require("io-ts/Codec"));
var d = __importStar(require("io-ts/Decoder"));
// CODECS
function Success(value) {
    return c.type({ value: c.fromDecoder(value) });
}
exports.Success = Success;
exports.Null = c.literal(null);
exports.Literal = function_1.pipe(d.union(c.string, c.number, c.boolean), d.nullable, c.fromDecoder);
exports.Session = function_1.pipe(c.type({
    sessionId: c.string,
}), c.intersect(c.partial({ capabilities: c.UnknownRecord })));
/**
 * @summary
 * `imap`s `null` to `void` to identify the combinator where the effect is important.
 
 */
exports.NullAsVoid = function_1.pipe(c.literal(null), c.imap(function_1.constVoid, function_1.constNull));
/**
 * @summary
 * Information about the remote end's readiness state and why it is/isn't ready.
 
 */
exports.Status = c.type({
    /**
     * @summary
     * The remote end's readiness state: ready to take commands.
     */
    ready: c.boolean,
    /**
     * @summary
     * Message related about the ready state.
     */
    message: c.string,
});
