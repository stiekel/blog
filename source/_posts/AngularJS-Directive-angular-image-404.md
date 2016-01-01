title: AngularJS 指令 angular-image-404
date: 2016-01-01 08:12:41
tags:
  - AngularJS
  - JavaScript
categories:
  - 编程杂记
---

在进行 AngularJS 应用的开发时，经常需要显示图片，而 `img` 有时候并不能成功的获取到 `src` 或 `ng-src` 指定的图片，这时候可能需要通过其它办法来指定一个备用图片，可以想到的办法有：

*   在 `ng-src` 的属性中，指定完普通的图片地址后，使用 `||` 追加备用图片的地址，如
```html
ng-src='{{"myImg.png" || "fallback.png"}}'
```
*   使用 `ng-show` 和 `ng-hide` 控制两个 `img`，其中一个正常显示图片，另外一个显示力求用图片

开始我也这么做，所以找了一下，发现了一个 AngularJS 指令，[angular-fallback-image](https://github.com/sebasrodriguez/angular-fallback-image) 不过这个指令并不完善，必须指定指令图片才行，我想要的是，就算没有指定图片，也可以显示一个占位性质的图片，于是我做了修改，发了 [Pull Request](https://github.com/sebasrodriguez/angular-fallback-image/pull/1) ，不过这位乌拉圭的[小哥](https://github.com/sebasrodriguez) 似乎有段时间没处理 Github 上的东西了。
<!--more-->

所以，我开发了 [angular-image-404](https://github.com/stiekel/angular-image-404)，可以自定义占位图，也可以使用默认的占位图。