import defaultOptions from './options'
import common from './common'

export default class Bounce {
  constructor (options = {}) {
    this.options = common.extend(JSON.parse(JSON.stringify(defaultOptions)), options)
  }

  test () {
    console.log(this.options)
  }
}
