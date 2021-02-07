import { reader } from "fp-ts"

/**
 * @summary
 * Removes the `Reader` interface and converts it to a standard function.
 */
export const readerToFn = <R, A>(fa: reader.Reader<R, A>): ((r: R) => A) => fa
