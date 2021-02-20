import * as c from "io-ts/Codec";
/**
 * @since 3.2.0
 */
export declare type JsonPrimitive = string | boolean | number | null;
/**
 * @since 3.2.0
 */
export declare type JsonArray = Array<Json>;
/**
 * @since 3.2.0
 */
export declare type JsonObject = {
    [x: string]: Json;
};
/**
 * @since 3.2.0
 */
export declare type Json = JsonPrimitive | JsonArray | JsonObject;
/**
 * @since 3.2.0
 */
export declare const JsonPrimitive: c.Codec<unknown, JsonPrimitive, JsonPrimitive>;
/**
 * @since 3.2.0
 */
export declare const JsonArray: c.Codec<unknown, JsonArray, JsonArray>;
/**
 * @since 3.2.0
 */
export declare const JsonObject: c.Codec<unknown, JsonObject, JsonObject>;
/**
 * @since 3.2.0
 */
export declare const Json: c.Codec<unknown, Json, Json>;
