title: 使用原生 JavaScript 获取文本的行数
date: 2016-06-25 06:52:48
tags:
 - 前端
 - JavaScript
categories:
  - 随手记
---

实际开发中会有这样的需求：只显示两行，如果超过两行，则显示一个“显示更多”的按钮，点击按钮来显示剩余行的内容。有个 jQuery 的插件 [loadingDots](https://github.com/midudev/loadingDots) 专门实现了这个功能。不过这里我们来看看如何利用原生的 JavaScript 来实现。要实现这个需求，最关键的是要确定这个容器内文本的行数，得到行数后，修改元素高度，并确定是否显示加载按钮。

## window.getComputedStyle()

要使用原生 JavaScript 代码获取一个元素的各个 style 属性，使用 `window.getComputedStyle()` 是必然的。它可以返回一个 HTML 元素在浏览器中真正显示时的各个样式——当然，有些样式会被浏览器给屏蔽，比如，你要获取一个链接的颜色，并准备通过颜色来判断用户是否访问过某个地址，那肯定是不行的。

该方法返回的，是一个样式键值对，是 [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) 的实例。各属性索引名没有 `-` ，且采用驼峰命名法。比如 `lineHeight` 。

## 行数 = 整体高度 / 行高

整体高度通过 `height` 可以获取。行高可以通过 `lineHeight` 获取，将其结果再取整即可得到行数。

但有个问题，如果没有针对一个元素设置 `line-height` 值，则其默认值为 `normal` ，这个值在桌面浏览器中通常是 1.2 ，但还与字体有关。因此，最好是对需要计算行数的元素设置一下 `line-height` 值。

一个简单的实现如下：

```js
function countLines(ele) {
  var styles = window.getComputedStyle(ele, null);
  var lh = parseInt(styles.lineHeight, 10);
  var h = parseInt(styles.height, 10);
  var lc = Math.round(h / lh);
  console.log('line count:', lc, 'line-height:', lh, 'height:', h);
  return lc;
}
```

## Demo

请参见 [Demo](http://chensd.com/code/lineCount.html) 。