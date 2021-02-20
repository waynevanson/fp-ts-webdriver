import { either as E, reader as R } from "fp-ts";
/**
 * @summary
 * Removes the `Reader` interface and converts it to a standard function.
 *
 * @since 3.2.0
 */
export declare const readerToFn: <R, A>(fa: R.Reader<R, A>) => (r: R) => A;
/**
 * @since 3.2.0
 */
export declare const fetch: import("fp-fetch").Fetch<unknown, E.Json>;
/**
 * @since 3.2.0
 */
export declare const stringifyJson: (i: unknown) => E.Either<TypeError, string>;
