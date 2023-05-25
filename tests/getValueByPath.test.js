const { getValueByPath } = require('../utils/getValueByPath')

describe('getValueByPath', () => {
  let obj

  beforeEach(() => {
    obj = {
      a: {
        b: {
          c: [42, 100],
        },
        d: 1,
      }
    }
  })

  test('指定したパスの値を返す', () => {
    expect(getValueByPath(obj, 'a.b.c.0')).toBe(42)
    expect(getValueByPath(obj, 'a.b.c.1')).toBe(100)
    expect(getValueByPath(obj, 'a.d')).toBe(1)
  })

  test('パスが無効な場合はundefinedを返す', () => {
    expect(getValueByPath(obj, 'a.b.d')).toBeUndefined()
    expect(getValueByPath(obj, 'a.e.c')).toBeUndefined()
  })

  test('パスが有効だが配列の範囲を超えている場合はundefinedを返す', () => {
    expect(getValueByPath(obj, 'a.b.c.2')).toBeUndefined();
  })
})
