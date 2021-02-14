import { either as E, reader as R } from "fp-ts";
/**
 * @summary
 * Removes the `Reader` interface and converts it to a standard function.
 */
export declare const readerToFn: <R, A>(fa: R.Reader<R, A>) => (r: R) => A;
export declare const fetch: import("fp-fetch").Fetch<unknown, E.Json>;
export declare const stringifyJson: (i: unknown) => E.Either<TypeError, string>;
