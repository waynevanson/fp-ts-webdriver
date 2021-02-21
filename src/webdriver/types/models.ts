import { FetchError } from "fp-fetch"
import { readerTaskEither as RTE } from "fp-ts"
import { Endomorphism } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import { Session } from "../../codecs"
import * as RRTE from "../../reader-reader-task-either"

export interface Dependencies {
  /**
   * @summary
   * The `url` to the remote end of the webdriver.
   *
   * Local Servers:
   * - Chromedriver runs by default `localhost:9515`.
   *
   * @todo Remote Servers example
   *
   * @example
   * "localhost:4000"
   */
  endpoint: string

  /**
   * @summary
   * This is appended to fetch's `RequestInit`.
   *
   * `body` and `method` have been emitted as the webdriver protocol specifies
   * these are reserved to specify the type of command.
   */
  requestInit?: Omit<RequestInit, "body" | "method">
}

/**
 * @summary
 * Errors expected between:
 * - Handling unsuccessful response codes.
 * - Decoding responses.
 * - Convert `JSON` to `string` via `JSONStringify`.
 
 */
export type WebdriverErrors = FetchError | d.DecodeError | TypeError

/**
 * @summary
 * The connection between the local end and remote end of the web driver.
 *
 * @category Model
 * @since 3.2.0
 */
export interface Webdriver<A>
  extends RTE.ReaderTaskEither<Dependencies, WebdriverErrors, A> {}

/**
 * @summary
 * Allows composing a `Session` with the `WebDriver` model.
 *
 * @see WebDriver<A>
 * @category Model
 * @since 3.2.0
 */
export interface WebdriverSession<A>
  extends RRTE.ReaderReaderTaskEither<
    Session,
    Dependencies,
    WebdriverErrors,
    A
  > {}

/**
 * @summary
 * Possible values for the `method` property
 
 * @internal
 */
export type RequestMethod = "POST" | "GET" | "DELETE"

/*
 * @internal
 */
export interface FetchProps<A extends object> {
  /**
   * @summary
   * Used to append values to the string
   */
  endo: Endomorphism<string>
  /**
   * @summary
   * The method used for the request to the remote end.
   */
  method: RequestMethod
  /**
   * @summary
   * The body of the request.
   * This will be stringified and sent in the request to the remote end.
   */
  body?: A
}
