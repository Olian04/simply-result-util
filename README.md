[![Latest released version](https://img.shields.io/npm/v/simply-result-util)](https://www.npmjs.com/package/simply-result-util)
![Minified and gzipped bundle size](./assets/size.badge.svg)
![Type support](https://img.shields.io/npm/types/simply-result-util)
[![CI status](https://img.shields.io/github/actions/workflow/status/olian04/simply-result-util/ci.yml?event=push&label=tests)](https://github.com/Olian04/simply-result-util/actions/workflows/ci.yml)
[![Code coverage](https://img.shields.io/codecov/c/gh/olian04/simply-result-util?token=54HYINU8yj&label=test%20coverage)](https://codecov.io/gh/Olian04/simply-result-util)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-result-util?label=downloads%20npm)](https://www.npmjs.com/package/simply-result-util)
[![MIT licensed](https://img.shields.io/npm/l/simply-result-util)](./LICENSE)

# simply-result-util

Provides monadic utility functions using the [simply-result package](https://github.com/Olian04/simply-result).

## Installation

### NPM

[`npm i simply-result-util`](https://www.npmjs.com/package/simply-result-util)

```ts
import {
    Try, TryAsync, Get, 
    transpose, flatten, 
    fromPromise,
} from 'simply-result-util';
```

## Type Docs

```ts
function Try<V, E = Error>(fn: () => V): Result<V, E>

function TryAsync<V, E = Error>(fn: () => Promise<V>): Promise<Result<V, E>>

function Get<V, K>(maplike: {
  get(key: K): V
  has(key: K): boolean
}, key: K): Option<V>

function transpose<V, E>(result: Result<Option<V>, E>): Option<Result<V, E>>

function flatten<V>(outerOption: Option<Option<V>>): Option<V>
function flatten<V, E>(outerResult: Result<Result<V, E>, E>): Result<V, E>

function fromPromise<T, E = Error>(promiselike: PromiseLike<T>): Promise<Result<T, E>>
```
