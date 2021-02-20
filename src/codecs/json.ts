/**
 * @since 3.2.0
 */
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import { Literal } from "./helpers"

export type JsonPrimitive = string | boolean | number | null
export type JsonArray = Array<Json>
export type JsonObject = { [x: string]: Json }
export type Json = JsonPrimitive | JsonArray | JsonObject

export const JsonPrimitive: c.Codec<
  unknown,
  JsonPrimitive,
  JsonPrimitive
> = Literal

export const JsonArray: c.Codec<unknown, JsonArray, JsonArray> = pipe(
  c.array(c.lazy("Json", () => Json))
)

export const JsonObject: c.Codec<unknown, JsonObject, JsonObject> = pipe(
  c.record(c.lazy("Json", () => Json))
)

export const Json: c.Codec<unknown, Json, Json> = pipe(
  d.union(JsonPrimitive, JsonArray, JsonObject),
  c.fromDecoder
)
