import { Capabilities } from "./requests/processing-capabilities"

export interface State<C extends Capabilities> {
  url: string
  capabilities: C
}
