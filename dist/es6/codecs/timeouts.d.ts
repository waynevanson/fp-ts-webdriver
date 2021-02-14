import * as c from "io-ts/Codec";
export interface Timeouts {
    /**
     * @default 30,000 mss
     */
    script?: number | null;
    /**
     * @default 300,000 ms
     */
    pageLoad?: number;
    /**
     * @default 0
     */
    implicit?: number;
}
export declare const Timeouts: c.Codec<unknown, Timeouts, Timeouts>;
