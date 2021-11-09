import { Config } from "@jest/types"
import { array as MA } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import { defaults } from "ts-jest/presets"

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
        displayName: "chromedriver",
        globalSetup: "./jest/chromedriver/globalSetup.ts",
        globalTeardown: "./jest/chromedriver/globalTeardown.ts",
        globals: { "ts-jest": {}, port: 9000 },
        testMatch: [SPECS],
      },
      {
        displayName: "geckodriver",
        globalSetup: "./jest/geckodriver/globalSetup.ts",
        globalTeardown: "./jest/geckodriver/globalTeardown.ts",
        globals: { "ts-jest": {}, port: 7000 },
        testMatch: [SPECS],
      },
    ],
    MA.map((most) => ({ ...most, ...ALL }))
  ),
}

export default config
