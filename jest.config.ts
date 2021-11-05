import { Config } from "@jest/types"
import { defaults } from "ts-jest/presets"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.ts"],
  globals: { "ts-jest": {} },
  projects: [
    {
      ...defaults,
      displayName: "chromedriver",
      globalSetup: "./jest/chromedriver/globalSetup.ts",
      globalTeardown: "./jest/chromedriver/globalTeardown.ts",
      globals: { "ts-jest": {}, port: 9000 },
    },
    {
      ...defaults,
      displayName: "geckodriver",
      globalSetup: "./jest/geckodriver/globalSetup.ts",
      globalTeardown: "./jest/geckodriver/globalTeardown.ts",
      globals: { "ts-jest": {}, port: 7000 },
    },
  ],
}

export default config
