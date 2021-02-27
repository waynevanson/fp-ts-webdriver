import { URItoKind } from "fp-ts/lib/HKT"
import * as c from "io-ts/Codec"
export interface Rect extends Record<"x" | "y" | "width" | "height", number> {}

export const Rect: c.Codec<unknown, Rect, Rect> = c.type({
  x: c.number,
  y: c.number,
  width: c.number,
  height: c.number,
})
