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
    Try, TryAsync, Get, Find,
    transpose, flatten, 
    fromPromise,
} from 'simply-result-util';
```
