import * as c from "io-ts/Codec";
/**
 * @since 3.2.0
 */
export declare type ProxyTypeBase = "direct" | "autodetect" | "system";
/**
 * @since 3.2.0
 */
export interface ProxyConfigurationBase {
    proxyType: ProxyTypeBase;
}
/**
 * @since 3.2.0
 */
export declare type ProxyTypePac = "pac";
/**
 * @since 3.2.0
 */
export interface ProxyConfigurationPac {
    proxyType: ProxyTypePac;
    proxyAutoconfigUrl: string;
}
/**
 * @since 3.2.0
 */
export declare type ProxyTypeManual = "manual";
/**
 * @since 3.2.0
 */
export interface ProxyConfigurationManual {
    proxyType: ProxyTypeManual;
    ftpProxy: string;
    httpProxy: string;
    noProxy: Array<string>;
    sslProxy: string;
    socksProxy: string;
    socksVersion: number;
}
/**
 * @since 3.2.0
 */
export declare type ProxyConfiguration = ProxyConfigurationPac | ProxyConfigurationManual | ProxyConfigurationBase;
/**
 * @since 3.2.0
 */
export declare type ProxyType = ProxyConfiguration["proxyType"];
/**
 * @since 3.2.0
 */
export declare const ProxyTypeBase: c.Codec<unknown, ProxyTypeBase, ProxyTypeBase>;
/**
 * @since 3.2.0
 */
export declare const ProxyConfigurationBase: c.Codec<unknown, {
    proxyType: ProxyTypeBase;
}, {
    proxyType: ProxyTypeBase;
}>;
/**
 * @since 3.2.0
 */
export declare const ProxyConfigurationPac: c.Codec<unknown, ProxyConfigurationPac, ProxyConfigurationPac>;
/**
 * @since 3.2.0
 */
export declare const ProxyConfigurationManual: c.Codec<unknown, ProxyConfigurationManual, ProxyConfigurationManual>;
/**
 * @since 3.2.0
 */
export declare const ProxyConfiguration: c.Codec<unknown, ProxyConfiguration, ProxyConfiguration>;
/**
 * @since 3.2.0
 */
export declare const ProxyType: c.Codec<unknown, ProxyType, ProxyType>;
