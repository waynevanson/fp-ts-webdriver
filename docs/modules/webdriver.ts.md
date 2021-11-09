---
title: webdriver.ts
nav_order: 1
parent: Modules
---

## webdriver overview

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [command](#command)
  - [commandSession](#commandsession)
  - [deleteSession](#deletesession)
  - [newSession](#newsession)
- [Deconstructors](#deconstructors)
  - [bracketed](#bracketed)
- [Model](#model)
  - [CommandOptions (interface)](#commandoptions-interface)
  - [Session (interface)](#session-interface)
  - [SessionDeps (interface)](#sessiondeps-interface)
  - [Webdriver (interface)](#webdriver-interface)
  - [WebdriverDeps (interface)](#webdriverdeps-interface)

---

# Constructors

## command

Create a command for a session. `/session/${sessionId}` has already been applied,
so use the path suffix (ie `/element/active`) of the command.

This is used internally for all session based commands.

**Signature**

```ts
export declare function command<A>(options: CommandOptions<A>)
```

## commandSession

Create a command for a session. `/session/${sessionId}` has already been applied,
so use the path suffix (ie `/element/active`) of the command.

This is used internally for all session based commands.

**Signature**

```ts
export declare function commandSession<A>(options: CommandOptions<A>)
```

## deleteSession

**Signature**

```ts
export declare const deleteSession: RTE.ReaderTaskEither<
  SessionDeps & WebdriverDeps,
  | TypeError
  | Of<DecodeError<string>>
  | Concat<DecodeError<string>>
  | SyntaxError
  | NetworkError
  | ParserError
  | ResponseError<unknown>,
  void
>
```

## newSession

**Signature**

```ts
export declare const newSession: RTE.ReaderTaskEither<
  WebdriverDeps,
  | TypeError
  | Of<DecodeError<string>>
  | Concat<DecodeError<string>>
  | SyntaxError
  | NetworkError
  | ParserError
  | ResponseError<unknown>,
  SessionCodec
>
```

# Deconstructors

## bracketed

Creates a session, runs the `Session` and deletes the
session once it's complete. If the session was created, it will always be
deleted.

**Signature**

```ts
export declare function bracketed<E, A>(sessionWebdriver: Session<E, A>)
```

# Model

## CommandOptions (interface)

**Signature**

```ts
export interface CommandOptions<A> {
  method: 'PUT' | 'POST' | 'DELETE'
  command?: O.Option<string>
  decoder: d.Decoder<unknown, A>
}
```

## Session (interface)

A webdriver with a `sessionId` in its context.

**Signature**

```ts
export interface Session<E, A> extends RTE.ReaderTaskEither<SessionDeps, E, A> {}
```

## SessionDeps (interface)

**Signature**

```ts
export interface SessionDeps extends WebdriverDeps {
  sessionId: string
}
```

## Webdriver (interface)

**Signature**

```ts
export interface Webdriver<E, A> extends RTE.ReaderTaskEither<WebdriverDeps, E, A> {}
```

## WebdriverDeps (interface)

**Signature**

```ts
export interface WebdriverDeps {
  capabilities: Capabilities
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
   * `body` and `method` have been omitted as the webdriver protocol specifies
   * these are reserved to specify the type of command.
   */
  requestInit: Omit<RequestInit, 'body' | 'method'>
}
```
