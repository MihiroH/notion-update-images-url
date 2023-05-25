/**
 * @example
 * const obj = {
 *   a: {
 *     b: {
 *       c: [42, 100],
 *     },
 *     d: 1,
 *   }
 * }
 * console.log(getValueByPath(obj, 'a.b.0.c')) // 42
 * console.log(getValueByPath(obj, 'a.d')) // 1
 */
const getValueByPath = (obj, path) => {
  const parts = path.split('.')
  for (let i = 0, len = parts.length; i < len; i++) {
    if (obj !== null && typeof obj === 'object') {
      obj = obj[parts[i]]
    } else {
      return undefined
    }
  }
  return obj
}

module.exports = { getValueByPath }
