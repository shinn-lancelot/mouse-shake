import defaultOptions from './options'
import common from './common'
import { name, version, repository } from '../../package'

export default class MouseShake {
  constructor (options = {}) {
    if (!(this instanceof MouseShake)) {
      return new MouseShake(options)
    }
    this.init(options)
    if (!this.checkOptions()) {
      return
    }
    this.calCenterPosition()
    this.listenMouseMove()
    this.listenMouseLeave()
  }

  init (options) {
    this.options = common.extend(JSON.parse(JSON.stringify(defaultOptions)), options)
    this.enable = true
    this.elObjs = document.querySelectorAll(this.options.el)
    this.containerObj = document.querySelector(this.options.container)
    this.elObjs.forEach(item => {
      item.style.transitionProperty = 'transform'
      item.style.transitionDuration = `${this.options.transitionDuration}s`
    })
    this.bindHandleMouseMove = this.handleMouseMove.bind(this)
    this.bindHandleMouseLeave = this.handleMouseLeave.bind(this)
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

  calCenterPosition () {
    this.centerPosition = this.getCenterPostion(this.containerObj)
  }

  listenMouseMove () {
    this.containerObj.addEventListener('mousemove', this.bindHandleMouseMove)
  }

  listenMouseLeave () {
    this.containerObj.addEventListener('mouseleave', this.bindHandleMouseLeave)
  }

  handleMouseMove (event) {
    this.enable && window.requestAnimationFrame(() => {
      let position = this.getPosition(event)
      let deltaPosition = this.calcDeltaPostion(position, this.centerPosition)
      let offsetPercent = this.calOffsetPercent(position, this.centerPosition)
      this.options.debug && console.log(
        'center-position:' + JSON.stringify(this.centerPosition) + '\n' +
        'position:' + JSON.stringify(position) + '\n' +
        'delta-position:' + JSON.stringify(deltaPosition) + '\n' +
        'offset-percent:' + JSON.stringify(offsetPercent) + '\n'
      )
      this.elObjs.forEach(item => {
        this.effect(item, offsetPercent, deltaPosition)
      })
    })
  }

  handleMouseLeave () {
    this.enable && (this.options.keep || setTimeout(() => {
      this.elObjs.forEach(item => {
        if (this.options.effect === 1) {
          item.style.transform = `rotateX(0) rotateY(0)`
        } else if (this.options.effect === 2) {
          item.style.transform = `translateX(0) translateY(0)`
        } else if (this.options.effect === 3) {
          item.style.transform = `rotateX(0) rotateY(0) translateX(0) translateY(0)`
        }
      })
    }, this.options.transitionDuration * 1000))
  }

  getPosition (event) {
    this.containerObjRect = this.containerObj.getBoundingClientRect()
    let e = event || window.event
    return {
      x: e.clientX - this.containerObjRect.left,
      y: e.clientY - this.containerObjRect.top
    }
  }

  getCenterPostion (obj) {
    return {
      x: obj.offsetWidth / 2,
      y: obj.offsetHeight / 2
    }
  }

  calcDeltaPostion (postion, centerPosition) {
    return {
      x: postion.x - centerPosition.x,
      y: postion.y - centerPosition.y
    }
  }

  calOffsetPercent (postion, centerPosition) {
    return {
      xPercent: (postion.x - centerPosition.x) / centerPosition.x,
      yPercent: (postion.y - centerPosition.y) / centerPosition.y
    }
  }

  effect (obj, offsetPercent, deltaPosition) {
    let rotateXDeg = (offsetPercent.yPercent * this.options.effectConfig.maxAngle * -1 * this.options.direction).toFixed(4)
    let rotateYDeg = (offsetPercent.xPercent * this.options.effectConfig.maxAngle * this.options.direction).toFixed(4)
    let translateXPx = (offsetPercent.xPercent * this.options.effectConfig.moveSpeed * this.options.direction).toFixed(4)
    let translateYPx = (offsetPercent.yPercent * this.options.effectConfig.moveSpeed * this.options.direction).toFixed(4)
    if (this.options.effect === 1) {
      obj.style.transform = `rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)`
    } else if (this.options.effect === 2) {
      obj.style.transform = `translateX(${translateXPx}px) translateY(${translateYPx}px)`
    } else if (this.options.effect === 3) {
      obj.style.transform = `rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg) translateX(${translateXPx}px) translateY(${translateYPx}px)`
    }
  }

  version () {
    let styles = [
      'color: bisque',
      'font-weight: bold'
    ].join(';')
    console.info('%c' + String.fromCodePoint(0x1F446) + ` ${name} v${version} ` + String.fromCodePoint(0x1F9ED) + ` ${repository.url.replace(/\.git/g, '')}`, styles)
  }

  enable () {
    this.enable = true
  }

  disable () {
    this.enable = false
  }
}
