/**
 * @summary
 * Low level API for controlling the browser.
 
 */

export interface PointerParameters {
  /**
   * Note - Default value is implemented by remote end.
   * @default "mouse"
   */
  pointerType?: "mouse" | "pen" | "touch"
}

export interface ActionItemPause {
  type: "pause"
  /**
   * Number must be greater than `0`
   */
  duration?: number
}

export interface ActionItemPointerUpDown {
  type: "pointerUp" | "pointerDown"
  /**
   * @summary
   * Number greater than or equal to `0`
   */
  button: number
}

export interface ActionItemPointerMove {
  type: "pointerMove"
  /**
   * Number must be greater than `0`
   */
  duration?: number
  // these strings and an object?
  origin?: "viewport" | "pointer"
  /**
   * Number must be greater than `0`
   */
  x: number
  /**
   * Number must be greater than `0`
   */
  y: number
}

export interface ActionItemPointerCancel {
  type: "pointerCancel"
}

export interface ActionItemKeyUpDown {
  type: "keyUp" | "keyDown"
  /**
   * Single unicode code point.
   */
  value: string
}

export type ActionItemPointer =
  | ActionItemPointerCancel
  | ActionItemPointerUpDown
  | ActionItemPause
  | ActionItemPointerMove

export type ActionItemKey = ActionItemKeyUpDown | ActionItemPause

export type PointerAction = {
  id: string
  type: "pointer"
  parameters?: PointerParameters
  actions: Array<ActionItemPointer>
}

export type KeyAction = {
  id: string
  type: "key"
  actions: Array<ActionItemKey>
}

export type NullAction = {
  id: string
  type: "none"
  actions: Array<ActionItemPause>
}

export type Action = NullAction | PointerAction | KeyAction

export type Actions = Array<Action>

export interface ActionSequence {
  actions: Actions
}
