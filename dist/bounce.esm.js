/*
 * Bounce v0.0.0
 * (c) 2022-2022 shinn_lancelot
 * Released under the MIT License.
 */
var defaultOptions = {
  el: '',
  container: 'body',
  effect: 1,
  direction: 1
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
    this.initOptions(options);
    if (!this.checkOptions()) {
      return
    }
    this.listenMouseMove();
    this.listenMouseLeave();
  }

  initOptions (options) {
    this.options = common.extend(JSON.parse(JSON.stringify(defaultOptions)), options);
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

  listenMouseMove () {
    this.elObjs = document.querySelectorAll(this.options.el);
    this.containerObj = document.querySelector(this.options.container);
    this.containerObj.addEventListener('mousemove', this.handleMouseMove, false);
  }

  listenMouseLeave () {
    this.containerObj.addEventListener('mouseleave', this.handleMouseLeave, false);
  }

  handleMouseMove (e) {
    console.log(e);
  }

  handleMouseLeave () {

  }
}

export default Bounce;
