import { tuple as TP } from "fp-ts"
import { Alternative, Alternative1, Alternative2 } from "fp-ts/lib/Alternative"
import { tuple } from "fp-ts/lib/function"
import { HKT, Kind, Kind2, URIS, URIS2 } from "fp-ts/lib/HKT"
import { Monad, Monad1, Monad2 } from "fp-ts/lib/Monad"
import { pipe, pipeable } from "fp-ts/lib/pipeable"
import { Traversable, Traversable1 } from "fp-ts/lib/Traversable"

// model
export interface IndexedCompositionT<F, G, I, O, A> {
  (i: HKT<F, I>): HKT<G, [A, HKT<F, O>]>
}

// typeclass
export interface IndexedCompositionM<F, G> {
  ichain: <Q, O, A, B>(
    fab: (a: A) => IndexedCompositionT<G, F, O, Q, B>
  ) => <I>(
    fa: IndexedCompositionT<F, G, I, O, A>
  ) => IndexedCompositionT<F, G, I, Q, B>
}

//model
export interface IndexedComposition1T1<
  F extends URIS,
  G extends URIS,
  I,
  O,
  A
> {
  (i: Kind<F, I>): Kind<G, [A, Kind<F, O>]>
}

//typeclass
export interface IndexedComposition1M1<F extends URIS, G extends URIS> {
  ichain: <Q, O, A, B>(
    fab: (a: A) => IndexedComposition1T1<G, F, O, Q, B>
  ) => <I>(
    fa: IndexedComposition1T1<F, G, I, O, A>
  ) => IndexedComposition1T1<F, G, I, Q, B>
}

// model
export interface IndexedComposition1T2<
  F extends URIS,
  G extends URIS2,
  I,
  O,
  E,
  A
> {
  (i: Kind<F, I>): Kind2<G, E, [A, Kind<F, O>]>
}

//typeclass
export interface IndexedComposition1M2<F extends URIS, G extends URIS2> {
  ichain: <Q, O, E, A, B>(
    fab: (a: A) => IndexedComposition1T2<F, G, O, Q, E, B>
  ) => <I>(
    fa: IndexedComposition1T2<F, G, I, O, E, A>
  ) => IndexedComposition1T2<F, G, I, Q, E, B>
}

export function getIndexedChainableT<F, G>(
  F: Alternative<F> & Monad<F> & Traversable<F>,
  G: Alternative<G> & Monad<G>
): IndexedCompositionM<F, G>

export function getIndexedChainableT<F extends URIS, G extends URIS>(
  F: Alternative1<F> & Monad1<F> & Traversable1<F>,
  G: Alternative1<G> & Monad1<G>
): IndexedComposition1M1<F, G>

export function getIndexedChainableT<F extends URIS, G extends URIS2>(
  F: Alternative1<F> & Monad1<F> & Traversable1<F>,
  G: Alternative2<G> & Monad2<G>
): IndexedComposition1M2<F, G>

export function getIndexedChainableT<F, G>(
  F: Alternative<F> & Monad<F> & Traversable<F>,
  G: Alternative<G> & Monad<G>
): IndexedCompositionM<F, G> {
  return {
    ichain: <Q, O, A, B>(fab: (a: A) => IndexedCompositionT<G, F, O, Q, B>) => <
      I
    >(
      fa: IndexedCompositionT<F, G, I, O, A>
    ): IndexedCompositionT<F, G, I, Q, B> => (fi) => {
      const g = pipeable(G)
      const f = pipeable(F)

      return pipe(
        fa(fi),
        g.chain(([a, fo]) =>
          pipe(
            fo,
            f.chain((o) => fab(a)(G.of(o))),
            (fbgq) =>
              F.traverse(G)(fbgq, ([b, gq]) =>
                pipe(
                  gq,
                  g.map((q) => tuple(b, q))
                )
              ),
            g.map(
              f.reduce(tuple(G.zero<B>(), F.zero<Q>()), (gbfq, [b, q]) =>
                pipe(
                  gbfq,
                  TP.map(g.alt(() => G.of(b))),
                  TP.mapLeft(f.alt(() => F.of(q)))
                )
              )
            ),
            g.chain(TP.sequence(G))
          )
        )
      )
    },
  }
}
