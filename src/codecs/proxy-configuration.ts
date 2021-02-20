/**
 * @since 3.2.0
 */
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"

// TYPES

export type ProxyTypeBase = "direct" | "autodetect" | "system"

export interface ProxyConfigurationBase {
  proxyType: ProxyTypeBase
}

export type ProxyTypePac = "pac"

export interface ProxyConfigurationPac {
  proxyType: ProxyTypePac
  proxyAutoconfigUrl: string
}

export type ProxyTypeManual = "manual"
export interface ProxyConfigurationManual {
  proxyType: ProxyTypeManual
  ftpProxy: string
  httpProxy: string
  noProxy: Array<string>
  sslProxy: string
  socksProxy: string
  socksVersion: number
}

export type ProxyConfiguration =
  | ProxyConfigurationPac
  | ProxyConfigurationManual
  | ProxyConfigurationBase

export type ProxyType = ProxyConfiguration["proxyType"]

// CODECS

export const ProxyTypeBase = c.literal("direct", "autodetect", "system")

export const ProxyConfigurationBase = c.type({
  proxyType: ProxyTypeBase,
})

const ProxyTypePac = c.literal("pac")

export const ProxyConfigurationPac: c.Codec<
  unknown,
  ProxyConfigurationPac,
  ProxyConfigurationPac
> = c.type({
  proxyType: ProxyTypePac,
  proxyAutoconfigUrl: c.string,
})

const ProxyTypeManual = c.literal("manual")

export const ProxyConfigurationManual: c.Codec<
  unknown,
  ProxyConfigurationManual,
  ProxyConfigurationManual
> = c.type({
  proxyType: ProxyTypeManual,
  ftpProxy: c.string,
  httpProxy: c.string,
  noProxy: c.array(c.string),
  sslProxy: c.string,
  socksProxy: c.string,
  socksVersion: c.number,
})

export const ProxyConfiguration: c.Codec<
  unknown,
  ProxyConfiguration,
  ProxyConfiguration
> = pipe(
  d.union(
    ProxyConfigurationBase,
    ProxyConfigurationPac,
    ProxyConfigurationManual
  ),
  c.fromDecoder
)

export const ProxyType: c.Codec<unknown, ProxyType, ProxyType> = pipe(
  d.union(ProxyTypeBase, ProxyTypeManual, ProxyTypePac),
  c.fromDecoder
)
