# fp-ts-webdriver

W3C Webdriver API, optimized for usage with fp-ts.

The goal is to be compatible with the [W3C Recommendation](https://www.w3.org/TR/webdriver1)

A webdriver sends requests and returns responses.
We send a request to a driver (chromdriver, geckodriver), it opens up an instance of the browser and runs our requests in real time.

## Installation

Please keep in mind that this is package is experiemental and not enough tests have been written.

```sh
# yarn
yarn add fp-ts-webdriver fp-ts fp-ts-std monocle-ts newtype-ts

# npm
npm install fp-ts-webdriver fp-ts fp-ts-std monocle-ts newtype-ts
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

import { webdriver as WD } from "fp-ts-webdriver"
import { pipe } from "fp-ts/lib/function"
import { readerTaskEither as RTE, taskEither as TE } from "fp-ts"

const searchBar = WD.findElement("css selector", "input[name=\"q\"]")
const searchButton = WD.findElement("css selector", "input[value=\"Google Search\"]")

// R.Reader<
//   WD.Session,
//   RTE.ReaderTaskEither<WD.Dependencies, WD.Errors, void>
// >
const program: WD.WebdriverSession<void> = pipe(
  WD.navigateTo("https://google.com.au"),
  RTE.chain(() => searchBar),
  RTE.chainFirst((element) => WD.sendKeys("dogs")(element)),
  RTE.chain(() => searchButton)
  RTE.chain(element => WD.elementClick(element))
)

export const capabilities: WD.Capabilities = {}

const dependencies:WD.Dependencies =  {
  url: "localhost:4444",
}

const main = pipe(
  // start a session
  WD.newSession({ capabilities }),
  // run your program
  RTE.chainFirst(program),
  // delete the session
  RTE.chain(WD.deleteSession)
)

// TE.TaskEither<WD.Errors, void>
main(dependencies)()
```

## Compatibility

We have tests in chromedriver and will expand to other drivers like geckodriver when the time comes.

List is non-exhaustive, meaning it's incomplete.

| Implemented | Command       | Notes |
| ----------- | :------------ | ----- |
| [x]         | newSession    |       |
| [x]         | deleteSession |       |
| [x]         | navigateTo    |       |
| [x]         | status        |       |
| [x]         | getCurrentUrl |       |
| [x]         | back          |       |
| [ ]         | forward       |       |
| [ ]         | refresh       |       |

## Contributing

Run tests by calling `yarn test`.

If you encounter problems, run `yarn add -D chromedriver`, and this will install a chromedriver on your system (along with chromium I presume).

Follow angular commit syntax with `<fix|feat|docs|build|tests>: <message>`.
The goal is to make commit history easy to walkthrough in the future.

Project follows semantic versioning.
