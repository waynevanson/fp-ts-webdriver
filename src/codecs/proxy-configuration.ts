/**
 * @since 3.2.0
 */
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"

// TYPES

/**
 * @since 3.2.0
 */
export type ProxyTypeBase = "direct" | "autodetect" | "system"

/**
 * @since 3.2.0
 */
export interface ProxyConfigurationBase {
  proxyType: ProxyTypeBase
}

/**
 * @since 3.2.0
 */
export type ProxyTypePac = "pac"

/**
 * @since 3.2.0
 */
export interface ProxyConfigurationPac {
  proxyType: ProxyTypePac
  proxyAutoconfigUrl: string
}

/**
 * @since 3.2.0
 */
export type ProxyTypeManual = "manual"
/**
 * @since 3.2.0
 */
export interface ProxyConfigurationManual {
  proxyType: ProxyTypeManual
  ftpProxy: string
  httpProxy: string
  noProxy: Array<string>
  sslProxy: string
  socksProxy: string
  socksVersion: number
}

/**
 * @since 3.2.0
 */
export type ProxyConfiguration =
  | ProxyConfigurationPac
  | ProxyConfigurationManual
  | ProxyConfigurationBase

/**
 * @since 3.2.0
 */
export type ProxyType = ProxyConfiguration["proxyType"]

// CODECS

/**
 * @since 3.2.0
 */
export const ProxyTypeBase = c.literal("direct", "autodetect", "system")

/**
 * @since 3.2.0
 */
export const ProxyConfigurationBase = c.type({
  proxyType: ProxyTypeBase,
})

/**
 * @since 3.2.0
 */
const ProxyTypePac = c.literal("pac")

/**
 * @since 3.2.0
 */
export const ProxyConfigurationPac: c.Codec<
  unknown,
  ProxyConfigurationPac,
  ProxyConfigurationPac
> = c.type({
  proxyType: ProxyTypePac,
  proxyAutoconfigUrl: c.string,
})

/**
 * @since 3.2.0
 */
const ProxyTypeManual = c.literal("manual")

/**
 * @since 3.2.0
 */
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

/**
 * @since 3.2.0
 */
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

/**
 * @since 3.2.0
 */
export const ProxyType: c.Codec<unknown, ProxyType, ProxyType> = pipe(
  d.union(ProxyTypeBase, ProxyTypeManual, ProxyTypePac),
  c.fromDecoder
)
