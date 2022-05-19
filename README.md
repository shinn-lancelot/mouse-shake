## mouse-shake

<a href="https://github.com/shinn-lancelot/mouse-shake/blob/master/LICENSE"><img src="https://img.shields.io/github/license/shinn-lancelot/mouse-shake.svg" alt="License"></a>
<a href="https://github.com/shinn-lancelot/mouse-shake/blob/master/dist/mouse-shake.min.js"><img src="https://img.shields.io/bundlephobia/min/mouse-shake.svg" alt="Minfied Size"></a>
<a href="https://www.npmjs.com/package/mouse-shake"><img src="https://img.shields.io/npm/dt/mouse-shake.svg" alt="Downloads"></a>
<a href="https://github.com/shinn-lancelot/mouse-shake/releases"><img src="https://img.shields.io/github/release/shinn-lancelot/mouse-shake.svg" alt="Github Release"></a>
<a href="https://www.npmjs.com/package/mouse-shake"><img src="https://img.shields.io/npm/v/mouse-shake.svg" alt="NPM Release"></a>

> 一个基于鼠标移动的轻量动画库

### 效果

![效果图](https://github.com/shinn-lancelot/mouse-shake/blob/master/example/effect.gif?raw=true)

### 特性

* 🚀 极小的，压缩后大约4kb
* 🚤 零依赖，不依赖第三方库
* 😁 易使用，安装、引入加载后，一行代码即可

### 安装

```bash
  npm i mouse-shake
```

### 快速开始

```html
  <div class="icon"></div>
  <div class="icon"></div>
```

```js
  let MS = new MouseShake({
    el: '.icon'
  })
```

### 选项

| 选项 | 类型 | 描述 | 默认值 | 是否必填 | 例子 |
| --- | --- | -- | --- | --- | --- |
| `el` | `string` | 动画的元素 |  | **是** | '.tag'、'#icon' |
| `container` | `string` | 动画容器 | 'body' | **否** | 'body'、'#container'、'.container' |
| `effect` | `number` | 动画效果[1: 倾斜, 2: 平移, 3: 倾斜平移] | 1 | **否** | 3 |
| `direction` | `number` | 动画方向[1: 正向, 2: 反向] | 1 | **否** | 1 |
| `effectConfig` | `object` | 动画配置[maxAngle: 最大倾斜角度, moveSpeed: 平移速度] | { maxAngle: 30, moveSpeed: 40 } | **否** | { maxAngle: 40, moveSpeed: 50 } |
| `transitionDuration` | `number` | css过渡时间（单位：s） | 0.1 | **否** | 0.2 |
| `keep` | `boolean` | 鼠标离开容器（body）后，是否保持动画效果 | true | **否** | false |
| `debug` | `boolean` | 是否开启调试模式，调试模式会在控制台打印若干参数 | false | **否** | true |

### 方法

- version()

  打印版本号等信息

- enable()

  启用该实例

- disable()

  禁用该实例
