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
yarn add fp-ts-webdriver

# npm
# peer dependencies
npm install fp-ts fp-ts-std io-ts monocle-ts newtype-ts
npm install fp-ts-webdriver
```

## Usage

There are two types of dependencies: `WebdriverDeps` and `SessionDeps`.

`SessionDeps` extends `WebdriverDeps` with the `sessionId`.
All commands that use this as the dependency require a session.

### Example

For this examples to function, you have to turn on your webdriver.
With chromedriver the command is `chromedriver --port=4444`.
Checkout the tests on how to set this up automatically with jest.

```ts
import { webdriver as WD, readerReaderTaskEither as RRTE } from "fp-ts-webdriver"
import { pipe } from "fp-ts/lib/function"
import { readerTaskEither as RTE } from "fp-ts"

const searchBar = WD.findElement("css selector", "input[name=\"q\"]")
const searchButton = WD.findElement("css selector", "input[value=\"Google Search\"]")

// requires a session
const program = pipe(
  WD.navigateTo("https://google.com.au"),
  RTE.apSecond(searchBar),
  RTE.chainFirst(WD.sendKeys("dogs")),
  RTE.apSecond(searchButton)
  RTE.chain(WD.elementClick)
)

const dependencies: WD.WebdriverDeps =  {
  url: "localhost:4444",
  capabilities: { alwaysMatch: {} },
  requestInit: {}
}

// creates a session and closes it after runnning `program`
const main = WD.bracketed(program)

main(dependencies)().catch(console.error)
```

### Need Something Now?

Doing commands in an order that makes sense. If there's some you want, make a PR or ask! :)
