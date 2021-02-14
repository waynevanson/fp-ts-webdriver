import { constNull, constVoid, pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as s from "io-ts/Schemable"

// TYPES

export interface Success<A> {
  value: A
}
export type Literal = s.Literal

export type JsonPrimitive = string | boolean | number | null
export type JsonArray = Array<Json>
export type JsonObject = { [x: string]: Json }
export type Json = JsonPrimitive | JsonArray | JsonObject

export interface Session {
  sessionId: string
  capabilities?: Record<string, unknown>
}

export interface Status {
  ready: boolean
  message: string
}

// CODECS

export function Success<A>(
  value: d.Decoder<unknown, A>
): c.Codec<unknown, Success<A>, Success<A>> {
  return c.type({ value: c.fromDecoder(value) })
}

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

export const Session: c.Codec<unknown, Session, Session> = pipe(
  c.type({
    sessionId: c.string,
  }),
  c.intersect(c.partial({ capabilities: c.UnknownRecord }))
)

export const NullAsVoid = pipe(c.literal(null), c.imap(constVoid, constNull))

export const Status: c.Codec<unknown, Status, Status> = c.type({
  ready: c.boolean,
  message: c.string,
})
