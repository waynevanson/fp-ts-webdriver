"use strict";
/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 */
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
exports.Capabilities = exports.NonEmptyArray = exports.RequiredCapabilities = exports.ExtensionCapabilities = exports.StandardCapabilities = void 0;
var fp_ts_1 = require("fp-ts");
var function_1 = require("fp-ts/lib/function");
var c = __importStar(require("io-ts/Codec"));
var d = __importStar(require("io-ts/Decoder"));
var g = __importStar(require("io-ts/Guard"));
var helpers_1 = require("./helpers");
var proxy_configuration_1 = require("./proxy-configuration");
var timeouts_1 = require("./timeouts");
// CODECS
exports.StandardCapabilities = c.partial({
    acceptInsecureCerts: c.boolean,
    browserName: c.string,
    browserVersion: c.string,
    pageLoadStrategy: c.string,
    platformName: c.string,
    proxy: proxy_configuration_1.ProxyConfiguration,
    setWindowRect: c.boolean,
    timeouts: timeouts_1.Timeouts,
    unhandledPromptBehaviour: c.string,
});
exports.ExtensionCapabilities = helpers_1.Json;
exports.RequiredCapabilities = function_1.pipe(d.union(function_1.pipe(exports.StandardCapabilities, c.intersect(c.record(exports.ExtensionCapabilities))), exports.StandardCapabilities), c.fromDecoder);
var guardNonEmptyArray = function_1.flow(g.array, g.refine(fp_ts_1.array.isNonEmpty));
var decoderToGuard = function (decoder) { return ({
    is: function (i) { return fp_ts_1.either.isRight(decoder.decode(i)); },
}); };
var NonEmptyArray = function (codec) {
    return function_1.pipe(d.fromGuard(guardNonEmptyArray({ is: function (i) { return decoderToGuard(codec).is(i); } }), "NonEmptyArray"), c.fromDecoder);
};
exports.NonEmptyArray = NonEmptyArray;
exports.Capabilities = function_1.pipe(c.partial({
    alwaysMatch: exports.RequiredCapabilities,
    firstMatch: exports.NonEmptyArray(exports.RequiredCapabilities),
}), c.intersect(helpers_1.JsonObject));
