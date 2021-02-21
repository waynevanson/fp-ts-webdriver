/**
 * @summary
 * Parameters for arguments
 *
 * @since 4.0.0
 */

/**
 * @since 3.2.0
 */
import { JsonObject } from "../../codecs"
import { Capabilities } from "./processing-capabilities"

/**
 * @since 3.2.0
 */
export type NewSession = JsonObject & {
  capabilities: Capabilities
}
