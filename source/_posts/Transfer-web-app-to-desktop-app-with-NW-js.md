title: 使用 NW.js 将 Web 应用打包为桌面应用
date: 2016-04-03 16:01:51
tags:
  - JavaScript
  - NW.js
categories:
  - 编程杂记
---

平时工作中经常需要开发各种管理后台，为了提升开发效率，一般会使用 Bootstrap 一类的 CSS 框架，使用 AngularJS 一类的单页应用框架，让 Web 开发能够更好的将精力集中在业务逻辑上。但逃不过另外一个麻烦，那便是跨浏览器的兼容问题。所以我一般的粗暴做法是，干脆就不支持 IE 浏览器，通过 userAgent 判断并提示用户切换到 Chrome 。其实，除了这个办法之外，还可以考虑将 Web 应用打包为桌面应用。开源社区提供了 NW.js 来轻松的将 Web 应用打包为桌面应用，这样只需要做到兼容 Chrome 就够了。
<!--more-->

### NW.js 简介

NW.js 由 node-webkit 改名而来。目的是想利用 JavaScript 来进行桌面应用开发。与操作系统交互的部分，利用 Node.js 来完成，而与用户交互的部分，则是使用的网页开发技术。国内比较有名的案例有钉钉的桌面版，有名的 Chrome 插件 Fawave 也还利用 NW.js 推出了桌面应用。

与 NW.js 类似的解决方案，还有 Github 为了开发 Atom 而推出的 [Electron.js](http://electron.atom.io/) 。Slack 的桌面版就是基于它开发的。

### 环境搭建

需要安装以下几个：

*   Node.js [Download](https://nodejs.org/en/download/)
*   NW.js [Download](https://nodejs.org/en/download/)

### 创建配置文件

配置文件就是 Node.js 中常见的 `package.json` ，最简单的示例如下：

```json
{
  "name": "blog",
  "main": "http://chensd.com/",
  "version": "0.0.1",
  "window": {
    "width": 1024,
    "height": 768,
    "frame": true,
    "toolbar": false,
    "icon": 'assets/icon.png'
  }
}

```

几个参数解释如下：

*   `main`：程序的入口，这里就是一个网址
*   `window.height` / `window.width`：应用启动时的窗口大小
*   `window.frame`：是否显示桌面应用的标题栏
*   `window.toolbar`：是否显示浏览器中的前进后退和地址栏
*   `window.icon`：这个就是图标了

在程序目录中执行如下的命令，可以查看效果：

```sh
nw .
```

### 程序打包

打包可以使用一个 Node.js 模块 `nw-builder` ，先在程序目录中进行安装：

```sh
npm i --save-dev nw-builder
```

然后再创建一个 js 文件来存放打包配置：

```js
var NwBuilder = require('nw-builder');

var nw = new NwBuilder({
  files: './package.json', // 包含文件
  platforms: ['win64'], // 打包的平台
  version: '0.12.3' // 使用 NW.js 的版本
});

nw.on('log', console.log); // 日志打印函数

// 开始构建
nw.build().then(function(){
  console.log('done!');
}).catch(function(err){
  console.log(err);
});
```

将文件存为 `builder.js` ，然后使用 Node.js 来执行它：

```sh
node builder.js
```

第一次执行时，会从 nwjs.io 上下载编译好的 Chromium 文件，会花点时间，编译完成后，会在目录中生成 `build` 文件夹，其中有个按 `package.json` 中 `name` 字段命名的目录，这里是 `blog` ，包含有使用平台命名的目录，这里是 `win64` ，这便是编译结果，文件列表如下：

```sh
λ ls -al build\eschool_desktop\win64\
total 49332
drwxr-xr-x    1 Sid      Administ     4096 Apr  6 06:54 ./
drwxr-xr-x    5 Sid      Administ        0 Apr  6 06:54 ../
-rwxr-xr-x    1 Sid      Administ  4173928 Apr  6 06:54 d3dcompiler_47.dll*
-rwxr-xr-x    1 Sid      Administ 61057838 Apr  6 06:54 blog.exe*
-rwxr-xr-x    1 Sid      Administ   987648 Apr  6 06:54 ffmpegsumo.dll*
-rw-r--r--    1 Sid      Administ 10457856 Apr  6 06:54 icudtl.dat
-rwxr-xr-x    1 Sid      Administ    86016 Apr  6 06:54 libEGL.dll*
-rwxr-xr-x    1 Sid      Administ  1890304 Apr  6 06:54 libGLESv2.dll*
drwxr-xr-x    1 Sid      Administ     8192 Apr  6 06:54 locales/
-rw-r--r--    1 Sid      Administ  7482865 Apr  6 06:54 nw.pak
-rwxr-xr-x    1 Sid      Administ 14879232 Apr  6 06:54 pdf.dll*
```


这其中，除了可执行文件和 `nw.pak` 和 `icudt.dll` 是必须的外，其它都是可以删除的，具体可以参见 [How to package and distribute your apps](https://github.com/nwjs/nw.js/wiki/how-to-package-and-distribute-your-apps) 文章中的 **Windows** 部分的解释。

### 制作安装包

最后就是做个安装程序来搞定程序文件存储到 Program Files 目录图标放到开始菜单任务栏桌面之类的脏活累活了。自己写安装程序？那可不是 Web 程序员干的事情，当然还是找专业的人来帮忙。比如 [Inno Setup](http://www.jrsoftware.org/isinfo.php) ，当然还有一大票[类似的工具](http://alternativeto.net/software/inno-setup/)。

### 打包为 Mac OS X / Linux 应用

只需要在 `builder.js` 中实例化 nw-builder 时多为 `platform` 数组添加几个值即可，支持的完成列表为：

```js
['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64']
```

### 这样做没毛病吗？

怎么样，看起来不错吧？几分钟二十几行代码就制作了一个桌面应用，而且看起来还人模狗样的。不过你很快会发现，它没有缓存，localStorage 也不持久，每次打开就像第一次打开一样……下次我们来看看如何解决这些问题。
