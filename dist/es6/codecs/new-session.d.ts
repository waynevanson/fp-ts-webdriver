import * as c from "io-ts/Codec";
import { JsonObject } from "./json";
import { Capabilities } from "./processing-capabilities";
/**
 * @since 3.2.0
 */
export declare type NewSession = JsonObject & {
    capabilities: Capabilities;
};
/**
 * @since 3.2.0
 */
export declare const NewSession: c.Codec<unknown, NewSession, NewSession>;
