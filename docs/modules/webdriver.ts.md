---
title: webdriver.ts
nav_order: 1
parent: Modules
---

## webdriver overview

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [fromBodyWebdriver](#frombodywebdriver)
  - [newSession](#newsession)
- [Constructors](#constructors)
  - [commandSession](#commandsession)
  - [deleteSession](#deletesession)
- [Deconstructors](#deconstructors)
  - [bracketed](#bracketed)
- [Model](#model)
  - [Dependency (interface)](#dependency-interface)
  - [Session (interface)](#session-interface)
  - [SessionDeps (interface)](#sessiondeps-interface)
  - [Webdriver (interface)](#webdriver-interface)

---

# Constructor

## fromBodyWebdriver

**Signature**

```ts
export declare function fromBodyWebdriver(
  options: Record<'method' | 'command', string>
): (body: string) => Webdriver<FetchError<unknown>, unknown>
```

## newSession

**Signature**

```ts
export declare const newSession: Webdriver<unknown, SessionCodec>
```

# Constructors

## commandSession

Create a command for a session. `/session/${sessionId}` has already been applied,
so use the path suffix (ie `/element/active`) of the command.

This is used internally for all session based commands.

**Signature**

```ts
export declare function commandSession(
  options: Record<'method', string> & Record<'command', O.Option<string>>
): (body: O.Option<string>) => Session<FetchError<unknown>, unknown>
```

## deleteSession

**Signature**

```ts
export declare const deleteSession: Session<FetchError<unknown>, void>
```

# Deconstructors

## bracketed

Creates a session, applies the `SessionWebdriver` effect and deletes the
session once it's complete. If the session was created, it will always be
deleted.

**Signature**

```ts
export declare function bracketed<E, A>(sessionWebdriver: Session<E, A>): Webdriver<unknown, A>
```

# Model

## Dependency (interface)

**Signature**

```ts
export interface Dependency {
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

## Session (interface)

A webdriver with a `sessionId` in its context.

**Signature**

```ts
export interface Session<E, A> extends RTE.ReaderTaskEither<SessionDeps, E, A> {}
```

## SessionDeps (interface)

**Signature**

```ts
export interface SessionDeps extends Dependency, Record<'sessionId', string> {}
```

## Webdriver (interface)

**Signature**

```ts
export interface Webdriver<E, A> extends RTE.ReaderTaskEither<Dependency, E, A> {}
```
