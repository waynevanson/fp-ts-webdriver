/**
 * top level functions for WD
 */
import WD from "webdriver";
import { readerTaskEither as RTE, function as f } from "fp-ts";
declare type FnAny = f.FunctionN<any[], any>;
export interface NewSessionProps {
    options: Omit<WD.Options, "capabilities"> & Required<Pick<WD.Options, "capabilities">>;
    modifier?: FnAny;
    proto?: object;
    commandWrapper?: (commandName: string, fn: FnAny) => any;
}
export interface AttachSessionProps {
    options: WD.AttachSessionOptions;
    modifier?: FnAny;
    proto?: object;
    commandWrapper?: (commandName: string, fn: FnAny) => any;
}
export declare const newSession: RTE.ReaderTaskEither<NewSessionProps, unknown, WD.Client>;
export declare const reloadSession: RTE.ReaderTaskEither<WD.Client, unknown, WD.Client>;
export declare const attachSession: RTE.ReaderTaskEither<AttachSessionProps, unknown, WD.Client>;
export {};
