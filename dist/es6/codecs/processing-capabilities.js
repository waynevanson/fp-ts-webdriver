/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 */
import { array, either as E } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function";
import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
import * as g from "io-ts/Guard";
import { Json, JsonObject } from "./helpers";
import { ProxyConfiguration } from "./proxy-configuration";
import { Timeouts } from "./timeouts";
// CODECS
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
export const ExtensionCapabilities = Json;
export const RequiredCapabilities = pipe(d.union(pipe(StandardCapabilities, c.intersect(c.record(ExtensionCapabilities))), StandardCapabilities), c.fromDecoder);
const guardNonEmptyArray = flow(g.array, g.refine(array.isNonEmpty));
const decoderToGuard = (decoder) => ({
    is: (i) => E.isRight(decoder.decode(i)),
});
export const NonEmptyArray = (codec) => pipe(d.fromGuard(guardNonEmptyArray({ is: (i) => decoderToGuard(codec).is(i) }), "NonEmptyArray"), c.fromDecoder);
export const Capabilities = pipe(c.partial({
    alwaysMatch: RequiredCapabilities,
    firstMatch: NonEmptyArray(RequiredCapabilities),
}), c.intersect(JsonObject));
