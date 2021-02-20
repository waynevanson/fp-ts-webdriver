/**
 * [Documentation](https://www.w3.org/TR/webdriver1/#processing-capabilities)
 *
 * @since 3.2.0
 */
import { array, either as E, nonEmptyArray as NEA } from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as g from "io-ts/Guard"
import { Json, JsonObject } from "./json"
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

export type ExtensionCapabilities = Json

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
> = Json

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

const decoderToGuard = <A>(
  decoder: d.Decoder<unknown, A>
): g.Guard<unknown, A> => ({
  is: (i: unknown): i is A => E.isRight(decoder.decode(i)),
})

export const NonEmptyArray = <O, A>(
  codec: c.Codec<unknown, O, A>
): c.Codec<unknown, NEA.NonEmptyArray<O>, NEA.NonEmptyArray<A>> =>
  pipe(
    d.fromGuard(
      guardNonEmptyArray({ is: (i): i is any => decoderToGuard(codec).is(i) }),
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
