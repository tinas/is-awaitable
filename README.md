# is-awaitable

[![npm version](https://img.shields.io/npm/v/is-awaitable.svg)](https://www.npmjs.com/package/is-awaitable)
![Build status](https://github.com/tinas/is-awaitable/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/tinas/is-awaitable/branch/main/graph/badge.svg)](https://codecov.io/gh/tinas/is-awaitable)
[![License](https://img.shields.io/npm/l/is-awaitable.svg)](LICENSE)

A tiny, zero-dependency TypeScript utility to detect functions declared with `async` (including async generators).

## Installation

Using npm:
```bash
$ npm install is-awaitable
```

Using yarn:
```bash
$ yarn add is-awaitable
```

Using pnpm:
```bash
$ pnpm add is-awaitable
```

## CDN Usage

You can use `is-awaitable` directly in browsers via CDN:

```html
<script src="https://unpkg.com/is-awaitable"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/is-awaitable"></script>
<script>
  const asyncFn = async () => 'ok';
  console.log(isAwaitable(asyncFn)); // true
</script>
```

## Usage

```typescript
import { isAwaitable } from 'is-awaitable';

async function foo() { return 'ok'; }
console.log(isAwaitable(foo)); // true

const bar = async () => {};
console.log(isAwaitable(bar)); // true

async function* gen() { yield 1; }
console.log(isAwaitable(gen)); // true

function baz() { return 42; }
console.log(isAwaitable(baz)); // false

const returnsPromise = () => Promise.resolve('hi');
console.log(isAwaitable(returnsPromise)); // false

console.log(isAwaitable(null)); // false
console.log(isAwaitable(123)); // false
```

## License

MIT License

Copyright (c) 2025 Ahmet Tinastepe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.