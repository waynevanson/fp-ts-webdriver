/**
 * @todo check if types are partial or not
 */
import * as c from "io-ts/Codec"

export interface ProxyConfigurationBase {
  proxyType: "direct" | "autodetect" | "system"
}

export const proxyConfigurationBase = c.struct({
  proxyType: c.literal("direct", "autodetect", "system"),
})

export interface ProxyConfigurationPac {
  proxyType: "pac"
  proxyAutoconfigUrl: string
}

export const proxyConfigurationPac = c.struct({
  proxyType: c.literal("pac"),
  proxyAutoconfigURL: c.string,
})

export interface ProxyConfigurationManual {
  proxyType: "manual"
  ftpProxy: string
  httpProxy: string
  noProxy: Array<string>
  sslProxy: string
  socksProxy: string
  socksVersion: number
}

export const proxyConfigurationManual = c.struct({
  proxyType: c.literal("manual"),
  ftpProxy: c.string,
  httpProxy: c.string,
  noProxy: c.array(c.string),
  sslProxy: c.string,
  socksProxy: c.string,
  socksVersion: c.number,
})

export type ProxyConfiguration =
  | ProxyConfigurationPac
  | ProxyConfigurationManual
  | ProxyConfigurationBase

export const proxyConfiguration = c.sum("proxyType")({
  manual: proxyConfigurationManual,
  pac: proxyConfigurationPac,
  direct: proxyConfigurationBase,
  autodetect: proxyConfigurationBase,
  system: proxyConfigurationBase,
})

export type ProxyType = ProxyConfiguration["proxyType"]
