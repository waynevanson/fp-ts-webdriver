/*
 *
 * @todo chainW
 * @todo chainFirstW
 * @todo chainEitherK
 * @todo chainEitherKW
 * @todo chainIOK
 * @todo chainIOKW
 * @todo chainIOEitherK
 * @todo chainIOEitherKW
 * @todo chainTaskK
 * @todo chainTaskW
 * @todo chainTaskEitherKW
 * @todo chainTaskEitherK
 * @todo chainReaderTaskEitherK
 * @todo chainReaderTaskEitherKW
 */
import { reader as R, readerT, readerTaskEither as RTE } from "fp-ts"
import { Applicative4 } from "fp-ts/lib/Applicative"
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

export const MonadPar: Monad4<URI> = { URI, ...M }

export const MonadSeq: Monad4<URI> = {
  ...MonadPar,
  ap: (rrteab, rrtea) => (r) => RTE.ApplicativeSeq.ap(rrteab(r), rrtea(r)),
}

export const ApplicativeSeq: Applicative4<URI> = { ...MonadSeq }

export const MonadThrow: MonadThrow4<URI> = {
  ...MonadPar,
  throwError: (e) => () => RTE.throwError(e),
}

export const MonadTask: MonadTask4<URI> = {
  ...MonadPar,
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
