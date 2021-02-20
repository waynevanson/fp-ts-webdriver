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
exports.ProxyType = exports.ProxyConfiguration = exports.ProxyConfigurationManual = exports.ProxyConfigurationPac = exports.ProxyConfigurationBase = exports.ProxyTypeBase = void 0;
/**
 * @since 3.2.0
 */
var function_1 = require("fp-ts/lib/function");
var c = __importStar(require("io-ts/Codec"));
var d = __importStar(require("io-ts/Decoder"));
// CODECS
/**
 * @since 3.2.0
 */
exports.ProxyTypeBase = c.literal("direct", "autodetect", "system");
/**
 * @since 3.2.0
 */
exports.ProxyConfigurationBase = c.type({
    proxyType: exports.ProxyTypeBase,
});
/**
 * @since 3.2.0
 */
var ProxyTypePac = c.literal("pac");
/**
 * @since 3.2.0
 */
exports.ProxyConfigurationPac = c.type({
    proxyType: ProxyTypePac,
    proxyAutoconfigUrl: c.string,
});
/**
 * @since 3.2.0
 */
var ProxyTypeManual = c.literal("manual");
/**
 * @since 3.2.0
 */
exports.ProxyConfigurationManual = c.type({
    proxyType: ProxyTypeManual,
    ftpProxy: c.string,
    httpProxy: c.string,
    noProxy: c.array(c.string),
    sslProxy: c.string,
    socksProxy: c.string,
    socksVersion: c.number,
});
/**
 * @since 3.2.0
 */
exports.ProxyConfiguration = function_1.pipe(d.union(exports.ProxyConfigurationBase, exports.ProxyConfigurationPac, exports.ProxyConfigurationManual), c.fromDecoder);
/**
 * @since 3.2.0
 */
exports.ProxyType = function_1.pipe(d.union(exports.ProxyTypeBase, ProxyTypeManual, ProxyTypePac), c.fromDecoder);
