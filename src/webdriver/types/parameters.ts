/**
 * @summary
 * Parameters for arguments
 *
 * @since 4.0.0
 */

import { JsonObject } from "../../codecs"
import { Capabilities } from "./processing-capabilities"

export type NewSession = JsonObject & {
  capabilities: Capabilities
}
