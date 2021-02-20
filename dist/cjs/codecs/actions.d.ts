export declare type NullActionItem = {
    type: "pause";
    /**
     * Number must be greater than `0`
     */
    duration?: number;
};
export declare type NullAction = {
    id: string;
    type: "none";
    actions: Array<NullActionItem>;
};
export declare type Action = NullAction;
export declare type Actions = Array<Action>;
export interface ActionSequence {
    actions: Actions;
}
