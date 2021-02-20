/**
 * @since 3.2.0
 */
/**
 * @since 3.2.0
 */
export declare type NullActionItem = {
    type: "pause";
    /**
     * Number must be greater than `0`
     */
    duration?: number;
};
/**
 * @since 3.2.0
 */
export declare type NullAction = {
    id: string;
    type: "none";
    actions: Array<NullActionItem>;
};
/**
 * @since 3.2.0
 */
export declare type Action = NullAction;
/**
 * @since 3.2.0
 */
export declare type Actions = Array<Action>;
/**
 * @since 3.2.0
 */
export interface ActionSequence {
    actions: Actions;
}
