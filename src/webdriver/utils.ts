import { constNull, constVoid, pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as s from "io-ts/Schemable"

// TYPES

export type Literal = s.Literal

export const Literal: c.Codec<unknown, Literal, Literal> = pipe(
  d.union(c.string, c.number, c.boolean),
  d.nullable,
  c.fromDecoder
)

/**
 * @summary
 * `imap` `null` to `void` to identify the combinator where the effect is important.
 */
export const NullAsVoid = pipe(c.literal(null), c.imap(constVoid, constNull))
