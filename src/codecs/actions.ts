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

export type Actions = Array<Action>

export interface ActionSequence {
  actions: Actions
}
