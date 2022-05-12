/*
 * MouseShake v0.0.1-beta
 * (c) 2022-2022 shinn_lancelot
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MouseShake = factory());
}(this, (function () { 'use strict';

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

  var defaultExport = function defaultExport () {};

  defaultExport.extend = function extend (obj, newObj) {
    for (var key in newObj) {
      if (!(key in obj)) {
        obj[key] = newObj[key];
      } else if (obj[key].constructor === newObj[key].constructor) {
        if (obj[key].constructor === Object) {
          var childObj = obj[key];
          var childNewObj = newObj[key];
          for (var k in childNewObj) {
            childObj[k] = childNewObj[k];
          }
          obj[key] = childObj;
        } else {
          obj[key] = newObj[key];
        }
      }
    }
    return obj
  };

  var MouseShake = function MouseShake (options) {
    if ( options === void 0 ) options = {};

    if (!(this instanceof MouseShake)) {
      return new MouseShake(options)
    }
    this.init(options);
    if (!this.checkOptions()) {
      return
    }
    this.calCenterPosition();
    this.listenMouseMove();
    this.listenMouseLeave();
  };

  MouseShake.prototype.init = function init (options) {
      var this$1 = this;

    this.options = defaultExport.extend(JSON.parse(JSON.stringify(defaultOptions)), options);
    this.elObjs = document.querySelectorAll(this.options.el);
    this.containerObj = document.querySelector('body');
    this.containerObj.style.transformStyle = 'preserve-3d';
    this.containerObj.style.perspective = (this.options.perspective) + "px";
    this.elObjs.forEach(function (item) {
      item.style.transitionProperty = 'transform';
      item.style.transitionDuration = (this$1.options.transitionDuration) + "s";
      item.style.transformStyle = 'preserve-3d';
    });
  };

  MouseShake.prototype.checkOptions = function checkOptions () {
    if (!this.options.el) {
      console.error('缺少el参数');
      return false
    }
    if (typeof (this.options.el) !== 'string') {
      console.error('el参数必须是字符串');
      return false
    }

    return true
  };

  MouseShake.prototype.calCenterPosition = function calCenterPosition () {
    this.centerPosition = this.getCenterPostion(this.containerObj);
  };

  MouseShake.prototype.listenMouseMove = function listenMouseMove () {
    this.containerObj.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  };

  MouseShake.prototype.listenMouseLeave = function listenMouseLeave () {
    this.containerObj.addEventListener('mouseleave', this.handleMouseLeave.bind(this), false);
  };

  MouseShake.prototype.handleMouseMove = function handleMouseMove (event) {
      var this$1 = this;

    window.requestAnimationFrame(function () {
      var position = this$1.getPosition(event);
      var deltaPosition = this$1.calcDeltaPostion(position, this$1.centerPosition);
      var offsetPercent = this$1.calOffsetPercent(position, this$1.centerPosition);
      this$1.elObjs.forEach(function (item) {
        this$1.effect(item, offsetPercent, deltaPosition);
      });
    });
  };

  MouseShake.prototype.handleMouseLeave = function handleMouseLeave () {
      var this$1 = this;

    this.options.keep || setTimeout(function () {
      this$1.elObjs.forEach(function (item) {
        if (this$1.options.effect === 1) {
          item.style.transform = "rotateX(0) rotateY(0)";
        } else if (this$1.options.effect === 2) {
          item.style.transform = "translateX(0) translateY(0)";
        } else if (this$1.options.effect === 3) {
          item.style.transform = "rotateX(0) rotateY(0) translateX(0) translateY(0)";
        }
      });
    }, this.options.transitionDuration * 1000);
  };

  MouseShake.prototype.getPosition = function getPosition (event) {
    var e = event || window.event;
    return {
      x: e.clientX,
      y: e.clientY
    }
  };

  MouseShake.prototype.getCenterPostion = function getCenterPostion (obj) {
    return {
      x: obj.offsetWidth / 2,
      y: obj.offsetHeight / 2
    }
  };

  MouseShake.prototype.calcDeltaPostion = function calcDeltaPostion (postion, centerPosition) {
    return {
      x: postion.x - centerPosition.x,
      y: postion.y - centerPosition.y
    }
  };

  MouseShake.prototype.calOffsetPercent = function calOffsetPercent (postion, centerPosition) {
    return {
      xPercent: (postion.x - centerPosition.x) / centerPosition.x,
      yPercent: (postion.y - centerPosition.y) / centerPosition.y
    }
  };

  MouseShake.prototype.effect = function effect (obj, offsetPercent, deltaPosition) {
    var rotateXDeg = (offsetPercent.yPercent * this.options.effectConfig.maxAngle).toFixed(0) * -1 * this.options.direction;
    var rotateYDeg = (offsetPercent.xPercent * this.options.effectConfig.maxAngle).toFixed(0) * this.options.direction;
    var translateXPx = offsetPercent.xPercent * this.options.effectConfig.moveSpeed * this.options.direction;
    var translateYPx = offsetPercent.yPercent * this.options.effectConfig.moveSpeed * this.options.direction;
    if (this.options.effect === 1) {
      obj.style.transform = "rotateX(" + rotateXDeg + "deg) rotateY(" + rotateYDeg + "deg)";
    } else if (this.options.effect === 2) {
      obj.style.transform = "translateX(" + translateXPx + "px) translateY(" + translateYPx + "px)";
    } else if (this.options.effect === 3) {
      obj.style.transform = "rotateX(" + rotateXDeg + "deg) rotateY(" + rotateYDeg + "deg) translateX(" + translateXPx + "px) translateY(" + translateYPx + "px)";
    }
  };

  return MouseShake;

})));
