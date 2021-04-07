# fp-ts-webdriver

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

W3C Webdriver API, optimized for usage with fp-ts.

The goal is to be compatible with the [W3C Recommendation](https://www.w3.org/TR/webdriver1)

A webdriver sends requests and returns responses.
We send a request to a driver (chromdriver, geckodriver), it opens up an instance of the browser and runs our requests in real time.

## Installation

Please keep in mind that this is package is experiemental and not enough tests have been written.

```sh
# yarn
## peer dependencies
yarn add fp-ts fp-ts-std io-ts monocle-ts newtype-ts
yarn add fp-ts-webdriver@next

# npm
# peer dependencies
npm install fp-ts fp-ts-std io-ts monocle-ts newtype-ts
npm install fp-ts-webdriver@next
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

const dependencies: WD.Dependencies =  {
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

### Need Something Now?

We're adding features as WE need them in our other projects.

If you would like something in particular, just ask!
We're not taking donations at this stage.

### Table

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
|                     | :heavy_check_mark: | forward                 |
|                     | :heavy_check_mark: | refresh                 |
|                     | :heavy_check_mark: | getTitle                |
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
| Element Retrieval   | :heavy_check_mark: | findElement             |
|                     | :o:                | findElements            |
|                     | :o:                | findElementFromElement  |
|                     | :o:                | findElementsFromElement |
| Element State       | :o:                | isElementSelected       |
|                     | :heavy_check_mark: | getElementAttribute     |
|                     | :o:                | getElementProperty      |
|                     | :o:                | getElementCSSValue      |
|                     | :o:                | getElementText          |
|                     | :o:                | getElementTagName       |
|                     | :o:                | getElementRect          |
|                     | :o:                | isElementEnabled        |
| Element Interaction | :o:                | elementClick            |
|                     | :o:                | elementClear            |
|                     | :heavy_check_mark: | elementSendKeys         |
| Document Handling   | :o:                | getPageSource           |
|                     | :o:                | executeScript           |
|                     | :o:                | executeAsyncScript      |
| Cookies             | :o:                | getAllCookies           |
|                     | :o:                | getNamedCookie          |
|                     | :o:                | addCookie               |
|                     | :o:                | deleteCookie            |
|                     | :o:                | deleteAllCookies        |
| Actions             | :heavy_check_mark: | performActions          |
|                     | :heavy_check_mark: | releaseActions          |
| User Prompts        | :o:                | dismissAlert            |
|                     | :o:                | acceptAlert             |
|                     | :o:                | getAlertText            |
|                     | :o:                | sendAlertText           |
| Screen Capture      | :o:                | takeScreenshot          |
|                     | :o:                | takeElementScreenshot   |

## Contributing

- Fork and clone this repository `gh repo fork waynevanson/fp-ts-webdriver --clone --remote`
- Install dependencies with `yarn install`
- Ensure tests run in your environment with `yarn test`
  - if chromedriver does not exist, run `yarn add -D chromedriver` to run it's install script, where it will install chromedriver on your machine.
- Commiting
  - Add a feature
  - Add tests
  - Change the compatibility section of `readme.md` under the feature name from `:o:` to `:heavy_check_mark:`
  - Commit message should be of `<fix|feat|docs|build|tests>: <message>`, which is used to generate a changelog.
- Pushing
  - After all commits have been applied, rebase from the master repo with `git pull --rebase`.
  - Push with `git push`
