## mouse-shake

> 一个基于鼠标移动的轻量动画库

### 效果

![效果图](https://github.com/shinn-lancelot/mouse-shake/blob/master/example/effect.gif?raw=true)

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
  new MouseShake({
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