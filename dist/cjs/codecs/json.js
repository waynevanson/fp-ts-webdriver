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
exports.Json = exports.JsonObject = exports.JsonArray = exports.JsonPrimitive = void 0;
/**
 * @description
 * Please note that `fp-ts/Either#Json` is not being used because the objects
 * are ready only, leading to a poor developer experience.
 *
 * @since 3.2.0
 */
var function_1 = require("fp-ts/lib/function");
var c = __importStar(require("io-ts/Codec"));
var d = __importStar(require("io-ts/Decoder"));
var helpers_1 = require("./helpers");
/**
 * @since 3.2.0
 */
exports.JsonPrimitive = helpers_1.Literal;
/**
 * @since 3.2.0
 */
exports.JsonArray = function_1.pipe(c.array(c.lazy("Json", function () { return exports.Json; })));
/**
 * @since 3.2.0
 */
exports.JsonObject = function_1.pipe(c.record(c.lazy("Json", function () { return exports.Json; })));
/**
 * @since 3.2.0
 */
exports.Json = function_1.pipe(d.union(exports.JsonPrimitive, exports.JsonArray, exports.JsonObject), c.fromDecoder);
