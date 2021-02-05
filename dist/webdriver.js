/**
 * top level functions for WD
 */
import WD from "webdriver";
import { readerTaskEither as RTE, taskEither as TE, function as f, } from "fp-ts";
import { call } from "./util";
export const newSession = f.pipe(RTE.ask(), RTE.chainTaskEitherK(({ options, modifier, proto, commandWrapper }) => f.pipe(TE.tryCatchK(WD.newSession, f.identity), call(options, modifier, proto, commandWrapper))));
export const reloadSession = f.pipe(RTE.ask(), RTE.chainTaskEitherK(TE.tryCatchK(WD.reloadSession, f.identity)));
export const attachSession = f.pipe(RTE.ask(), RTE.chainTaskEitherK(({ options, modifier, proto, commandWrapper }) => f.pipe(TE.tryCatchK(WD.attachToSession, f.identity), call(options, modifier, proto, commandWrapper))));
