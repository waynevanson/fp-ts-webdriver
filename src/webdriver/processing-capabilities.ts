/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 
 */
import { readonlyArray as A, readonlyNonEmptyArray as NEA } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import { Json, JsonObject, JsonRecord } from "./json"
import { ProxyConfiguration } from "./proxy-configuration"
import { Timeouts } from "./timeouts"

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
export const standardCapabilities = pipe(
  c.partial({
    acceptInsecureCerts: c.boolean,
    browserName: c.string,
    browserVersion: c.string,
    pageLoadStrategy: c.string,
    platformName: c.string,
  })
)

export type ExtensionCapabilities = Json
export const ExtensionCapabilities = Json

export type RequiredCapabilities = StandardCapabilities &
  // strings should have ":" in them.
  // should we validate these on local end? maybe later.
  Record<string, ExtensionCapabilities>
export const requiredCapabilities = pipe(
  c.record(ExtensionCapabilities),
  c.intersect(standardCapabilities)
)

export type Capabilities = JsonRecord & {
  alwaysMatch?: RequiredCapabilities
  firstMatch?: NEA.ReadonlyNonEmptyArray<RequiredCapabilities>
}
export const capabilities = pipe(
  c.partial({
    alwaysMatch: requiredCapabilities,
    firstMatch: pipe(
      c.array(requiredCapabilities),
      c.imap(A.fromArray, A.toArray),
      c.refine(A.isNonEmpty, "NonEmptyArray")
    ),
  }),
  c.intersect(JsonObject)
)
