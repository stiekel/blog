title: Safari 中转换 'YYYY-M-D' 格式时间的一个坑
date: 2015-06-02 06:1\9:09
tags:
  - JavaScript
categories:
  - 随手记
---

昨天在微信开发的时候，遇到一个时间转换的坑，具体发现过程有多曲折就不说了。最终发现原因是，iOS 的 Sarari ——当然包括微信内置浏览器——在转换时间时，对 `YYYY-M-D` 的支持与 Chrome 和 Firefox 不一样。具体请看这个 [Demo](http://chensd.com/code/safariDateParse.html)。

由于 `YYYY-MM-DD` 并不是标准的时间格式，ECMA 并没有对它的转换进行规定，所以具体转换就看各个引擎的实现了，不过几个主要的浏览器都支持了这个格式，但对 `YYYY-M-D` 的支持就不统一了。Firefox 是支持的，所以 Chrome 也就支持了。但 Safari 就……

建议：

* 尽量不要使用 `YYYY-M-D` 格式的时间来进行转换，显示也要避免
* 使用第三方库来操作时间转换，比如 [Datejs](https://github.com/datejs/Datejs)
