// open chromedriver
// close chromedriver
import chromedriver from "chromedriver"
import { taskEither as TE } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"

// ddd

export type Options = Partial<{
  logOptions: LogOptions
  flags: Array<FlagLiteral>
  port: number
  "adb-port": number
  "log-path": string
  "url-base": string
}>

// actual

export type Verbosity = "ALL" | "DEBUG" | "INFO" | "WARNING" | "SEVERE" | "OFF"

export type LogOptionsAppend = Partial<Record<"append-log", true>>

export type LogOptionsBase = Partial<Record<"log-level", Verbosity>> &
  LogOptionsAppend
export type LogOptionsVerbose = Record<"verbose", true> & LogOptionsAppend
export type LogOptionsSilent = Record<"silent", true>

export type LogOptions = LogOptionsBase | LogOptionsSilent | LogOptionsVerbose

export type FlagLiteral =
  | "replayable"
  | "readable-timestamp"
  | "enable-chrome-logs"
  | "disable-dev-shm-usage"
  | "allowed-ips"

export type ChromeDriverOptions = LogOptions &
  Partial<{
    flags: Array<FlagLiteral>
    port: number
    "adb-port": number
    "log-path": string
    "url-base": string
  }>

// codecs

export const Verbosity: c.Codec<unknown, Verbosity, Verbosity> = c.literal(
  "ALL",
  "DEBUG",
  "INFO",
  "WARNING",
  "SEVERE",
  "OFF"
)

export const LogOptionsAppend: c.Codec<
  unknown,
  LogOptionsAppend,
  LogOptionsAppend
> = c.partial({ "append-log": c.literal(true) })

export const LogOptionsBase: c.Codec<
  unknown,
  LogOptionsBase,
  LogOptionsBase
> = pipe(c.partial({ "log-level": Verbosity }), c.intersect(LogOptionsAppend))

export const LogOptionsVerbose: c.Codec<
  unknown,
  LogOptionsVerbose,
  LogOptionsVerbose
> = pipe(c.type({ verbose: c.literal(true) }), c.intersect(LogOptionsAppend))

export const LogOptionsSilent: c.Codec<
  unknown,
  LogOptionsSilent,
  LogOptionsSilent
> = c.type({ silent: c.literal(true) })

export const LogOptions: c.Codec<unknown, LogOptions, LogOptions> = pipe(
  d.union(LogOptionsAppend, LogOptionsBase, LogOptionsSilent),
  c.fromDecoder
)

export const FlagLiteral: c.Codec<
  unknown,
  FlagLiteral,
  FlagLiteral
> = c.literal(
  "replayable",
  "readable-timestamp",
  "enable-chrome-logs",
  "disable-dev-shm-usage",
  "allowed-ips"
)

export const ChromeDriverOptions: c.Codec<
  unknown,
  ChromeDriverOptions,
  ChromeDriverOptions
> = pipe(
  c.partial({
    flags: c.array(FlagLiteral),
    port: c.number,
    "adb-port": c.number,
    "log-path": c.string,
    "url-base": c.string,
  }),
  c.intersect(LogOptions)
)

export const start = (port: number) =>
  TE.tryCatch(
    () => chromedriver.start([`--silent`], true),
    (e) => e
  )

export const stop = pipe(() => chromedriver.stop(), TE.fromIO)
