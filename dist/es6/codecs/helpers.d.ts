import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
import * as s from "io-ts/Schemable";
/**
 * @since 3.2.0
 */
export interface Success<A> {
    value: A;
}
/**
 * @since 3.2.0
 */
export declare type Literal = s.Literal;
/**
 * @since 3.2.0
 */
export interface Session {
    sessionId: string;
    capabilities?: Record<string, unknown>;
}
/**
 * @since 3.2.0
 */
export interface Status {
    ready: boolean;
    message: string;
}
/**
 * @since 3.2.0
 */
export declare function Success<A>(value: d.Decoder<unknown, A>): c.Codec<unknown, Success<A>, Success<A>>;
/**
 * @since 3.2.0
 */
export declare const Null: c.Codec<unknown, null, null>;
/**
 * @since 3.2.0
 */
export declare const Literal: c.Codec<unknown, Literal, Literal>;
/**
 * @since 3.2.0
 */
export declare const Session: c.Codec<unknown, Session, Session>;
/**
 * @summary
 * `imap`s `null` to `void` to identify the combinator where the effect is important.
 *
 * @since 3.2.0
 */
export declare const NullAsVoid: c.Codec<unknown, null, void>;
/**
 * @summary
 * Information about the remote end's readiness state and why it is/isn't ready.
 *
 * @since 3.2.0
 */
export declare const Status: c.Codec<unknown, Status, Status>;
