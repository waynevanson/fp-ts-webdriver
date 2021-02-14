/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 */
import { nonEmptyArray as NEA } from "fp-ts";
import * as c from "io-ts/Codec";
import { Json, JsonObject } from "./helpers";
import { ProxyConfiguration } from "./proxy-configuration";
import { Timeouts } from "./timeouts";
export interface StandardCapabilities {
    acceptInsecureCerts?: boolean;
    browserName?: string;
    browserVersion?: string;
    pageLoadStrategy?: string;
    platformName?: string;
    proxy?: ProxyConfiguration;
    setWindowRect?: boolean;
    timeouts?: Timeouts;
    unhandledPromptBehaviour?: string;
}
export declare type ExtensionCapabilities = Json;
export declare type RequiredCapabilities = StandardCapabilities | (StandardCapabilities & Record<string, ExtensionCapabilities>);
export declare type Capabilities = {
    alwaysMatch?: RequiredCapabilities;
    firstMatch?: NEA.NonEmptyArray<RequiredCapabilities>;
} & JsonObject;
export declare const StandardCapabilities: c.Codec<unknown, StandardCapabilities, StandardCapabilities>;
export declare const ExtensionCapabilities: c.Codec<unknown, ExtensionCapabilities, ExtensionCapabilities>;
export declare const RequiredCapabilities: c.Codec<unknown, RequiredCapabilities, RequiredCapabilities>;
export declare const NonEmptyArray: <O, A>(codec: c.Codec<unknown, O, A>) => c.Codec<unknown, NEA.NonEmptyArray<O>, NEA.NonEmptyArray<A>>;
export declare const Capabilities: c.Codec<unknown, Capabilities, Capabilities>;
