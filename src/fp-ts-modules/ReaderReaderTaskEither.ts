/**
 * @since 3.2.0
 */
import { reader as R, readerT, readerTaskEither as RTE } from "fp-ts"
import { Monad4 } from "fp-ts/lib/Monad"
import { MonadTask4 } from "fp-ts/lib/MonadTask"
import { MonadThrow4 } from "fp-ts/lib/MonadThrow"
import { pipe, pipeable } from "fp-ts/lib/pipeable"

export const URI = "ReaderReaderTaskEither"
export type URI = typeof URI

export interface ReaderReaderTaskEither<S, R, E, A>
  extends R.Reader<S, RTE.ReaderTaskEither<R, E, A>> {}

declare module "fp-ts/HKT" {
  export interface URItoKind4<S, R, E, A> {
    readonly [URI]: ReaderReaderTaskEither<S, R, E, A>
  }
}

const M = readerT.getReaderM(RTE.readerTaskEither)
export const { ask, asks, fromM: fromReaderTaskEither, fromReader, of } = M

export const Monad: Monad4<URI> = { URI, ...M }

export const MonadThrow: MonadThrow4<URI> = {
  ...Monad,
  throwError: (e) => () => RTE.throwError(e),
}

export const MonadTask: MonadTask4<URI> = {
  ...Monad,
  fromIO: (fa) => () => pipe(RTE.fromIO(fa)),
  fromTask: (fa) => () => pipe(RTE.fromTask(fa)),
}

export const readerReaderTaskEither = { ...MonadTask, ...MonadThrow }

export const {
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  flatten,
  map,
  filterOrElse,
  fromEither,
  fromOption,
  fromPredicate,
} = pipeable(readerReaderTaskEither)
