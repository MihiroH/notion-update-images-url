const { hasOwnProperty } = require('../utils/hasOwnProperty')

describe('hasOwnProperty', () => {
  let obj

  beforeEach(() => {
    obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    }
  })

  test('オブジェクトがプロパティを持っている場合はtrueを返す', () => {
    const result = hasOwnProperty(obj, 'key1')
    expect(result).toBe(true)
  })

  test('オブジェクトがプロパティを持っていない場合はfalseを返す', () => {
    const result = hasOwnProperty(obj, 'key4')
    expect(result).toBe(false)
  })

  test('オブジェクトがプロパティをプロトタイプチェーンに持っているが直接持っていない場合はfalseを返す', () => {
    const protoObj = Object.create(obj)
    const result = hasOwnProperty(protoObj, 'key1')
    expect(result).toBe(false)
  })

  test('プロパティがundefinedの場合はfalseを返す', () => {
    const result = hasOwnProperty(obj)
    expect(result).toBe(false)
  })
})
