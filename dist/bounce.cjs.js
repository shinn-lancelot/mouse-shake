/*
 * Bounce v0.0.0
 * (c) 2022-2022 shinn_lancelot
 * Released under the MIT License.
 */
'use strict';

var defaultOptions = {
  el: '',
  effect: 1,
  direction: 1,
  effectConfig: {
    maxAngle: 30,
    moveSpeed: 40
  },
  perspective: 800,
  transitionDuration: 0.1,
  keep: true
};

class common {
  static extend (obj, newObj) {
    for (let key in newObj) {
      if (!(key in obj)) {
        obj[key] = newObj[key];
      } else if (obj[key].constructor === newObj[key].constructor) {
        if (obj[key].constructor === Object) {
          let childObj = obj[key];
          let childNewObj = newObj[key];
          for (let k in childNewObj) {
            childObj[k] = childNewObj[k];
          }
          obj[key] = childObj;
        } else {
          obj[key] = newObj[key];
        }
      }
    }
    return obj
  }
}

class Bounce {
  constructor (options = {}) {
    this.init(options);
    if (!this.checkOptions()) {
      return
    }
    this.calCenterPosition();
    this.listenMouseMove();
    this.listenMouseLeave();
  }

  init (options) {
    this.options = common.extend(JSON.parse(JSON.stringify(defaultOptions)), options);
    this.elObjs = document.querySelectorAll(this.options.el);
    this.containerObj = document.querySelector('body');
    this.containerObj.style.transformStyle = 'preserve-3d';
    this.containerObj.style.perspective = `${this.options.perspective}px`;
    this.elObjs.forEach(item => {
      item.style.transitionProperty = 'transform';
      item.style.transitionDuration = `${this.options.transitionDuration}s`;
      item.style.transformStyle = 'preserve-3d';
    });
  }

  checkOptions () {
    if (!this.options.el) {
      console.error('缺少el参数');
      return false
    }
    if (typeof (this.options.el) !== 'string') {
      console.error('el参数必须是字符串');
      return false
    }

    return true
  }

  calCenterPosition () {
    this.centerPosition = this.getCenterPostion(this.containerObj);
  }

  listenMouseMove () {
    this.containerObj.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  }

  listenMouseLeave () {
    this.containerObj.addEventListener('mouseleave', this.handleMouseLeave.bind(this), false);
  }

  handleMouseMove (event) {
    window.requestAnimationFrame(() => {
      let position = this.getPosition(event);
      let deltaPosition = this.calcDeltaPostion(position, this.centerPosition);
      let offsetPercent = this.calOffsetPercent(position, this.centerPosition);
      this.elObjs.forEach(item => {
        this.effect(item, offsetPercent, deltaPosition);
      });
    });
  }

  handleMouseLeave () {
    this.options.keep || setTimeout(() => {
      this.elObjs.forEach(item => {
        if (this.options.effect === 1) {
          item.style.transform = `rotateX(0) rotateY(0)`;
        } else if (this.options.effect === 2) {
          item.style.transform = `translateX(0) translateY(0)`;
        } else if (this.options.effect === 3) {
          item.style.transform = `rotateX(0) rotateY(0) translateX(0) translateY(0)`;
        }
      });
    }, this.options.transitionDuration * 1000);
  }

  getPosition (event) {
    let e = event || window.event;
    return {
      x: e.clientX,
      y: e.clientY
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
    let rotateXDeg = (offsetPercent.yPercent * this.options.effectConfig.maxAngle).toFixed(0) * -1 * this.options.direction;
    let rotateYDeg = (offsetPercent.xPercent * this.options.effectConfig.maxAngle).toFixed(0) * this.options.direction;
    let translateXPx = offsetPercent.xPercent * this.options.effectConfig.moveSpeed * this.options.direction;
    let translateYPx = offsetPercent.yPercent * this.options.effectConfig.moveSpeed * this.options.direction;
    if (this.options.effect === 1) {
      obj.style.transform = `rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)`;
    } else if (this.options.effect === 2) {
      obj.style.transform = `translateX(${translateXPx}px) translateY(${translateYPx}px)`;
    } else if (this.options.effect === 3) {
      obj.style.transform = `rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg) translateX(${translateXPx}px) translateY(${translateYPx}px)`;
    }
  }
}

module.exports = Bounce;
