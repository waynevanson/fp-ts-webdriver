/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 *
 * @since 3.2.0
 */
import { nonEmptyArray as NEA } from "fp-ts"
import { ProxyConfiguration } from "./proxy-configuration"
import { Timeouts, Json, JsonObject } from "../../codecs"

/**
 * @since 3.2.0
 */
export interface StandardCapabilities {
  acceptInsecureCerts?: boolean
  browserName?: string
  browserVersion?: string
  pageLoadStrategy?: string
  platformName?: string
  proxy?: ProxyConfiguration
  setWindowRect?: boolean
  timeouts?: Timeouts
  unhandledPromptBehaviour?: string
}

/**
 * @since 3.2.0
 */
export type ExtensionCapabilities = Json

/**
 * @since 3.2.0
 */
export type RequiredCapabilities = StandardCapabilities &
  // strings should have ":" in them.
  // should we validate these on local end? maybe later.
  Record<string, ExtensionCapabilities>

/**
 * @since 3.2.0
 */
export type Capabilities = JsonObject & {
  alwaysMatch?: RequiredCapabilities
  firstMatch?: NEA.NonEmptyArray<RequiredCapabilities>
}
