import * as c from "io-ts/Codec"

export interface Element
  extends Record<"element-6066-11e4-a52e-4f735466cecf", string> {}

export const Element: c.Codec<unknown, Element, Element> = c.type({
  "element-6066-11e4-a52e-4f735466cecf": c.string,
})
