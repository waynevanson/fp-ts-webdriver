/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 *
 * @since 3.2.0
 */
import { nonEmptyArray as NEA } from "fp-ts";
import * as c from "io-ts/Codec";
import { Json, JsonObject } from "./json";
import { ProxyConfiguration } from "./proxy-configuration";
import { Timeouts } from "./timeouts";
/**
 * @since 3.2.0
 */
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
/**
 * @since 3.2.0
 */
export declare type ExtensionCapabilities = Json;
/**
 * @since 3.2.0
 */
export declare type RequiredCapabilities = StandardCapabilities | (StandardCapabilities & Record<string, ExtensionCapabilities>);
/**
 * @since 3.2.0
 */
export declare type Capabilities = {
    alwaysMatch?: RequiredCapabilities;
    firstMatch?: NEA.NonEmptyArray<RequiredCapabilities>;
} & JsonObject;
/**
 * @since 3.2.0
 */
export declare const StandardCapabilities: c.Codec<unknown, StandardCapabilities, StandardCapabilities>;
/**
 * @since 3.2.0
 */
export declare const ExtensionCapabilities: c.Codec<unknown, ExtensionCapabilities, ExtensionCapabilities>;
/**
 * @since 3.2.0
 */
export declare const RequiredCapabilities: c.Codec<unknown, RequiredCapabilities, RequiredCapabilities>;
/**
 * @since 3.2.0
 */
export declare const NonEmptyArray: <O, A>(codec: c.Codec<unknown, O, A>) => c.Codec<unknown, NEA.NonEmptyArray<O>, NEA.NonEmptyArray<A>>;
/**
 * @since 3.2.0
 */
export declare const Capabilities: c.Codec<unknown, Capabilities, Capabilities>;
