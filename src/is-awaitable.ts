const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () {}).constructor

/**
 * Checks if value is an async function or async generator function.
 *
 * @example
 * ```js
 * async function foo() {}
 * isAwaitable(foo);
 * // => true
 *
 * function bar() {}
 * isAwaitable(bar);
 * // => false
 *
 * async function* gen() { yield 1; }
 * isAwaitable(gen);
 * // => true
 *
 * const notFn = {};
 * isAwaitable(notFn);
 * // => false
 * ```
 */
export function isAwaitable(value: unknown): boolean {
  if (typeof value !== 'function') {
    return false
  }

  if (value instanceof AsyncFunction || value instanceof AsyncGeneratorFunction) {
    return true
  }

  const src = Function.prototype.toString.call(value).trim()
  return src.startsWith('async ') || src.startsWith('async function*')
}
