/**
 * @summary
 * Parameters for arguments
 *
 * @since 4.0.0
 */
import { JsonObject } from "../../codecs";
import { Capabilities } from "./processing-capabilities";
export declare type NewSession = JsonObject & {
    capabilities: Capabilities;
};
