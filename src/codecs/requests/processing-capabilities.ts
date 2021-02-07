/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 */

import { array, either as E, nonEmptyArray as NEA } from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as g from "io-ts/Guard"
import { JsonObject } from "../helpers"
import { ProxyConfiguration } from "./proxy-configuration"
import { Timeouts } from "./timeouts"
// TYPES

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

export type ExtensionCapabilities = JsonObject

export type RequiredCapabilities =
  | StandardCapabilities
  | (StandardCapabilities &
      // strings should have ":" in them.
      // should we validate these on local end? maybe later.
      Record<string, ExtensionCapabilities>)

export type Capabilities = {
  alwaysMatch?: RequiredCapabilities
  firstMatch?: NEA.NonEmptyArray<RequiredCapabilities>
} & JsonObject

// CODECS

export const StandardCapabilities: c.Codec<
  unknown,
  StandardCapabilities,
  StandardCapabilities
> = c.partial({
  acceptInsecureCerts: c.boolean,
  browserName: c.string,
  browserVersion: c.string,
  pageLoadStrategy: c.string,
  platformName: c.string,
  proxy: ProxyConfiguration,
  setWindowRect: c.boolean,
  timeouts: Timeouts,
  unhandledPromptBehaviour: c.string,
})

export const ExtensionCapabilities: c.Codec<
  unknown,
  ExtensionCapabilities,
  ExtensionCapabilities
> = JsonObject

export const RequiredCapabilities: c.Codec<
  unknown,
  RequiredCapabilities,
  RequiredCapabilities
> = pipe(
  d.union(
    pipe(StandardCapabilities, c.intersect(c.record(ExtensionCapabilities))),
    StandardCapabilities
  ),
  c.fromDecoder
)

const guardNonEmptyArray = flow(g.array, g.refine(array.isNonEmpty))

export const NonEmptyArray = <O, A>(
  codec: c.Codec<unknown, O, A>
): c.Codec<unknown, NEA.NonEmptyArray<O>, NEA.NonEmptyArray<A>> =>
  pipe(
    d.fromGuard(
      guardNonEmptyArray({
        is: (i: unknown): i is any => E.isRight(codec.decode(i)),
      }),
      "NonEmptyArray"
    ),
    c.fromDecoder
  )

export const Capabilities: c.Codec<unknown, Capabilities, Capabilities> = pipe(
  c.partial({
    alwaysMatch: RequiredCapabilities,
    firstMatch: NonEmptyArray(RequiredCapabilities),
  }),
  c.intersect(JsonObject)
)
