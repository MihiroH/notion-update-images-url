const { cloneDeep } = require('../utils/cloneDeep')

describe('cloneDeep', () => {
  test('プリミティブ型の場合、同じ値を返す', () => {
    expect(cloneDeep(null)).toBe(null)
    expect(cloneDeep(undefined)).toBe(undefined)
    expect(cloneDeep(5)).toBe(5)
    expect(cloneDeep('string')).toBe('string')
    expect(cloneDeep(true)).toBe(true)
  })

  test('Dateオブジェクトを正しくクローンする', () => {
    const date = new Date()
    const clonedDate = cloneDeep(date)
    expect(clonedDate).not.toBe(date)
    expect(clonedDate.getTime()).toBe(date.getTime())
  })

  test('配列を正しくクローンする', () => {
    const arr = [1, 2, { key: 'value' }]
    const clonedArr = cloneDeep(arr)
    expect(clonedArr).not.toBe(arr)
    expect(clonedArr).toEqual(arr)
    expect(clonedArr[2]).not.toBe(arr[2])
  })

  test('オブジェクトを正しくクローンする', () => {
    const obj = { key: 'value', nested: { key: 'value' } }
    const clonedObj = cloneDeep(obj)
    expect(clonedObj).not.toBe(obj)
    expect(clonedObj).toEqual(obj)
    expect(clonedObj.nested).not.toBe(obj.nested)
  })
})
