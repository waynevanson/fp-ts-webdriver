import { Element, Session, Status, Timeouts } from "../codecs";
import { ActionSequence, NewSession, Webdriver, WebdriverSession } from "./types";
/**
 *
 * @summary
 * Creates a new webdriver session
 *
 * @param body
 *
 * @see [New Session](https://www.w3.org/TR/webdriver1/#dfn-creating-a-new-session)
 * @category Constructors
 * @since 3.2.0
 */
export declare function newSession(body: NewSession): Webdriver<Session>;
/**
 *
 *
 * @description
 * Status returns information about whether a remote end is in a state in which
 * it can create new sessions, but may additionally include arbitrary meta
 * information that is specific to the implementation.
 *
 * @see [Status](https://www.w3.org/TR/webdriver1/#dfn-status)
 */
export declare const status: Webdriver<Status>;
/**
 * @summary
 * Deletes the given `Session`.
 *
 * @see [Delete Session](https://www.w3.org/TR/webdriver1/#delete-session)
 * @since 3.2.0
 */
export declare const deleteSession: WebdriverSession<void>;
export declare function navigateTo(url: string): WebdriverSession<void>;
export declare const getCurrentUrl: WebdriverSession<string>;
export declare const back: WebdriverSession<void>;
export declare const getTimeouts: WebdriverSession<Timeouts>;
export declare function setTimeouts(timeouts: Timeouts): WebdriverSession<void>;
export declare const forward: WebdriverSession<void>;
export declare const refresh: WebdriverSession<void>;
export declare type LocationStrategy = "css selector" | "link text" | "partial link text" | "tag name" | "xpath";
export declare function findElement(using: LocationStrategy, selector: string): WebdriverSession<Element>;
export declare function elementSendKeys(text: string): (element: Element) => WebdriverSession<void>;
export declare function getElementAttribute(attribute: string): (element: Element) => WebdriverSession<string>;
export declare function performActions(actions: ActionSequence["actions"]): WebdriverSession<void>;
export declare const releaseActions: WebdriverSession<void>;
