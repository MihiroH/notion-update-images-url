const { setValueByPath } = require('../utils/setValueByPath')

describe('setValueByPath function', () => {
  let obj

  beforeEach(() => {
    obj = {
      a: {
        b: {
          c: 42
        }
      }
    }
  })

  test('設定したパスに値を正しく設定する', () => {
    setValueByPath(obj, 'a.b.c', 1)
    expect(obj.a.b.c).toBe(1)
  })

  test('存在しないパスに値を設定するとき、途中のオブジェクトを作成する', () => {
    setValueByPath(obj, 'a.d.e', 2)
    expect(obj.a.d.e).toBe(2)
  })

  test('トップレベルのパスに値を設定する', () => {
    setValueByPath(obj, 'x', 3)
    expect(obj.x).toBe(3)
  })
})
