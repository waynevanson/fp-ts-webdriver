/**
 * @since 3.2.0
 */
import * as c from "io-ts/Codec"

// TYPES

// @todo can't expect users to convert their types to NonNegativeIntegers.

/**
 * @since 3.2.0
 */
export interface Timeouts {
  /**
   * @default 30,000 mss
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

/**
 * @since 3.2.0
 */
export const Timeouts: c.Codec<unknown, Timeouts, Timeouts> = c.partial({
  script: c.nullable(c.number),
  pageLoad: c.number,
  implicit: c.number,
})
