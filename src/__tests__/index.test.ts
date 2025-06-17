import { isAwaitable } from '../index'

function bindAsync(fn: Function) {
  return fn.bind({})
}

describe('isAwaitable', () => {
  it('should return false when given non-function values', () => {
    expect(isAwaitable(undefined)).toBe(false)
    expect(isAwaitable(null)).toBe(false)
    expect(isAwaitable(123)).toBe(false)
    expect(isAwaitable('async')).toBe(false)
    expect(isAwaitable({})).toBe(false)
    expect(isAwaitable([])).toBe(false)
    expect(isAwaitable(new Date())).toBe(false)
    expect(isAwaitable(/abc/g)).toBe(false)
    expect(isAwaitable(true)).toBe(false)
    expect(isAwaitable(false)).toBe(false)
  })

  it('should return true for async functions', () => {
    async function fn() {}
    expect(isAwaitable(fn)).toBe(true)
  })

  it('should return true for arrow async functions', () => {
    const arrowAsync = async () => {}
    expect(isAwaitable(arrowAsync)).toBe(true)
  })

  it('should return true for bound async functions', () => {
    const arrowAsync = async () => {}
    const bound = bindAsync(arrowAsync)
    expect(isAwaitable(bound)).toBe(true)
  })

  it('should return true for async generator functions', () => {
    async function* gen() {
      yield 1
    }
    expect(isAwaitable(gen)).toBe(true)
  })

  it('should return true for bound async generator functions', () => {
    async function* gen() {
      yield 1
    }
    const boundGen = bindAsync(gen)
    expect(isAwaitable(boundGen)).toBe(true)
  })

  it('should return false for synchronous functions', () => {
    function syncFn() {}
    const arrowSync = () => {}
    expect(isAwaitable(syncFn)).toBe(false)
    expect(isAwaitable(arrowSync)).toBe(false)
  })

  it('should return false for functions with async-like names but not truly async', () => {
    function AsyncFunction() {}
    expect(isAwaitable(AsyncFunction)).toBe(false)
  })

  it('should not throw when encountering cross-realm-like toString anomalies', () => {
    const fake = { toString: () => 'async function* foo(){}' }
    expect(isAwaitable(fake)).toBe(false)
  })
})
