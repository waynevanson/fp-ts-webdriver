import { pipe } from "fp-ts/lib/function";
import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
// CODECS
export const ProxyTypeBase = c.literal("direct", "autodetect", "system");
export const ProxyConfigurationBase = c.type({
    proxyType: ProxyTypeBase,
});
const ProxyTypePac = c.literal("pac");
export const ProxyConfigurationPac = c.type({
    proxyType: ProxyTypePac,
    proxyAutoconfigUrl: c.string,
});
const ProxyTypeManual = c.literal("manual");
export const ProxyConfigurationManual = c.type({
    proxyType: ProxyTypeManual,
    ftpProxy: c.string,
    httpProxy: c.string,
    noProxy: c.array(c.string),
    sslProxy: c.string,
    socksProxy: c.string,
    socksVersion: c.number,
});
export const ProxyConfiguration = pipe(d.union(ProxyConfigurationBase, ProxyConfigurationPac, ProxyConfigurationManual), c.fromDecoder);
export const ProxyType = pipe(d.union(ProxyTypeBase, ProxyTypeManual, ProxyTypePac), c.fromDecoder);
