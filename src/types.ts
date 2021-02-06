/**
 * @summary
 * Domain model for the W3C webdriver recommended specification (not the draft): https://www.w3.org/TR/webdriver1/
 */
import { option as O } from "fp-ts"

export interface ProxyConfigurationPac {
  proxyType: "pac"
  proxyAutoconfigUrl: string
}

export interface ProxyConfigurationManual {
  proxyType: "manual"
  ftpProxy: string
  httpProxy: string
  noProxy: Array<string>
  sslProxy: string
  socksProxy: string
  socksVersion: number
}

export interface ProxyConfigurationBase {
  proxyType: "direct" | "autodetect" | "system"
}

export type ProxyConfiguration =
  | ProxyConfigurationPac
  | ProxyConfigurationManual
  | ProxyConfigurationBase

export type ProxyType = ProxyConfiguration["proxyType"]

export interface Timeout {
  script?: number | null
  pageLoad?: number
  implicit?: number
}

// https://www.w3.org/TR/webdriver1/#dfn-capabilities-processing
export interface Capabilities {
  browserName?: string
  browserVersion?: string
  platformName?: string
  acceptInsecureCerts?: boolean
  pageLoadStrategy?: string
  proxy?: ProxyConfiguration
  setWindowRect?: boolean
  timeouts?: Array<Timeout>
  unhandledPromptBehaviour?: string
}

export interface NewSessionProps {
  capabilities: Capabilities
  alwaysMatch?: Record<string, string>
}

export interface Url {
  protocol: string
  auth: O.Option<{
    username: string
    password: O.Option<string>
  }>
  hostname: string
  port: number
  pathname: Array<string>
  query: Record<string, string>
  // includes # at start
  hash: string
}

export interface UrlProps extends UrlRequired, Partial<UrlPartial> {}

export interface UrlRequired
  extends Pick<Url, "protocol" | "hostname" | "port"> {}

export interface UrlPartial
  extends Omit<Url, "protocol" | "hostname" | "port"> {}

export interface Success<A> {
  value: A
}
