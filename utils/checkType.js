const typeOf = (value, type) => {
  return typeof value === type
}

const isString = (value) => {
  return typeOf(value, 'string')
}

const isNumber = (value) => {
  return typeOf(value, 'number')
}

const isBoolean = (value) => {
  return typeOf(value, 'boolean')
}

const isArray = (value) => {
  return Array.isArray(value)
}

const isObject = (value) => {
  return value !== null && !isArray(value) && typeOf(value, 'object')
}

const isFunction = (value) => {
  return typeOf(value, 'function')
}

module.exports = {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isFunction,
}
