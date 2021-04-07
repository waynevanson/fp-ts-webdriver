import * as c from "io-ts/Codec"

// TYPES

// @todo can't expect users to convert their types to NonNegativeIntegers.
// As long as we provide the  correct compositional tools, this should be okay.

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

// CODECS

export const Timeouts: c.Codec<unknown, Timeouts, Timeouts> = c.partial({
  script: c.nullable(c.number),
  pageLoad: c.number,
  implicit: c.number,
})
