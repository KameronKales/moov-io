import {getValue, addValue} from './utils/cache'
import github from './utils/github'

export default class domHelper {
  constructor(type) {
    if (!type)
      console.error(
        `You can not call the domHelper without specifying a type of element you'd like to edit. 
        Try this: github`
      )
    this.type = type.toLowerCase().trim()
    this.setValues()
  }

  fetchVotes() {
    if (this.type !== 'github') {
      console.warn('You called the domHelper with an unsupported option')
    }
    return [this.type]()
  }

  async setValues() {
    const cacheKey = `moov-${this.type}-stars`
    const cacheValue = getValue(cacheKey)
    if (cacheValue) this.value = cacheValue
    else {
      await this.fetchVotes().then((resp) => {
        this.value = resp
        addValue(cacheKey, this.value)
      })
    }
    this.updateElement()
  }

  getDomElement() {
    return document.getElementsByClassName(`${this.type}-number`)[0]
  }

  failSafe() {
    this.value = '405'
  }

  updateElement() {
    !this.value ? this.failSafe() : this.value
    this.getDomElement().innerHTML = this.value
  }
}
