/**
 * @description
 * After creating a session using functions from the `webdriver` module,
 * a `client` will be returned.
 */
import { option as O, readerTaskEither as RTE } from "fp-ts";
import WD from "webdriver";
export interface SetTimeoutProps {
    implicit?: number;
    pageLoad?: number;
    script?: number;
}
export interface SetWindowRectProps {
    x?: number | null;
    y?: number | null;
    width?: number | null;
    height?: number | null;
}
export interface PrintPageProps {
    orientation?: string;
    scale?: number;
    background?: boolean;
    width?: number;
    height?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    shrinkToFit?: boolean;
    pageRanges?: object[];
}
declare type Using = "css selector" | "link text" | "partial link text" | "tag name" | "xpath";
export declare const newSession: (capabilities: WD.Capabilities) => RTE.ReaderTaskEither<WD.Client, unknown, WD.SessionReturn>;
export declare const deleteSession: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const navigateTo: (url: string) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const acceptAlert: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const addCookie: (cookie: Record<string, string>) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const addListener: (event: string | symbol, listener: (...args: any[]) => void) => RTE.ReaderTaskEither<WD.Client, unknown, WD.Client>;
export declare const back: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const closeWindow: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const createWindow: (type: "tab" | "window") => RTE.ReaderTaskEither<WD.Client, unknown, WD.WindowHandle>;
export declare const deleteAllCookies: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const deleteCookie: (name: string) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const dismissAlert: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const elementClear: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const elementClick: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const elementSendKeys: (text: string) => (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const executeAsyncScript: (script: string, args: Array<string | number | boolean | object | undefined>) => RTE.ReaderTaskEither<WD.Client, unknown, any>;
export declare const executeScript: (script: string, args: Array<string | number | boolean | object | undefined>) => RTE.ReaderTaskEither<WD.Client, unknown, unknown>;
export declare const findElement: (using: Using, value: string) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const findElementFromElement: (elementId: string, using: string, value: string) => RTE.ReaderTaskEither<WD.Client, unknown, Record<"element-6066-11e4-a52e-4f735466cecf", string>>;
export declare const findElements: (using: string, value: string) => RTE.ReaderTaskEither<WD.Client, unknown, string[]>;
export declare const findElementsFromElement: (elementId: string, using: string, value: string) => RTE.ReaderTaskEither<WD.Client, unknown, Record<"element-6066-11e4-a52e-4f735466cecf", string>[]>;
export declare const forward: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const fullscreenWindow: RTE.ReaderTaskEither<WD.Client, unknown, WD.RectReturn>;
export declare const getActiveElement: RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getAlertText: RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getAllCookies: RTE.ReaderTaskEither<WD.Client, unknown, object[]>;
export declare const getElementAttribute: (elementId: string, name: string) => RTE.ReaderTaskEither<WD.Client, unknown, O.Option<string>>;
export declare const getElementCSSValue: (elementId: string, getPropertyName: string) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getElementComputedLabel: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getElementComputedRole: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getElementProperty: (elementId: string, name: string) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getElementRect: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, WD.RectReturn>;
export declare const getElementTagName: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getElementText: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getNamedCookie: (name: string) => RTE.ReaderTaskEither<WD.Client, unknown, WD.Cookie>;
export declare const getPageSource: RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getTimeouts: RTE.ReaderTaskEither<WD.Client, unknown, Record<"script" | "pageLoad" | "implicit", number>>;
export declare const getTitle: RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getUrl: RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getWindowHandle: RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const getWindowHandles: RTE.ReaderTaskEither<WD.Client, unknown, string[]>;
export declare const getWindowRect: RTE.ReaderTaskEither<WD.Client, unknown, WD.RectReturn>;
export declare const isElementDisplayed: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, boolean>;
export declare const isElementEnabled: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, boolean>;
export declare const isElementSelected: (elementId: string) => RTE.ReaderTaskEither<WD.Client, unknown, boolean>;
export declare const maximizeWindow: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const minimizeWindow: RTE.ReaderTaskEither<WD.Client, unknown, WD.RectReturn>;
export declare const performActions: (actions: Array<object>) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const printPage: ({ orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges, }: PrintPageProps) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const refesh: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const releaseActions: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const sendAlertText: (text: string) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const setTimeouts: ({ implicit, pageLoad, script }: SetTimeoutProps) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const setWindowRect: ({ x, y, width, height, }: SetWindowRectProps) => RTE.ReaderTaskEither<WD.Client, unknown, WD.RectReturn>;
export declare const status: RTE.ReaderTaskEither<WD.Client, unknown, WD.StatusReturn>;
export declare const switchToFrame: (id: number | object | null) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const switchToParentFrame: RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const switchToWindow: (handle: string) => RTE.ReaderTaskEither<WD.Client, unknown, void>;
export declare const takeElementScreenshot: (elementId: string, scroll?: boolean | undefined) => RTE.ReaderTaskEither<WD.Client, unknown, string>;
export declare const takeScreenshot: RTE.ReaderTaskEither<WD.Client, unknown, string>;
export {};
