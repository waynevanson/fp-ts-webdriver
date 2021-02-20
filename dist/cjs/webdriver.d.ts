import { FetchError } from "fp-fetch";
import { readerTaskEither as RTE } from "fp-ts";
import { Endomorphism } from "fp-ts/lib/function";
import * as d from "io-ts/Decoder";
import * as c from "./codecs";
import { readerReaderTaskEither as RRTE } from "./fp-ts-modules";
export interface Dependencies {
    /**
     * @summary
     * The `url` to the remote end of the webdriver.
     *
     * Local Servers:
     * - Chromedriver runs by default `localhost:9515`.
     *
     * @todo Remote Servers example
     *
     * @example
     * "localhost:4000"
     */
    endpoint: string;
    /**
     * @summary
     * This is appended to fetch's `RequestInit`.
     *
     * `body` and `method` have been emitted as the webdriver protocol specifies
     * these are reserved to specify the type of command.
     */
    requestInit?: Omit<RequestInit, "body" | "method">;
}
/**
 * @summary
 * Errors expected between:
 * - Handling unsuccessful response codes.
 * - Decoding responses.
 * - Convert `JSON` to `string` via `JSONStringify`.
 */
export declare type WebdriverErrors = FetchError | d.DecodeError | TypeError;
/**
 * @summary
 * The connection between the local end and remote end of the web driver.
 *
 * @category Model
 */
export interface Webdriver<A> extends RTE.ReaderTaskEither<Dependencies, WebdriverErrors, A> {
}
/**
 * @summary
 * Allows composing a `Session` with the `WebDriver` model.
 *
 * @see WebDriver<A>
 * @category Model
 */
export interface WebdriverSession<A> extends RRTE.ReaderReaderTaskEither<c.Session, Dependencies, WebdriverErrors, A> {
}
/**
 * @summary
 * Possible values for the `method` property
 */
export declare type RequestMethod = "PUT" | "POST" | "GET" | "DELETE" | "UPDATE";
export interface FetchProps<A extends object> {
    /**
     * @summary
     * Used to append values to the string
     */
    endo: Endomorphism<string>;
    /**
     * @summary
     * The method used for the request to the remote end.
     */
    method: RequestMethod;
    /**
     * @summary
     * The body of the request.
     * This will be stringified and sent in the request to the remote end.
     */
    body?: A;
}
export interface MakeProps<E extends object, A> {
    fetch: FetchProps<E>;
    decoder: d.Decoder<unknown, A>;
}
/**
 * @summary
 * Creates a `WebDriver` from a Decoder and a few request properties.
 * Reduces boilerplate
 *
 * @param props
 * @category Constructors
 */
export declare const make: <E extends object, A>({ decoder, fetch: { body, endo, method }, }: MakeProps<E, A>) => Webdriver<A>;
/**
 *
 * @summary
 * Creates a new webdriver session
 *
 * @param body
 *
 * @see [New Session](https://www.w3.org/TR/webdriver1/#dfn-creating-a-new-session)
 * @category Constructors
 */
export declare function newSession(body: c.NewSession): Webdriver<c.Session>;
export declare const status: Webdriver<c.Status>;
export declare const deleteSession: WebdriverSession<void>;
export declare function navigateTo(url: string): WebdriverSession<void>;
/**
 * @summary
 * Creates a `Session` that will always close if it opened,
 * by calling a `WebDriverSession`.
 *
 * @param body
 * @category Combinators
 */
export declare function runSession(body: c.NewSession): <A>(fa: WebdriverSession<A>) => Webdriver<A>;
export declare const getCurrentUrl: WebdriverSession<string>;
export declare const back: WebdriverSession<void>;
export declare const getTimeouts: WebdriverSession<c.Timeouts>;
export declare function setTimeouts(timeouts: c.Timeouts): WebdriverSession<void>;
export declare const forward: WebdriverSession<void>;
export declare const refresh: WebdriverSession<void>;
export declare type LocationStrategy = "css selector" | "link text" | "partial link text" | "tag name" | "xpath";
export declare function findElement(using: LocationStrategy, selector: string): WebdriverSession<c.Element>;
export declare function elementSendKeys(text: string): (element: c.Element) => WebdriverSession<void>;
export declare function getElementAttribute(attribute: string): (element: c.Element) => WebdriverSession<string>;
export declare function performActions(actions: c.ActionSequence["actions"]): WebdriverSession<void>;
