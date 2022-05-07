/*
 * Bounce v0.0.0
 * (c) 2022-2022 shinn_lancelot
 * Released under the MIT License.
 */
var defaultOptions = {
  el: '',
  effectType: '',
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
    this.options = common.extend(JSON.parse(JSON.stringify(defaultOptions)), options);
  }

  test () {
    console.log(this.options);
  }
}

export default Bounce;
