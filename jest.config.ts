import { Config } from "@jest/types"
import { array as MA } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import { defaults } from "ts-jest/presets"
import { Capabilities } from "./src/webdriver/index"

export interface WebdriverGlobals {
  readonly host: string
  readonly port: number
  readonly capabilities: Capabilities
}

declare global {
  var webdriver: WebdriverGlobals | undefined
}

declare module "@jest/types" {
  namespace Config {
    export interface ConfigGlobals {
      readonly webdriver?: WebdriverGlobals
    }
  }
}

const SPECS = "**/*.spec.ts"
const TESTS = "**/*.test.ts"

export const ALL: Config.InitialProjectOptions = {
  ...defaults,
  setupFilesAfterEnv: ["@relmify/jest-fp-ts"],
}

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.ts"],
  setupFilesAfterEnv: ["@relmify/jest-fp-ts"],
  projects: pipe(
    [
      {
        displayName: "unit",
        testMatch: [TESTS],
      },
      {
        displayName: "chrome",
        globalSetup: "./jest/chromedriver/globalSetup.ts",
        globalTeardown: "./jest/chromedriver/globalTeardown.ts",
        globals: {
          "ts-jest": {},
          webdriver: {
            port: 9000,
            host: "http://localhost",
            capabilities: {
              alwaysMatch: {
                browserName: "chrome",
                "goog:chromeOptions": {
                  args: ["--headless"],
                },
              },
            },
          },
        },
        testMatch: [SPECS],
      },
      // {
      //   displayName: "gecko",
      //   globalSetup: "./jest/geckodriver/globalSetup.ts",
      //   globalTeardown: "./jest/geckodriver/globalTeardown.ts",
      //   globals: {
      //     "ts-jest": {},
      //     webdriver: {
      //       port: 7000,
      //       host: "http://localhost",
      //       capabilities: {
      //         alwaysMatch: {
      //           browserName: "firefox",
      //         },
      //       },
      //     },
      //   },
      //   testMatch: [SPECS],
      // },
    ] as Array<Config.InitialProjectOptions>,
    MA.map((most) => ({ ...most, ...ALL }))
  ),
}

export default config
