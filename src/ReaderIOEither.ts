import {
  ioEither as IOE,
  monadIO,
  reader as R,
  readerEither as RE,
  readerT,
} from "fp-ts"
import { Monad3 } from "fp-ts/lib/Monad"
import { MonadIO3 } from "fp-ts/lib/MonadIO"
import { MonadThrow3 } from "fp-ts/lib/MonadThrow"
import { pipe, pipeable } from "fp-ts/lib/pipeable"

const M = readerT.getReaderM(IOE.Monad)

export const { ask, fromReader, fromM: fromIOEither, of } = M

export interface ReaderIOEIther<R, E, A>
  extends R.Reader<R, IOE.IOEither<E, A>> {}

export const URI = "ReaderIOEither"
export type URI = typeof URI

declare module "fp-ts/HKT" {
  export interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderIOEIther<R, E, A>
  }
}

export const Monad: Monad3<URI> = { URI, ...M }

export const MonadThrow: MonadThrow3<URI> = {
  ...Monad,
  throwError: (e) => () => IOE.throwError(e),
}

export const MonadIO: MonadIO3<URI> = {
  ...Monad,
  fromIO: (fa) => () => IOE.fromIO(fa),
}

export const fromReaderEither = <R, E, A>(
  fa: RE.ReaderEither<R, E, A>
): ReaderIOEIther<R, E, A> => pipe(fa, R.map(IOE.fromEither))

export const ReaderIOEither = { ...MonadThrow, ...MonadIO }

export const { fromIO } = MonadIO

export const {
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  filterOrElse,
  flatten,
  fromEither,
  fromOption,
  fromPredicate,
  map,
} = pipeable(ReaderIOEither)

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
