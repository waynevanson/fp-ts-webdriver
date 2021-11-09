/**
 * @summary
 * Parameters for arguments
 *
 * @since 4.0.0
 */

import { JsonRecord } from "./json"
import { Capabilities } from "./processing-capabilities"

export type NewSession = JsonRecord & {
  capabilities: Capabilities
}
