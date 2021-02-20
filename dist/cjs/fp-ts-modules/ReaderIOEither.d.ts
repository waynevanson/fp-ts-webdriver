/**
 * @since 3.2.0
 */
import { ioEither as IOE, reader as R, readerEither as RE, readerT } from "fp-ts";
import { Monad3 } from "fp-ts/lib/Monad";
import { MonadIO3 } from "fp-ts/lib/MonadIO";
import { MonadThrow3 } from "fp-ts/lib/MonadThrow";
export declare const 
/**
 * @since 3.2.0
 */
ask: <R, E>() => readerT.ReaderT2<"IOEither", R, E, R>, 
/**
 * @since 3.2.0
 */
fromReader: <R, E, A>(ma: R.Reader<R, A>) => readerT.ReaderT2<"IOEither", R, E, A>, fromIOEither: <R, E, A>(ma: IOE.IOEither<E, A>) => readerT.ReaderT2<"IOEither", R, E, A>, 
/**
 * @since 3.2.0
 */
of: <R, E, A>(a: A) => readerT.ReaderT2<"IOEither", R, E, A>;
/**
 * @since 3.2.0
 */
export interface ReaderIOEIther<R, E, A> extends R.Reader<R, IOE.IOEither<E, A>> {
}
/**
 * @since 3.2.0
 */
export declare const URI = "ReaderIOEither";
/**
 * @since 3.2.0
 */
export declare type URI = typeof URI;
declare module "fp-ts/HKT" {
    interface URItoKind3<R, E, A> {
        readonly [URI]: ReaderIOEIther<R, E, A>;
    }
}
/**
 * @since 3.2.0
 */
export declare const Monad: Monad3<URI>;
/**
 * @since 3.2.0
 */
export declare const MonadThrow: MonadThrow3<URI>;
/**
 * @since 3.2.0
 */
export declare const MonadIO: MonadIO3<URI>;
/**
 * @since 3.2.0
 */
export declare const fromReaderEither: <R, E, A>(fa: RE.ReaderEither<R, E, A>) => ReaderIOEIther<R, E, A>;
/**
 * @since 3.2.0
 */
export declare const ReaderIOEither: {
    fromIO: <R, E, A>(fa: import("fp-ts/lib/IO").IO<A>) => ReaderIOEIther<R, E, A>;
    of: <R_1, E_1, A_1>(a: A_1) => ReaderIOEIther<R_1, E_1, A_1>;
    ap: <R_2, E_2, A_2, B>(fab: ReaderIOEIther<R_2, E_2, (a: A_2) => B>, fa: ReaderIOEIther<R_2, E_2, A_2>) => ReaderIOEIther<R_2, E_2, B>;
    URI: "ReaderIOEither";
    map: <R_3, E_3, A_3, B_1>(fa: ReaderIOEIther<R_3, E_3, A_3>, f: (a: A_3) => B_1) => ReaderIOEIther<R_3, E_3, B_1>;
    chain: <R_4, E_4, A_4, B_2>(fa: ReaderIOEIther<R_4, E_4, A_4>, f: (a: A_4) => ReaderIOEIther<R_4, E_4, B_2>) => ReaderIOEIther<R_4, E_4, B_2>;
    throwError: <R_5, E_5, A_5>(e: E_5) => ReaderIOEIther<R_5, E_5, A_5>;
};
export declare const 
/**
 * @since 3.2.0
 */
fromIO: <R, E, A>(fa: import("fp-ts/lib/IO").IO<A>) => ReaderIOEIther<R, E, A>;
/**
 * @since 3.2.0
 */
export declare const 
/**
 * @since 3.2.0
 */
ap: <R, E, A>(fa: ReaderIOEIther<R, E, A>) => <B>(fab: ReaderIOEIther<R, E, (a: A) => B>) => ReaderIOEIther<R, E, B>, 
/**
 * @since 3.2.0
 */
apFirst: <R, E, B>(fb: ReaderIOEIther<R, E, B>) => <A>(fa: ReaderIOEIther<R, E, A>) => ReaderIOEIther<R, E, A>, 
/**
 * @since 3.2.0
 */
apSecond: <R, E, B>(fb: ReaderIOEIther<R, E, B>) => <A>(fa: ReaderIOEIther<R, E, A>) => ReaderIOEIther<R, E, B>, 
/**
 * @since 3.2.0
 */
chain: <R, E, A, B>(f: (a: A) => ReaderIOEIther<R, E, B>) => (ma: ReaderIOEIther<R, E, A>) => ReaderIOEIther<R, E, B>, 
/**
 * @since 3.2.0
 */
chainFirst: <R, E, A, B>(f: (a: A) => ReaderIOEIther<R, E, B>) => (ma: ReaderIOEIther<R, E, A>) => ReaderIOEIther<R, E, A>, 
/**
 * @since 3.2.0
 */
filterOrElse: {
    <E, A, B extends A>(refinement: import("fp-ts/lib/function").Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: ReaderIOEIther<R, E, A>) => ReaderIOEIther<R, E, B>;
    <E_1, A_1>(predicate: import("fp-ts/lib/function").Predicate<A_1>, onFalse: (a: A_1) => E_1): <R_1>(ma: ReaderIOEIther<R_1, E_1, A_1>) => ReaderIOEIther<R_1, E_1, A_1>;
}, 
/**
 * @since 3.2.0
 */
flatten: <R, E, A>(mma: ReaderIOEIther<R, E, ReaderIOEIther<R, E, A>>) => ReaderIOEIther<R, E, A>, 
/**
 * @since 3.2.0
 */
fromEither: <R, E, A>(ma: import("fp-ts/lib/Either").Either<E, A>) => ReaderIOEIther<R, E, A>, 
/**
 * @since 3.2.0
 */
fromOption: <E>(onNone: import("fp-ts/lib/function").Lazy<E>) => <R, A>(ma: import("fp-ts/lib/Option").Option<A>) => ReaderIOEIther<R, E, A>, 
/**
 * @since 3.2.0
 */
fromPredicate: {
    <E, A, B extends A>(refinement: import("fp-ts/lib/function").Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderIOEIther<U, E, B>;
    <E_1, A_1>(predicate: import("fp-ts/lib/function").Predicate<A_1>, onFalse: (a: A_1) => E_1): <R>(a: A_1) => ReaderIOEIther<R, E_1, A_1>;
}, 
/**
 * @since 3.2.0
 */
map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderIOEIther<R, E, A>) => ReaderIOEIther<R, E, B>;
/**
 * @since 3.2.0
 */
export declare const chainIOEitherKW: <G, A, B>(fab: (a: A) => IOE.IOEither<G, B>) => <R, E>(fa: ReaderIOEIther<R, E, A>) => ReaderIOEIther<R, G | E, B>;
