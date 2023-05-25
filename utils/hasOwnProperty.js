const hasOwnProperty = (object, key) => {
  return Object.prototype.hasOwnProperty.call(object, key)
}

module.exports = { hasOwnProperty }
