# fp-ts-webdriver

W3C Webdriver API, optimized for usage with fp-ts.

Currently uses `webdriver` package, but will move to using `fp-ts-fetch` at a later date.

A webdriver sends requests and returns responses.
We send a request to a driver (chromdriver, geckodriver), it opens up an instance of the browser and runs our requests in real time.

## Installation

```sh
# yarn
yarn add fp-ts-webdriver

# npm
npm install fp-ts-webdriver
```

## Usage

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