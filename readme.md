# template-typescript-library

When asking users to install your package, they need to run the following:

```
echo "@waynevanson:registry=https://npm.pkg.github.com" >> .npmrc
```

A starter template configured for Typescript based node projects.
I use these tools for librarires all the time now, so I've made a template for convenience.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<!-- Don't run doctoc. It will be run for you when you commit this file. -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Setup](#setup)
- [Tools](#tools)
  - [`yarn`](#yarn)
  - [`typescript`](#typescript)
  - [`prettier`](#prettier)
  - [`eslint`](#eslint)
  - [`lint-staged`](#lint-staged)
  - [`husky`](#husky)
  - [`commitizen`](#commitizen)
  - [`commitlint`](#commitlint)
  - [`semantic-release`](#semantic-release)
  - [`jest`](#jest)
  - [Github Actions](#github-actions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

Once you've cloned this template and downloaded it to your local machine, you'll have a few things to change before it will be truly yours.

| File                             | Action                                           |
| :------------------------------- | :----------------------------------------------- |
| **`packagejson.name`**           | Change to the name that will be consumed by NPM. |
| **`packagejson.repository.url`** | Change to your git repository URL.               |

## Tools

### `yarn`

We're using yarn for package management.

I love the convenience the CLI has over NPM's CLI and it's widely supported with other workflows.

### `typescript`

Typescript is a typed superset of JavaScript. Write javascript but have your editor pick up any errors via the Typescript Compiler.

We build targets `cjs` and `es6`, which can be found in `.config/tsconfig.*.json`.

The build script runs in parallel thanks to `npm-run-all --parallel`.

### `prettier`

Formats your code to look very pretty, only for staged files on commit.

### `eslint`

Enforces a great code style, only for staged files on commit.

### `lint-staged`

Runs eslint, prettier and doctoc on staged files only, where applicable.

### `husky`

Allows all this

### `commitizen`

WHen commiting, you should run `yarn commit` to get a pretty looking CLI that ensures you stick to the default commit style.

### `commitlint`

We use this to lint the commits. If they don't follow the angular style `<type>([scope]): <message>` then the commit will not be added.

### `semantic-release`

semantic-release releases your package to NPM. You don't need to do anything, it's all handled with Github Actions.

Everytime you push to the `main` branch, it will trigger and release a version based on the commit history.

### `jest`

Jest is an all-in-one solution for testing and is widely supported.

### Github Actions

Github actions will test and build your package. If it's on master and both of these went well, it will release.
