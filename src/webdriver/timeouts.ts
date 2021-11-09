import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import { id, nonNegativeInteger, positiveInteger } from "../utils/codec"

export interface Timeouts {
  /**
   * @default 30,000 ms
   */
  script?: number | null
  /**
   * @default 300,000 ms
   */
  pageLoad?: number
  /**
   * @default 0
   */
  implicit?: number
}

export const Timeouts = c.partial({
  script: pipe(positiveInteger, c.nullable),
  pageLoad: positiveInteger,
  implicit: nonNegativeInteger,
})

export const fromTimeouts = pipe(id<Timeouts>(), c.compose(Timeouts))
