import { reader as R, readerTaskEither as RTE } from "fp-ts";
import { Endomorphism } from "fp-ts/lib/function";
import * as d from "io-ts/Decoder";
import { FetchError } from "fp-fetch";
import * as c from "./codecs";
export interface Dependencies {
    url: string;
    requestInit?: Omit<RequestInit, "body" | "method">;
}
export declare type WebdriverErrors = FetchError | d.DecodeError | TypeError;
export interface Webdriver<A> extends RTE.ReaderTaskEither<Dependencies, WebdriverErrors, A> {
}
export declare type RequestMethod = "PUT" | "POST" | "GET" | "DELETE" | "UPDATE";
export interface FetchProps<A> {
    endo: Endomorphism<string>;
    method: RequestMethod;
    body?: A;
}
export interface WebdriverProps<E extends object, A> {
    fetch: FetchProps<E>;
    decoder: d.Decoder<unknown, A>;
}
export declare const make: <E extends object, A>({ decoder, fetch: { body, endo, method }, }: WebdriverProps<E, A>) => Webdriver<A>;
export interface WebdriverSession<A> extends R.Reader<c.Session, Webdriver<A>> {
}
export declare const newSession: (body: c.NewSession) => Webdriver<c.Session>;
export declare const deleteSession: WebdriverSession<void>;
export declare const navigateTo: (url: string) => WebdriverSession<void>;
export declare const status: Webdriver<c.Status>;
