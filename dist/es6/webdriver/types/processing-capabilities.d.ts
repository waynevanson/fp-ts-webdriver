/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 
 */
import { nonEmptyArray as NEA } from "fp-ts";
import { ProxyConfiguration } from "./proxy-configuration";
import { Timeouts, Json, JsonObject } from "../../codecs";
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
export declare type RequiredCapabilities = StandardCapabilities & Record<string, ExtensionCapabilities>;
export declare type Capabilities = JsonObject & {
    alwaysMatch?: RequiredCapabilities;
    firstMatch?: NEA.NonEmptyArray<RequiredCapabilities>;
};
