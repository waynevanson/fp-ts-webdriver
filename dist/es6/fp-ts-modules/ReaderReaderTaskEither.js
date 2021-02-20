/**
 * @since 3.2.0
 */
import { readerT, readerTaskEither as RTE } from "fp-ts";
import { pipe, pipeable } from "fp-ts/lib/pipeable";
export const URI = "ReaderReaderTaskEither";
const M = readerT.getReaderM(RTE.readerTaskEither);
export const { ask, asks, fromM: fromReaderTaskEither, fromReader, of } = M;
export const Monad = Object.assign({ URI }, M);
export const MonadThrow = Object.assign(Object.assign({}, Monad), { throwError: (e) => () => RTE.throwError(e) });
export const MonadTask = Object.assign(Object.assign({}, Monad), { fromIO: (fa) => () => pipe(RTE.fromIO(fa)), fromTask: (fa) => () => pipe(RTE.fromTask(fa)) });
export const readerReaderTaskEither = Object.assign(Object.assign({}, MonadTask), MonadThrow);
export const { ap, apFirst, apSecond, chain, chainFirst, flatten, map, filterOrElse, fromEither, fromOption, fromPredicate, } = pipeable(readerReaderTaskEither);
