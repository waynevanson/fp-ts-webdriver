import * as c from "io-ts/Codec";
import * as d from "io-ts/Decoder";
import * as s from "io-ts/Schemable";
export interface Success<A> {
    value: A;
}
export declare type Literal = s.Literal;
export declare type JsonPrimitive = string | boolean | number | null;
export declare type JsonArray = Array<Json>;
export declare type JsonObject = {
    [x: string]: Json;
};
export declare type Json = JsonPrimitive | JsonArray | JsonObject;
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
export declare const JsonPrimitive: c.Codec<unknown, JsonPrimitive, JsonPrimitive>;
export declare const JsonArray: c.Codec<unknown, JsonArray, JsonArray>;
export declare const JsonObject: c.Codec<unknown, JsonObject, JsonObject>;
export declare const Json: c.Codec<unknown, Json, Json>;
export declare const Session: c.Codec<unknown, Session, Session>;
/**
 * @summary
 * `imap`s `null` to `void` to identify the combinator where the effect is important.
 */
export declare const NullAsVoid: c.Codec<unknown, null, void>;
export declare const Status: c.Codec<unknown, Status, Status>;
