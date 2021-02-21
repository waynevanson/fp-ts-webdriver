import * as d from "io-ts/Decoder";
import { FetchProps, NewSession, Webdriver, WebdriverSession } from "./types";
/**
 * @summary
 * Custom combinators for the webdriver, not specified in the webdriver protocol.
 */
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
 * @internal
 */
export declare const make: <E extends object, A>({ decoder, fetch: { body, endo, method }, }: MakeProps<E, A>) => Webdriver<A>;
/**
 * @summary
 * Creates a `Session` that will always close if it opened,
 * by calling a `WebDriverSession`.
 *
 * @param body
 * @category Combinators
 * @since 3.2.0
 */
export declare function runSession(body: NewSession): <A>(fa: WebdriverSession<A>) => Webdriver<A>;
