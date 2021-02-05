/**
 * top level functions for WD
 */
import WD from "webdriver"
import {
  readerTaskEither as RTE,
  taskEither as TE,
  function as f,
  reader as R,
} from "fp-ts"
import { call } from "./util"

type FnAny = f.FunctionN<any[], any>

export interface NewSessionProps {
  options: Omit<WD.Options, "capabilities"> &
    Required<Pick<WD.Options, "capabilities">>
  modifier?: FnAny
  proto?: object
  commandWrapper?: (commandName: string, fn: FnAny) => any
}

export interface AttachSessionProps {
  options: WD.AttachSessionOptions
  modifier?: FnAny
  proto?: object
  commandWrapper?: (commandName: string, fn: FnAny) => any
}

export const newSession = f.pipe(
  RTE.ask<NewSessionProps>(),
  RTE.chainTaskEitherK(({ options, modifier, proto, commandWrapper }) =>
    f.pipe(
      TE.tryCatchK(WD.newSession, f.identity),
      call(options, modifier, proto, commandWrapper)
    )
  )
)

export const reloadSession = f.pipe(
  RTE.ask<WD.Client>(),
  RTE.chainTaskEitherK(TE.tryCatchK(WD.reloadSession, f.identity))
)

export const attachSession = f.pipe(
  RTE.ask<AttachSessionProps>(),
  RTE.chainTaskEitherK(({ options, modifier, proto, commandWrapper }) =>
    f.pipe(
      TE.tryCatchK(WD.attachToSession, f.identity),
      call(options, modifier, proto, commandWrapper)
    )
  )
)
