/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 *
 * @since 3.2.0
 */
import { array, either as E } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function";
import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
import * as g from "io-ts/Guard";
import { Json, JsonObject } from "./json";
import { ProxyConfiguration } from "./proxy-configuration";
import { Timeouts } from "./timeouts";
// CODECS
/**
 * @since 3.2.0
 */
export const StandardCapabilities = c.partial({
    acceptInsecureCerts: c.boolean,
    browserName: c.string,
    browserVersion: c.string,
    pageLoadStrategy: c.string,
    platformName: c.string,
    proxy: ProxyConfiguration,
    setWindowRect: c.boolean,
    timeouts: Timeouts,
    unhandledPromptBehaviour: c.string,
});
/**
 * @since 3.2.0
 */
export const ExtensionCapabilities = Json;
/**
 * @since 3.2.0
 */
export const RequiredCapabilities = pipe(d.union(pipe(StandardCapabilities, c.intersect(c.record(ExtensionCapabilities))), StandardCapabilities), c.fromDecoder);
/**
 * @since 3.2.0
 */
const guardNonEmptyArray = flow(g.array, g.refine(array.isNonEmpty));
/**
 * @since 3.2.0
 */
const decoderToGuard = (decoder) => ({
    is: (i) => E.isRight(decoder.decode(i)),
});
/**
 * @since 3.2.0
 */
export const NonEmptyArray = (codec) => pipe(d.fromGuard(guardNonEmptyArray({ is: (i) => decoderToGuard(codec).is(i) }), "NonEmptyArray"), c.fromDecoder);
/**
 * @since 3.2.0
 */
export const Capabilities = pipe(c.partial({
    alwaysMatch: RequiredCapabilities,
    firstMatch: NonEmptyArray(RequiredCapabilities),
}), c.intersect(JsonObject));
