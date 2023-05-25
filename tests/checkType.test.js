const { isString, isNumber, isBoolean, isArray, isObject, isFunction } = require('../utils/checkType')

describe('型判定関数', () => {
  test('文字列を正しく識別する', () => {
    expect(isString('hello')).toBe(true)
    expect(isString(123)).toBe(false)
  })

  test('数値を正しく識別する', () => {
    expect(isNumber(123)).toBe(true)
    expect(isNumber('hello')).toBe(false)
  })

  test('ブール値を正しく識別する', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean('hello')).toBe(false)
  })

  test('配列を正しく識別する', () => {
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray('hello')).toBe(false)
    expect(isArray({ a: 1 })).toBe(false)
  })

  test('オブジェクトを正しく識別する', () => {
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject('hello')).toBe(false)
    expect(isObject([1, 2, 3])).toBe(false)
  })

  test('関数を正しく識別する', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction('hello')).toBe(false)
  })
})
