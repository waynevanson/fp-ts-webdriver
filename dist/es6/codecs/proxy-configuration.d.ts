import * as c from "io-ts/Codec";
export declare type ProxyTypeBase = "direct" | "autodetect" | "system";
export interface ProxyConfigurationBase {
    proxyType: ProxyTypeBase;
}
export declare type ProxyTypePac = "pac";
export interface ProxyConfigurationPac {
    proxyType: ProxyTypePac;
    proxyAutoconfigUrl: string;
}
export declare type ProxyTypeManual = "manual";
export interface ProxyConfigurationManual {
    proxyType: ProxyTypeManual;
    ftpProxy: string;
    httpProxy: string;
    noProxy: Array<string>;
    sslProxy: string;
    socksProxy: string;
    socksVersion: number;
}
export declare type ProxyConfiguration = ProxyConfigurationPac | ProxyConfigurationManual | ProxyConfigurationBase;
export declare type ProxyType = ProxyConfiguration["proxyType"];
export declare const ProxyTypeBase: c.Codec<unknown, ProxyTypeBase, ProxyTypeBase>;
export declare const ProxyConfigurationBase: c.Codec<unknown, {
    proxyType: ProxyTypeBase;
}, {
    proxyType: ProxyTypeBase;
}>;
export declare const ProxyConfigurationPac: c.Codec<unknown, ProxyConfigurationPac, ProxyConfigurationPac>;
export declare const ProxyConfigurationManual: c.Codec<unknown, ProxyConfigurationManual, ProxyConfigurationManual>;
export declare const ProxyConfiguration: c.Codec<unknown, ProxyConfiguration, ProxyConfiguration>;
export declare const ProxyType: c.Codec<unknown, ProxyType, ProxyType>;
