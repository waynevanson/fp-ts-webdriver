import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"

export interface Element
  extends Record<"element-6066-11e4-a52e-4f735466cecf", string> {}

export const Element: c.Codec<unknown, Element, string> = pipe(
  c.struct({
    "element-6066-11e4-a52e-4f735466cecf": c.string,
  }),
  c.imap(
    (element) => element["element-6066-11e4-a52e-4f735466cecf"],
    (element) => ({ "element-6066-11e4-a52e-4f735466cecf": element })
  )
)
