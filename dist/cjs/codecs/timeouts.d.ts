/**
 * @since 3.2.0
 */
import * as c from "io-ts/Codec";
/**
 * @since 3.2.0
 */
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
/**
 * @since 3.2.0
 */
export declare const Timeouts: c.Codec<unknown, Timeouts, Timeouts>;
