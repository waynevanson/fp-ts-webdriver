/**
 * @since 3.2.0
 */

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
