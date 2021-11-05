import { either } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import * as e from "io-ts/Encoder"
import { Prism } from "monocle-ts"
import { prismNonNegativeInteger } from "newtype-ts/lib/NonNegativeInteger"
import { prismPositiveInteger } from "newtype-ts/lib/PositiveInteger"

export function fromPrism<I, A>(
  prism: Prism<I, A>,
  expected: string,
  actual: string
): c.Codec<I, I, A> {
  return c.make(
    pipe(
      d.id<I>(),
      d.parse((i) =>
        pipe(
          i,
          prism.getOption,
          either.fromOption(() =>
            d.error(i, `expected ${expected} but received ${actual}`)
          )
        )
      )
    ),
    pipe(e.id<I>(), e.contramap(prism.reverseGet))
  )
}

export const positiveInteger = pipe(
  c.number,
  c.compose(
    fromPrism(prismPositiveInteger, "PositiveInteger", "NonPositiveInteger")
  )
)

export const nonNegativeInteger = pipe(
  c.number,
  c.compose(
    fromPrism(prismNonNegativeInteger, "NonNegativeInteger", "NegativeInteger")
  )
)

export const id = <I>() => c.fromDecoder(d.id<I>())
