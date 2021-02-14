import * as c from "io-ts/Codec";
import { JsonObject } from "./helpers";
import { Capabilities } from "./processing-capabilities";
export declare type NewSession = JsonObject & {
    capabilities: Capabilities;
};
export declare const NewSession: c.Codec<unknown, NewSession, NewSession>;
