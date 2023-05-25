/**
 * @example
 * const obj = {
 *   a: {
 *     b: {
 *       c: 42
 *     }
 *   }
 * }
 * setValueByPath(obj, 'a.b.c', 1) // obj.a.b.c = 1
 */
const setValueByPath = (obj, path, value) => {
  const keys = path.split('.')
  const lastKey = keys.pop()
  const lastObj = keys.reduce((obj, key) => {
    if (!obj[key]) {
      obj[key] = {}
    }
    return obj[key]
  }, obj)

  lastObj[lastKey] = value
}

module.exports = { setValueByPath }
