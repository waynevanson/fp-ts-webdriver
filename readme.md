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

todo - fix this section to reflect current api

- Create and compose `ReaderTaskEither<Client, errors, A>` using the API via `fp-ts-webdriver.client.*`.
- Create client via `fp-ts-webdriver.webdriver.newSession()`.
- Call `ReaderTaskEither<Client, errors, A>` with the newly created `Client`.
- Call `fp-ts-webdriver.client.deleteSession()` to stop the session.

```ts
// purposefully not using partial application for demonstrative purposes
import { session, client } from "fp-ts-webdriver"
import { pipe } from "fp-ts/lib/function"
import { readerTaskEither as RTE, taskEither as TE } from "fp-ts"
import * as WD from "webdriver"

const searchBar = client.findElement("css selector", "input[name=\"q\"]")
const searchButton = client.findElement("css selector", "input[value=\"Google Search\"]")

const program: RTE.ReaderTaskEither<WD.WebDriver, unknown, void> = pipe(
  client.navigateTo("https://google.com.au"),
  RTE.chain(() => searchBar),
  RTE.chainFirst((element) => client.sendKeys("dogs")(element)),
  RTE.chain(() => searchButton)
  RTE.chain(element => client.elementClick(element))
)

const props =  {
  options: {
    capabilities: {},
  },
}

const main = pipe(
  // start a session
  session.newSession(props),
  // run your program
  TE.chainFirst(program),
  // delete the session
  TE.chain(client.deleteSession)
)
```

## Contributing

Run tests by calling `yarn test`.

If you encounter problems, run `yarn add -D chromedriver`, and this will install a chromedriver on your system (along with chromium or chrome I presume).
