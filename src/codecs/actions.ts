/**
 * @since 3.2.0
 */
// export interface PointerParameters {
//   /**
//    * Note - Default value is implemented by remote end.
//    * @default "mouse"
//    */
//   pointerType?: "mouse" | "pen" | "touch"
// }

// export type PointerAction = {
//   id: string
//   type: "pointer"
//   parameters?: PointerParameters
// }

// export type KeyAction = {
//   id: string
//   type: "key"
// }

export type NullActionItem = {
  type: "pause"
  /**
   * Number must be greater than `0`
   */
  duration?: number
}

export type NullAction = {
  id: string
  type: "none"
  actions: Array<NullActionItem>
}

export type Action = NullAction
// | KeyAction | PointerAction

export type Actions = Array<Action>

export interface ActionSequence {
  actions: Actions
}
