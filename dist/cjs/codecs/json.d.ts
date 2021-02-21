import * as c from "io-ts/Codec";
export declare type JsonPrimitive = string | boolean | number | null;
export declare type JsonArray = Array<Json>;
export declare type JsonObject = {
    [x: string]: Json;
};
export declare type Json = JsonPrimitive | JsonArray | JsonObject;
export declare const JsonPrimitive: c.Codec<unknown, JsonPrimitive, JsonPrimitive>;
export declare const JsonArray: c.Codec<unknown, JsonArray, JsonArray>;
export declare const JsonObject: c.Codec<unknown, JsonObject, JsonObject>;
export declare const Json: c.Codec<unknown, Json, Json>;
