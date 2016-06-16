title: 利用 EncloseJS 来打包、加密和保护 Node.js 代码
date: 2016-05-22 11:52:33
tags:
 - Node.js
 - JavaScript
categories:
 - 编程杂记
---

Node.js 从来都不是一个面向传统行业的解决方案，无论是安装还是部署，当然也就没有打包工具，更没有考虑如何加密或保护代码，不过在实际部署中，总会碰到：

* 想把程序打包为一个单文件
* 想让别人不那么方便的获取源代码，对代码做基本的加密或保护
* 不想每次都 `npm i`
* 想更方便的进行大规模部署

绝大多数情况下，我们都不是那个首次面对某个问题的人。而这些需求实在是太普通了，开源的，收费的解决方案都有。[EncloseJS](http://enclosejs.com/) 就是一个收费方案。
<!--more-->

## EncloseJS 可以做什么

* 将源代码打成一个单文件
* 打成的包直接运行，无需 `npm i` 等安装工作
* 打成的包运行时__不依赖 Node.js 和 npm__

虽然还有制作解压缩包和配合 [node-thrust](https://github.com/breach/node-thrust/) 打包 GUI 应用之类，不过这几个基本不是这里要关心的。

## EncloseJS 安装

试用版安装非常简单，直接使用 `npm i -g enclose` 即可。不过需要下载的安装包有好几个，我在阿里云的服务器尝试了好几次都没有成功。

## 怎么用？

我以手头的一个 Socket.io 项目为例做了一个测试，该项目依赖如下：

* redis
* http
* socket.io
* generic-pool
* nutcracker（有依赖，但没有使用）

EncloseJS 打包，如果只是打包 Node.js 的基本代码文件，那直接使用命令行就够了，当然如果需要包括的文件和目录比较多，可以使用单独的文件来指定，具体可参考[文档](https://github.com/igorklopov/enclose/wiki/02.Packaging#explicit-packaging)。

这里使用命令行工具就行了，打包命令如下：

```sh
enclose -l info -x -o ./sio ~/code/sio/bin/socket
```

这里使用的几个参数作用如下：

* `-l info`：显示的内容的级别，`info` 会显示出具体打包的文件列表
* `x`：打包为 x64
* `-o ./sio`：打包后的文件，存储到当前目录，命令为 `ess`
* `~/code/eschool_server/bin/socket`：Node.js 应用的入口文件，也就是 `node` 命令执行的那个文件

打包速度还是很快的，结果如下：

```sh
$ ll ./ess
-rwxr-xr--  1 sid  staff    18M May 21 11:38 ./ess
$ file ./ess
./ess: Mach-O 64-bit executable x86_64
```

打包另外一个项目时，发现对 `require` 语句中使用字符串拼接的路径支持会有问题。

对比其它的方案，EncloseJS 还是非常有优势的，至少打包这个测试项目时是一次性成功。它的试用版是有限制的，运行的时候，会打印一个试用提示，还有网络连接数和进程运行时间的限制。[购买](http://enclosejs.com/buy)订阅的价格是一年100刀，对于企业来讲也不贵。

## 其它的选择

开源的方案也有几个，比如 [nexe](https://github.com/jaredallard/nexe) / [jxcore](https://github.com/jxcore/jxcore) 。
