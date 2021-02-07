import type { HKT, Kind, URIS } from "fp-ts/lib/HKT"
import { Monad, Monad1 } from "fp-ts/lib/Monad"

// model
export interface IndexedChainableT<Z, M, I, O, A> {
  (i: HKT<M, I>): HKT<Z, [A, HKT<M, O>]>
}

// typeclass
export interface IndexedChainableM<Z, M> {
  ichain: <Q, O, A, B>(
    fab: (a: A) => IndexedChainableT<Z, M, O, Q, B>
  ) => <I>(
    fa: IndexedChainableT<Z, M, I, O, A>
  ) => IndexedChainableT<Z, M, I, Q, B>
}

//model
export interface IndexedChainableT1<Z extends URIS, M extends URIS, I, O, A> {
  (i: Kind<M, I>): Kind<Z, [A, Kind<M, O>]>
}

//typeclass
export interface IndexedChainableM1<Z extends URIS, M extends URIS> {
  ichain: <Q, O, A, B>(
    fab: (a: A) => IndexedChainableT1<Z, M, O, Q, B>
  ) => <I>(
    fa: IndexedChainableT1<Z, M, I, O, A>
  ) => IndexedChainableT1<Z, M, I, Q, B>
}

export function getIndexChainableT<Z, M>(z: Monad<Z>): IndexedChainableM<Z, M>
export function getIndexChainableT<Z extends URIS, M extends URIS>(
  z: Monad1<Z>
): IndexedChainableM1<Z, M>

// export function getIndexChainableT<Z extends URIS2, M extends URIS>(
//   z: Monad2<Z>
// ): IndexedChainableM2<Z, M>

export function getIndexChainableT<Z, M>(z: Monad<Z>): IndexedChainableM<Z, M> {
  return {
    ichain: (fab) => (fa) => (s) => z.chain(fa(s), ([a, yo]) => fab(a)(yo)),
  }
}
