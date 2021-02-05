/**
 * @description
 * After creating a session using functions from the `webdriver` module,
 * a `client` will be returned.
 */

import { ioEither, option as O, readerTaskEither as RTE } from "fp-ts"
import { identity, pipe } from "fp-ts/lib/function"
import WD from "webdriver"

export interface SetTimeoutProps {
  implicit?: number
  pageLoad?: number
  script?: number
}

export interface SetWindowRectProps {
  x?: number | null
  y?: number | null
  width?: number | null
  height?: number | null
}

export interface PrintPageProps {
  orientation?: string
  scale?: number
  background?: boolean
  width?: number
  height?: number
  top?: number
  bottom?: number
  left?: number
  right?: number
  shrinkToFit?: boolean
  pageRanges?: object[]
}

export const newSession = (capabilities: WD.Capabilities) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.newSession(capabilities), identity)
    )
  )

export const deleteSession = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.deleteSession(), identity)
  )
)

export const navigateTo = (url: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.navigateTo(url), identity)
    )
  )

export const acceptAlert = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.acceptAlert(), identity)
  )
)

export const addCookie = (cookie: Record<string, string>) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.addCookie(cookie), identity)
    )
  )

export const addListener = (
  event: string | symbol,
  listener: (...args: any[]) => void
) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.addListener(event, listener), identity)
    )
  )

export const back = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.back(), identity)
  )
)

export const closeWindow = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.closeWindow(), identity)
  )
)

export const createWindow = (type: "tab" | "window") =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.createWindow(type), identity)
    )
  )

export const deleteAllCookies = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.deleteAllCookies(), identity)
  )
)

export const deleteCookie = (name: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.deleteCookie(name), identity)
    )
  )

export const dismissAlert = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.dismissAlert(), identity)
  )
)

export const elementClear = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.elementClear(elementId), identity)
    )
  )

export const elementClick = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.elementClick(elementId), identity)
    )
  )

export const elementSendKeys = (text: string) => (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.elementSendKeys(elementId, text), identity)
    )
  )

export const executeAsyncScript = (
  script: string,
  args: Array<string | number | boolean | object | undefined>
) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.executeAsyncScript(script, args), identity)
    )
  )

export const executeScript = (
  script: string,
  args: Array<string | number | boolean | object | undefined>
) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.executeScript(script, args) as unknown,
        identity
      )
    )
  )

export const findElement = (using: string, value: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.findElement(using, value), identity)
    )
  )

export const findElementFromElement = (
  elementId: string,
  using: string,
  value: string
) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.findElementFromElement(elementId, using, value),
        identity
      )
    )
  )

export const findElements = (using: string, value: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.findElements(using, value), identity)
    )
  )

export const findElementsFromElement = (
  elementId: string,
  using: string,
  value: string
) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.findElementsFromElement(elementId, using, value),
        identity
      )
    )
  )

export const forward = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.forward(), identity)
  )
)

export const fullscreenWindow = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.fullscreenWindow(), identity)
  )
)

export const getActiveElement = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getActiveElement(), identity)
  )
)

export const getAlertText = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getAlertText(), identity)
  )
)

export const getAllCookies = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getAllCookies(), identity)
  )
)

export const getElementAttribute = (elementId: string, name: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.getElementAttribute(elementId, name),
        identity
      )
    ),
    RTE.map(O.fromNullable)
  )

export const getElementCSSValue = (
  elementId: string,
  getPropertyName: string
) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.getElementCSSValue(elementId, getPropertyName),
        identity
      )
    )
  )

export const getElementComputedLabel = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.getElementComputedLabel(elementId),
        identity
      )
    )
  )

export const getElementComputedRole = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.getElementComputedRole(elementId),
        identity
      )
    )
  )

export const getElementProperty = (elementId: string, name: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.getElementProperty(elementId, name),
        identity
      )
    )
  )

export const getElementRect = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.getElementRect(elementId), identity)
    )
  )

export const getElementTagName = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.getElementTagName(elementId), identity)
    )
  )

export const getElementText = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.getElementText(elementId), identity)
    )
  )

export const getNamedCookie = (name: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.getNamedCookie(name), identity)
    )
  )

export const getPageSource = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getPageSource(), identity)
  )
)

export const getTimeouts = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getTimeouts(), identity)
  )
)

export const getTitle = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getTitle(), identity)
  )
)

export const getUrl = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getUrl(), identity)
  )
)

export const getWindowHandle = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getWindowHandle(), identity)
  )
)

export const getWindowHandles = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getWindowHandles(), identity)
  )
)
export const getWindowRect = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.getWindowRect(), identity)
  )
)
export const isElementDisplayed = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.isElementDisplayed(elementId), identity)
    )
  )
export const isElementEnabled = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.isElementEnabled(elementId), identity)
    )
  )
export const isElementSelected = (elementId: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.isElementSelected(elementId), identity)
    )
  )
export const maximizeWindow = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.maximizeWindow(), identity)
  )
)
export const minimizeWindow = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.minimizeWindow(), identity)
  )
)
export const performActions = (actions: Array<object>) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.performActions(actions), identity)
    )
  )

export const printPage = ({
  orientation,
  scale,
  background,
  width,
  height,
  top,
  bottom,
  left,
  right,
  shrinkToFit,
  pageRanges,
}: PrintPageProps) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () =>
          client.printPage(
            orientation,
            scale,
            background,
            width,
            height,
            top,
            bottom,
            left,
            right,
            shrinkToFit,
            pageRanges
          ),
        identity
      )
    )
  )

export const refesh = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.refresh(), identity)
  )
)

export const releaseActions = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.releaseActions(), identity)
  )
)

export const sendAlertText = (text: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.sendAlertText(text), identity)
    )
  )

export const setTimeouts = ({ implicit, pageLoad, script }: SetTimeoutProps) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.setTimeouts(implicit, pageLoad, script),
        identity
      )
    )
  )

export const setWindowRect = ({
  x = null,
  y = null,
  width = null,
  height = null,
}: SetWindowRectProps) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.setWindowRect(x, y, width, height),
        identity
      )
    )
  )
export const status = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.status(), identity)
  )
)

export const switchToFrame = (id: number | object | null) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.switchToFrame(id), identity)
    )
  )
export const switchToParentFrame = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.switchToParentFrame(), identity)
  )
)
export const switchToWindow = (handle: string) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(() => client.switchToWindow(handle), identity)
    )
  )

export const takeElementScreenshot = (elementId: string, scroll?: boolean) =>
  pipe(
    RTE.ask<WD.Client>(),
    RTE.chainIOEitherK((client) =>
      ioEither.tryCatch(
        () => client.takeElementScreenshot(elementId, scroll),
        identity
      )
    )
  )

export const takeScreenshot = pipe(
  RTE.ask<WD.Client>(),
  RTE.chainIOEitherK((client) =>
    ioEither.tryCatch(() => client.takeScreenshot(), identity)
  )
)
