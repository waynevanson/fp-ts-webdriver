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
