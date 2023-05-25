const { isArray, isObject } = require('./checkType')
const { hasOwnProperty } = require('./hasOwnProperty')

const cloneDeep = (object) => {
  // String, Number, Boolean, null, undefinedの場合はreturn
  if (null == object || 'object' != typeof object) {
    return object
  }

  // Date
  if (object instanceof Date) {
    const copy = new Date()
    copy.setTime(object.getTime())
    return copy
  }

  // Array
  if (isArray(object)) {
    const copy = []
    const length = object.length
    for (let i = 0; i < length; i++) {
      copy[i] = cloneDeep(object[i])
    }
    return copy
  }

  // Object
  if (isObject(object)) {
    const copy = Object.keys(object).reduce((all, key) => {
      if (hasOwnProperty(object, key)) {
        all[key] = cloneDeep(object[key])
      }
      return all
    }, {})
    return copy
  }

  return object
}

module.exports = { cloneDeep }
