/**
 * @since 3.2.0
 */
import { reader as R, readerT, readerTaskEither as RTE } from "fp-ts";
import { Monad4 } from "fp-ts/lib/Monad";
import { MonadTask4 } from "fp-ts/lib/MonadTask";
import { MonadThrow4 } from "fp-ts/lib/MonadThrow";
export declare const URI = "ReaderReaderTaskEither";
export declare type URI = typeof URI;
export interface ReaderReaderTaskEither<S, R, E, A> extends R.Reader<S, RTE.ReaderTaskEither<R, E, A>> {
}
declare module "fp-ts/HKT" {
    interface URItoKind4<S, R, E, A> {
        readonly [URI]: ReaderReaderTaskEither<S, R, E, A>;
    }
}
export declare const ask: <R, U, E>() => readerT.ReaderT3<"ReaderTaskEither", R, U, E, R>, asks: <R, U, E, A>(f: (r: R) => A) => readerT.ReaderT3<"ReaderTaskEither", R, U, E, A>, fromReaderTaskEither: <R, U, E, A>(ma: RTE.ReaderTaskEither<U, E, A>) => readerT.ReaderT3<"ReaderTaskEither", R, U, E, A>, fromReader: <R, U, E, A>(ma: R.Reader<R, A>) => readerT.ReaderT3<"ReaderTaskEither", R, U, E, A>, of: <R, U, E, A>(a: A) => readerT.ReaderT3<"ReaderTaskEither", R, U, E, A>;
export declare const Monad: Monad4<URI>;
export declare const MonadThrow: MonadThrow4<URI>;
export declare const MonadTask: MonadTask4<URI>;
export declare const readerReaderTaskEither: {
    throwError: <S, R, E, A>(e: E) => ReaderReaderTaskEither<S, R, E, A>;
    of: <S_1, R_1, E_1, A_1>(a: A_1) => ReaderReaderTaskEither<S_1, R_1, E_1, A_1>;
    ap: <S_2, R_2, E_2, A_2, B>(fab: ReaderReaderTaskEither<S_2, R_2, E_2, (a: A_2) => B>, fa: ReaderReaderTaskEither<S_2, R_2, E_2, A_2>) => ReaderReaderTaskEither<S_2, R_2, E_2, B>;
    URI: "ReaderReaderTaskEither";
    map: <S_3, R_3, E_3, A_3, B_1>(fa: ReaderReaderTaskEither<S_3, R_3, E_3, A_3>, f: (a: A_3) => B_1) => ReaderReaderTaskEither<S_3, R_3, E_3, B_1>;
    chain: <S_4, R_4, E_4, A_4, B_2>(fa: ReaderReaderTaskEither<S_4, R_4, E_4, A_4>, f: (a: A_4) => ReaderReaderTaskEither<S_4, R_4, E_4, B_2>) => ReaderReaderTaskEither<S_4, R_4, E_4, B_2>;
    fromTask: <S_5, R_5, E_5, A_5>(fa: import("fp-ts/lib/Task").Task<A_5>) => ReaderReaderTaskEither<S_5, R_5, E_5, A_5>;
    fromIO: <S_6, R_6, E_6, A_6>(fa: import("fp-ts/lib/IO").IO<A_6>) => ReaderReaderTaskEither<S_6, R_6, E_6, A_6>;
};
export declare const ap: <S, R, E, A>(fa: ReaderReaderTaskEither<S, R, E, A>) => <B>(fab: ReaderReaderTaskEither<S, R, E, (a: A) => B>) => ReaderReaderTaskEither<S, R, E, B>, apFirst: <S, R, E, B>(fb: ReaderReaderTaskEither<S, R, E, B>) => <A>(fa: ReaderReaderTaskEither<S, R, E, A>) => ReaderReaderTaskEither<S, R, E, A>, apSecond: <S, R, E, B>(fb: ReaderReaderTaskEither<S, R, E, B>) => <A>(fa: ReaderReaderTaskEither<S, R, E, A>) => ReaderReaderTaskEither<S, R, E, B>, chain: <S, R, E, A, B>(f: (a: A) => ReaderReaderTaskEither<S, R, E, B>) => (ma: ReaderReaderTaskEither<S, R, E, A>) => ReaderReaderTaskEither<S, R, E, B>, chainFirst: <S, R, E, A, B>(f: (a: A) => ReaderReaderTaskEither<S, R, E, B>) => (ma: ReaderReaderTaskEither<S, R, E, A>) => ReaderReaderTaskEither<S, R, E, A>, flatten: <S, R, E, A>(mma: ReaderReaderTaskEither<S, R, E, ReaderReaderTaskEither<S, R, E, A>>) => ReaderReaderTaskEither<S, R, E, A>, map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: ReaderReaderTaskEither<S, R, E, A>) => ReaderReaderTaskEither<S, R, E, B>, filterOrElse: {
    <E, A, B extends A>(refinement: import("fp-ts/lib/function").Refinement<A, B>, onFalse: (a: A) => E): <S, R>(ma: ReaderReaderTaskEither<S, R, E, A>) => ReaderReaderTaskEither<S, R, E, B>;
    <E_1, A_1>(predicate: import("fp-ts/lib/function").Predicate<A_1>, onFalse: (a: A_1) => E_1): <S_1, R_1>(ma: ReaderReaderTaskEither<S_1, R_1, E_1, A_1>) => ReaderReaderTaskEither<S_1, R_1, E_1, A_1>;
}, fromEither: <S, R, E, A>(ma: import("fp-ts/lib/Either").Either<E, A>) => ReaderReaderTaskEither<S, R, E, A>, fromOption: <E>(onNone: import("fp-ts/lib/function").Lazy<E>) => <S, R, A>(ma: import("fp-ts/lib/Option").Option<A>) => ReaderReaderTaskEither<S, R, E, A>, fromPredicate: {
    <E, A, B extends A>(refinement: import("fp-ts/lib/function").Refinement<A, B>, onFalse: (a: A) => E): <S, R>(a: A) => ReaderReaderTaskEither<S, R, E, B>;
    <E_1, A_1>(predicate: import("fp-ts/lib/function").Predicate<A_1>, onFalse: (a: A_1) => E_1): <S_1, R_1>(a: A_1) => ReaderReaderTaskEither<S_1, R_1, E_1, A_1>;
};
