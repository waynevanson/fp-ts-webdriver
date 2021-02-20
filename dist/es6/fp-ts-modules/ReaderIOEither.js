/**
 * @since 3.2.0
 */
import { ioEither as IOE, reader as R, readerT, } from "fp-ts";
import { pipe, pipeable } from "fp-ts/lib/pipeable";
const M = readerT.getReaderM(IOE.Monad);
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
of, } = M;
/**
 * @since 3.2.0
 */
export const URI = "ReaderIOEither";
/**
 * @since 3.2.0
 */
export const Monad = Object.assign({ URI }, M);
/**
 * @since 3.2.0
 */
export const MonadThrow = Object.assign(Object.assign({}, Monad), { throwError: (e) => () => IOE.throwError(e) });
/**
 * @since 3.2.0
 */
export const MonadIO = Object.assign(Object.assign({}, Monad), { fromIO: (fa) => () => IOE.fromIO(fa) });
/**
 * @since 3.2.0
 */
export const fromReaderEither = (fa) => pipe(fa, R.map(IOE.fromEither));
/**
 * @since 3.2.0
 */
export const ReaderIOEither = Object.assign(Object.assign({}, MonadThrow), MonadIO);
export const { 
/**
 * @since 3.2.0
 */
fromIO, } = MonadIO;
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
map, } = pipeable(ReaderIOEither);
/**
 * @since 3.2.0
 */
export const chainIOEitherKW = (fab) => (fa) => pipe(fa, chain((a) => (fab(a), fromIOEither)));
