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
