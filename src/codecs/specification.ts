/**
 * How we're naming variables:
 *
 * - functions returning codecs are camelCase
 * - codecs are PascalCase
 */
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as t from "../types"
import { Null } from "./helpers"

export const ProxyConfigurationBase: c.Codec<
  unknown,
  t.ProxyConfigurationBase,
  t.ProxyConfigurationBase
> = c.type({
  proxyType: pipe(
    d.union(c.literal("direct"), c.literal("autodetect"), c.literal("system")),
    c.fromDecoder
  ),
})

export const ProxyConfigurationPac: c.Codec<
  unknown,
  t.ProxyConfigurationPac,
  t.ProxyConfigurationPac
> = c.type({
  proxyType: c.literal("pac"),
  proxyAutoconfigUrl: c.string,
})

export const ProxyConfigurationManual: c.Codec<
  unknown,
  t.ProxyConfigurationManual,
  t.ProxyConfigurationManual
> = c.type({
  proxyType: c.literal("manual"),
  ftpProxy: c.string,
  httpProxy: c.string,
  noProxy: c.array(c.string),
  sslProxy: c.string,
  socksProxy: c.string,
  socksVersion: c.number,
})

export const ProxyConfiguration: c.Codec<
  unknown,
  t.ProxyConfiguration,
  t.ProxyConfiguration
> = pipe(
  d.union(
    ProxyConfigurationBase,
    ProxyConfigurationPac,
    ProxyConfigurationManual
  ),
  c.fromDecoder
)

export const Timeout: c.Codec<unknown, t.Timeout, t.Timeout> = c.partial({
  script: c.nullable(c.number),
  pageLoad: c.number,
  implicit: c.number,
})

export const Capabilities: c.Codec<
  unknown,
  t.Capabilities,
  t.Capabilities
> = c.partial({
  browserName: c.string,
  browserVersion: c.string,
  platformName: c.string,
  acceptInsecureCerts: c.boolean,
  pageLoadStrategy: c.string,
  proxy: ProxyConfiguration,
  setWindowRect: c.boolean,
  timeouts: pipe(Timeout, c.array),
  unhandledPromptBehaviour: c.string,
})
