import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
import * as s from "io-ts/Schemable";
export interface Success<A> {
    value: A;
}
export declare type Literal = s.Literal;
export interface Session {
    sessionId: string;
    capabilities?: Record<string, unknown>;
}
export interface Status {
    ready: boolean;
    message: string;
}
export declare function Success<A>(value: d.Decoder<unknown, A>): c.Codec<unknown, Success<A>, Success<A>>;
export declare const Null: c.Codec<unknown, null, null>;
export declare const Literal: c.Codec<unknown, Literal, Literal>;
export declare const Session: c.Codec<unknown, Session, Session>;
/**
 * @summary
 * `imap`s `null` to `void` to identify the combinator where the effect is important.
 
 */
export declare const NullAsVoid: c.Codec<unknown, null, void>;
/**
 * @summary
 * Information about the remote end's readiness state and why it is/isn't ready.
 
 */
export declare const Status: c.Codec<unknown, Status, Status>;
