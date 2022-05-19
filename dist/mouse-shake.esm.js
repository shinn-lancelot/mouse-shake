/*
 * mouse-shake v0.0.1-beta
 * (c) 2022-2022 shinn_lancelot
 * Released under the MIT License.
 */
var defaultOptions = {
  el: '',
  container: 'body',
  effect: 1,
  direction: 1,
  effectConfig: {
    maxAngle: 30,
    moveSpeed: 40
  },
  transitionDuration: 0.1,
  keep: false,
  debug: false
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

var name = "mouse-shake";
var version = "0.0.1-beta";
var repository = {
	type: "git",
	url: "https://github.com/shinn-lancelot/mouse-shake.git"
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
    var this$1$1 = this;

  this.options = defaultExport.extend(JSON.parse(JSON.stringify(defaultOptions)), options);
  this.enable = true;
  this.elObjs = document.querySelectorAll(this.options.el);
  this.containerObj = document.querySelector(this.options.container);
  this.elObjs.forEach(function (item) {
    item.style.transitionProperty = 'transform';
    item.style.transitionDuration = (this$1$1.options.transitionDuration) + "s";
  });
  this.bindHandleMouseMove = this.handleMouseMove.bind(this);
  this.bindHandleMouseLeave = this.handleMouseLeave.bind(this);
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
  this.containerObj.addEventListener('mousemove', this.bindHandleMouseMove);
};

MouseShake.prototype.listenMouseLeave = function listenMouseLeave () {
  this.containerObj.addEventListener('mouseleave', this.bindHandleMouseLeave);
};

MouseShake.prototype.handleMouseMove = function handleMouseMove (event) {
    var this$1$1 = this;

  this.enable && window.requestAnimationFrame(function () {
    var position = this$1$1.getPosition(event);
    var deltaPosition = this$1$1.calcDeltaPostion(position, this$1$1.centerPosition);
    var offsetPercent = this$1$1.calOffsetPercent(position, this$1$1.centerPosition);
    this$1$1.options.debug && console.log(
      'center-position:' + JSON.stringify(this$1$1.centerPosition) + '\n' +
      'position:' + JSON.stringify(position) + '\n' +
      'delta-position:' + JSON.stringify(deltaPosition) + '\n' +
      'offset-percent:' + JSON.stringify(offsetPercent) + '\n'
    );
    this$1$1.elObjs.forEach(function (item) {
      this$1$1.effect(item, offsetPercent, deltaPosition);
    });
  });
};

MouseShake.prototype.handleMouseLeave = function handleMouseLeave () {
    var this$1$1 = this;

  this.enable && (this.options.keep || setTimeout(function () {
    this$1$1.elObjs.forEach(function (item) {
      if (this$1$1.options.effect === 1) {
        item.style.transform = "rotateX(0) rotateY(0)";
      } else if (this$1$1.options.effect === 2) {
        item.style.transform = "translateX(0) translateY(0)";
      } else if (this$1$1.options.effect === 3) {
        item.style.transform = "rotateX(0) rotateY(0) translateX(0) translateY(0)";
      }
    });
  }, this.options.transitionDuration * 1000));
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
  var rotateXDeg = (offsetPercent.yPercent * this.options.effectConfig.maxAngle * -1 * this.options.direction).toFixed(4);
  var rotateYDeg = (offsetPercent.xPercent * this.options.effectConfig.maxAngle * this.options.direction).toFixed(4);
  var translateXPx = (offsetPercent.xPercent * this.options.effectConfig.moveSpeed * this.options.direction).toFixed(4);
  var translateYPx = (offsetPercent.yPercent * this.options.effectConfig.moveSpeed * this.options.direction).toFixed(4);
  if (this.options.effect === 1) {
    obj.style.transform = "rotateX(" + rotateXDeg + "deg) rotateY(" + rotateYDeg + "deg)";
  } else if (this.options.effect === 2) {
    obj.style.transform = "translateX(" + translateXPx + "px) translateY(" + translateYPx + "px)";
  } else if (this.options.effect === 3) {
    obj.style.transform = "rotateX(" + rotateXDeg + "deg) rotateY(" + rotateYDeg + "deg) translateX(" + translateXPx + "px) translateY(" + translateYPx + "px)";
  }
};

MouseShake.prototype.version = function version$1 () {
  var styles = [
    'color: bisque',
    'font-weight: bold'
  ].join(';');
  console.info('%c' + String.fromCodePoint(0x1F446) + " " + name + " v" + version + " " + String.fromCodePoint(0x1F9ED) + " " + (repository.url.replace(/\.git/g, '')), styles);
};

MouseShake.prototype.enable = function enable () {
  this.enable = true;
};

MouseShake.prototype.disable = function disable () {
  this.enable = false;
};

export { MouseShake as default };
