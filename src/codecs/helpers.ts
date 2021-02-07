import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as s from "io-ts/Schemable"
import { Success } from "./responses"

// TYPES

export type SucessNull = Success<null>
export type Literal = s.Literal

export type JsonPrimitive = string | boolean | number | null
export type JsonArray = Array<Json>
export type JsonObject = { [x: string]: Json }
export type Json = JsonPrimitive | JsonArray | JsonObject

// CODECS

export const Null = c.literal(null)

export const Literal: c.Codec<unknown, Literal, Literal> = pipe(
  d.union(c.string, c.number, c.boolean),
  d.nullable,
  c.fromDecoder
)

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
