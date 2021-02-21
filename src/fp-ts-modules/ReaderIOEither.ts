/**
 * @since 3.2.0
 */
import {
  ioEither as IOE,
  reader as R,
  readerEither as RE,
  readerT,
} from "fp-ts"
import { Monad3 } from "fp-ts/lib/Monad"
import { MonadIO3 } from "fp-ts/lib/MonadIO"
import { MonadThrow3 } from "fp-ts/lib/MonadThrow"
import { pipe, pipeable } from "fp-ts/lib/pipeable"

const M = readerT.getReaderM(IOE.Monad)

export const {
  /**
   * @since 3.2.0
   */
  ask,
  /**
   * @since 3.2.0
   */
  fromReader,
  /**
   * @since 3.2.0
   */
  fromM: fromIOEither,
  /**
   * @since 3.2.0
   */
  of,
} = M

/**
 * @since 3.2.0
 */
export interface ReaderIOEIther<R, E, A>
  extends R.Reader<R, IOE.IOEither<E, A>> {}

/**
 * @since 3.2.0
 */
export const URI = "ReaderIOEither"

/**
 * @since 3.2.0
 */
export type URI = typeof URI

declare module "fp-ts/HKT" {
  export interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderIOEIther<R, E, A>
  }
}

/**
 * @since 3.2.0
 */
export const Monad: Monad3<URI> = { URI, ...M }

/**
 * @since 3.2.0
 */
export const MonadThrow: MonadThrow3<URI> = {
  ...Monad,
  throwError: (e) => () => IOE.throwError(e),
}

/**
 * @since 3.2.0
 */
export const MonadIO: MonadIO3<URI> = {
  ...Monad,
  fromIO: (fa) => () => IOE.fromIO(fa),
}

/**
 * @since 3.2.0
 */
export const fromReaderEither = <R, E, A>(
  fa: RE.ReaderEither<R, E, A>
): ReaderIOEIther<R, E, A> => pipe(fa, R.map(IOE.fromEither))

/**
 * @since 3.2.0
 */
export const ReaderIOEither = { ...MonadThrow, ...MonadIO }

export const {
  /**
   * @since 3.2.0
   */
  fromIO,
} = MonadIO

/**
 * @since 3.2.0
 */
export const {
  /**
   * @since 3.2.0
   */
  ap,
  /**
   * @since 3.2.0
   */
  apFirst,
  /**
   * @since 3.2.0
   */
  apSecond,
  /**
   * @since 3.2.0
   */
  chain,
  /**
   * @since 3.2.0
   */
  chainFirst,
  /**
   * @since 3.2.0
   */
  filterOrElse,
  /**
   * @since 3.2.0
   */
  flatten,
  /**
   * @since 3.2.0
   */
  fromEither,
  /**
   * @since 3.2.0
   */
  fromOption,
  /**
   * @since 3.2.0
   */
  fromPredicate,
  /**
   * @since 3.2.0
   */
  map,
} = pipeable(ReaderIOEither)

/**
 * @since 3.2.0
 */
export const chainIOEitherKW = <G, A, B>(fab: (a: A) => IOE.IOEither<G, B>) => <
  R,
  E
>(
  fa: ReaderIOEIther<R, E, A>
): ReaderIOEIther<R, E | G, B> =>
  pipe(
    fa,
    chain((a) => (fab(a), fromIOEither as any))
  )
