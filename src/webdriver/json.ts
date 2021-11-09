import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import { Literal } from "./utils"
import { json as JSON, readonlyArray as A } from "fp-ts"

export type JsonPrimitive = Exclude<JSON.Json, JSON.JsonArray | JSON.JsonRecord>
export const JsonPrimitive: c.Codec<unknown, JsonPrimitive, JsonPrimitive> =
  Literal

export type JsonArray = JSON.JsonArray
export const JsonArray: c.Codec<unknown, JSON.JsonArray, JSON.JsonArray> = pipe(
  c.array(c.lazy("Json", () => Json)),
  c.imap(A.fromArray, A.toArray)
)

export type JsonRecord = JSON.JsonRecord
export const JsonObject: c.Codec<unknown, JSON.JsonRecord, JSON.JsonRecord> =
  c.record(c.lazy("Json", () => Json))

export type Json = JSON.Json
export const Json: c.Codec<unknown, JSON.Json, JSON.Json> = pipe(
  d.union(JsonPrimitive, JsonArray, JsonObject),
  c.fromDecoder
)
