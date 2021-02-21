/**
 * @summary
 * Low level API for controlling the browser.
 *
 * @since 3.2.0
 */

/**
 * @since 3.2.0
 */
export interface PointerParameters {
  /**
   * Note - Default value is implemented by remote end.
   * @default "mouse"
   */
  pointerType?: "mouse" | "pen" | "touch"
}

/**
 * @since 3.2.0
 */
export interface ActionItemPause {
  type: "pause"
  /**
   * Number must be greater than `0`
   */
  duration?: number
}

/**
 * @since 3.2.0
 */
export interface ActionItemPointerUpDown {
  type: "pointerUp" | "pointerDown"
  /**
   * @summary
   * Number greater than or equal to `0`
   */
  button: number
}

/**
 * @since 3.2.0
 */
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

/**
 * @since 3.2.0
 */
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
/**
 * @since 3.2.0
 */
export type ActionItemPointer =
  | ActionItemPointerCancel
  | ActionItemPointerUpDown
  | ActionItemPause
  | ActionItemPointerMove

export type ActionItemKey = ActionItemKeyUpDown | ActionItemPause

/**
 * @since 3.2.0
 */
export type PointerAction = {
  id: string
  type: "pointer"
  parameters?: PointerParameters
  actions: Array<ActionItemPointer>
}

/**
 * @since 3.2.0
 */
export type KeyAction = {
  id: string
  type: "key"
  actions: Array<ActionItemKey>
}

/**
 * @since 3.2.0
 */
export type NullAction = {
  id: string
  type: "none"
  actions: Array<ActionItemPause>
}

/**
 * @since 3.2.0
 */
export type Action = NullAction | PointerAction | KeyAction

/**
 * @since 3.2.0
 */
export type Actions = Array<Action>

/**
 * @since 3.2.0
 */
export interface ActionSequence {
  actions: Actions
}
