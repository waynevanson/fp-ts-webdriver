# fp-ts-webdriver

W3C Webdriver API, optimized for usage with fp-ts.

The goal is to be compatible with the [W3C Recommendation](https://www.w3.org/TR/webdriver1)

A webdriver sends requests and returns responses.
We send a request to a driver (chromdriver, geckodriver), it opens up an instance of the browser and runs our requests in real time.

## Installation

Please keep in mind that this is package is experiemental and not enough tests have been written.

```sh
# yarn
yarn add fp-ts-webdriver fp-ts fp-ts-std io-ts monocle-ts newtype-ts

# npm
npm install fp-ts-webdriver fp-ts fp-ts-std io-ts monocle-ts newtype-ts
```

## Usage

### Exports

There is currently one named export `webdriver` that exports a namespace of all API's related to the basic webdriver protocol.

When more are added, they'll be available under `chrome`, `firefox` and `edge` respectively.
These will be separated so we can have better intellicense and troubleshooting.

### Example

For this examples to function, you have to turn on your webdriver.
With chromedriver the command is `chromedriver --port=4444`

```ts

import { webdriver as WD, readerReaderTaskEither as RRTE } from "fp-ts-webdriver"
import { pipe } from "fp-ts/lib/function"
import { readerTaskEither as RTE, taskEither as TE } from "fp-ts"

const searchBar = WD.findElement("css selector", "input[name=\"q\"]")
const searchButton = WD.findElement("css selector", "input[value=\"Google Search\"]")

const program = pipe(
  WD.navigateTo("https://google.com.au"),
  RRTE.chain(() => searchBar),
  RRTE.chainFirst((element) => WD.sendKeys("dogs")(element)),
  RRTE.chain(() => searchButton)
  RRTE.chain(element => WD.elementClick(element))
)

export const capabilities: WD.Capabilities = {}

const dependencies:WD.Dependencies =  {
  url: "localhost:4444",
}

// creates a session and closes it after runnning `program`
const main = pipe(
  program, WD.runSession(capabilities)
)

// TE.TaskEither<WD.Errors, void>
main(dependencies)()
```

## Compatibility

We have tests in chromedriver and will expand to other drivers like geckodriver when the time comes.

| Category            | :o:                | Command                 |
| :------------------ | ------------------ | :---------------------- |
| Session             | :heavy_check_mark: | newSession              |
|                     | :heavy_check_mark: | deleteSession           |
|                     | :heavy_check_mark: | status                  |
|                     | :heavy_check_mark: | getTimeouts             |
|                     | :heavy_check_mark: | setTimeouts             |
| Navigation          | :heavy_check_mark: | navigateTo              |
|                     | :heavy_check_mark: | getCurrentUrl           |
|                     | :heavy_check_mark: | back                    |
|                     | :o:                | forward                 |
|                     | :o:                | refresh                 |
|                     | :o:                | getTitle                |
| Command Contexts    | :o:                | getWindowHandle         |
|                     | :o:                | closeWindow             |
|                     | :o:                | switchToWindow          |
|                     | :o:                | getWindowHandles        |
|                     | :o:                | switchtoFrame           |
|                     | :o:                | switchToParentFrame     |
|                     | :o:                | getWindowRect           |
|                     | :o:                | setWindowRect           |
|                     | :o:                | maximizeWindow          |
|                     | :o:                | minimizeWindow          |
| Element Retrieval   | :o:                | findElement             |
|                     | :o:                | findElements            |
|                     | :o:                | findElementFromElement  |
|                     | :o:                | findElementsFromElement |
| Element State       | :o:                | isElementSelected       |
|                     | :o:                | getElementAttribute     |
|                     | :o:                | getElementProperty      |
|                     | :o:                | getElementCSSValue      |
|                     | :o:                | getElementText          |
|                     | :o:                | getElementTagName       |
|                     | :o:                | getElementRect          |
|                     | :o:                | isElementEnabled        |
| Element Interaction | :o:                | elementClick            |
|                     | :o:                | elementClear            |
|                     | :o:                | elementSendKeys         |
| Document Handling   | :o:                | getPageSource           |
|                     | :o:                | executeScript           |
|                     | :o:                | executeAsyncScript      |
| Cookies             | :o:                | getAllCookies           |
|                     | :o:                | getNamedCookie          |
|                     | :o:                | addCookie               |
|                     | :o:                | deleteCookie            |
|                     | :o:                | deleteAllCookies        |
| Actions             | :o:                | performActions          |
|                     | :o:                | releaseActions          |
| User Prompts        | :o:                | dismissAlert            |
|                     | :o:                | acceptAlert             |
|                     | :o:                | getAlertText            |
|                     | :o:                | sendAlertText           |
| Screen Capture      | :o:                | takeScreenshot          |
|                     | :o:                | takeElementScreenshot   |

## Contributing

Run tests by calling `yarn test`.

If you encounter problems, run `yarn add -D chromedriver`, and this will install a chromedriver on your system (along with chromium I presume).

Follow angular commit syntax with `<fix|feat|docs|build|tests>: <message>`.
The goal is to make commit history easy to walkthrough in the future.

Project follows semantic versioning.
