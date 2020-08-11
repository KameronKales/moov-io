export function getValue(key) {
  if (typeof Storage !== 'undefined') {
    var cachedKey = window.localStorage.getItem(key)
    if (cachedKey) {
      return JSON.parse(cachedKey)
    }
  }
}

export function addValue(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
