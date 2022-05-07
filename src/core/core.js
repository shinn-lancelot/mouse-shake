import defaultOptions from './options'
import common from './common'

export default class Bounce {
  constructor (options = {}) {
    this.initOptions(options)
    if (!this.checkOptions()) {
      return
    }
    this.listenMouseMove()
    this.listenMouseLeave()
  }

  initOptions (options) {
    this.options = common.extend(JSON.parse(JSON.stringify(defaultOptions)), options)
  }

  checkOptions () {
    if (!this.options.el) {
      console.error('缺少el参数')
      return false
    }
    if (typeof (this.options.el) !== 'string') {
      console.error('el参数必须是字符串')
      return false
    }

    return true
  }

  listenMouseMove () {
    this.elObjs = document.querySelectorAll(this.options.el)
    this.containerObj = document.querySelector(this.options.container)
    this.containerObj.addEventListener('mousemove', this.handleMouseMove, false)
  }

  listenMouseLeave () {
    this.containerObj.addEventListener('mouseleave', this.handleMouseLeave, false)
  }

  handleMouseMove (e) {
    console.log(e)
  }

  handleMouseLeave () {

  }
}
