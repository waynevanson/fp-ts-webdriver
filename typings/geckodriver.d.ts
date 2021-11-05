declare module "geckodriver" {
  import { ChildProcess } from "node:child_process"

  global {
    namespace NodeJS {
      interface ProcessEnv {
        PATH: string
      }
    }
  }

  /**
   * @summary
   * Version of geckodriver installed
   */
  export const version: string

  /**
   * @summary
   * The install path and name of the geckodriver.
   *
   * @example
   * // windows
   * "./node_modules/geckodriver/bin/geckodriver.exe"
   *
   * @example
   * // non-windows
   * "./node_modules/geckodriver/bin/geckodriver"
   */
  export const path: string
  /**
   * @summary
   * The childProcess that starting the geckodriver executable returns.
   *
   * This value is defined only when `start` has been called.
   */
  export const defaultInstance: ChildProcess | undefined

  /**
   * @summary
   * Start the geckodriver executable, returning the `defaultInstance`, which is a `childProcess`
   *
   * @param args Arguments used for the `geckodriver` executable.
   *
   * @example ["-p", "4000", "-h", "127.0.0.1"]
   *
   * @description
   * USAGE:
   * geckodriver [FLAGS] [OPTIONS]
   *
   * FLAGS:
   * - `--connect-existing` -  Connect to an existing Firefox instance
   * - `-h`, `--help` - Prints this message
   * - `--jsdebugger` - Attach browser toolbox debugger for Firefox
   * - `-v` - Log level verbosity (-v for debug and -vv for trace level)
   * - `-V`, `--version` - Prints version and copying information
   *
   * OPTIONS:
   * - `--android-storage <ANDROID_STORAGE>` - Selects storage location to be used for test data. [default: auto]  [possible values: auto, app, internal, sdcard]
   * - `-b`, `--binary <BINARY>` - Path to the Firefox binary
   * - `--log <LEVEL>` - Set Gecko log level [possible values: fatal, error, warn, info, config, debug, trace]
   * - `--marionette-host <HOST>` - Host to use to connect to Gecko [default: 127.0.0.1]
   * - `--marionette-port <PORT ` - Port to use to connect to Gecko [default: system-allocated port]
   * - `--host <HOST>` - Host IP to use for WebDriver server [default: 127.0.0.1]
   * - `-p`, `--port <PORT>` - Port to use for WebDriver server [default: 4444]
   */
  export function start(args: string[]): ChildProcess

  /**
   * @summary
   * Kills the geckodriver instance
   */
  export function stop(): void
}
