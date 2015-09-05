title: WebSocket的性能与压力测试
date: 2015-07-30 17:22:09
tags:
  - JavaScript
  - Node.js
categories:
  - 编程杂记
---

相对于短连接应用，长连接应用的测试要麻烦得多——尤其是性能和压力测试。此前，甚至从来没有给任何一个上线的 WebSocket 应用做过这方面的测试，前两天，看到有人在 [SegmentFault 上问](http://segmentfault.com/q/1010000003028043)这方面的问题，刚好又有空，于是想着，还是来查查这方面的资料吧。在 Github 上一搜，还真有现成的工具，名字很简单，直接就叫[websocket-bench](https://github.com/M6Web/websocket-bench)，

websocket-bench 是个用 Node.js 编写的命令行工具，可以对使用 Socket.io、[faye](https://github.com/faye/faye)、[Primus](https://github.com/primus/primus)、[WAMP](https://github.com/tavendo/WAMP) 编写的长连接应用进行性能和压力测试，用法和参数与 ab 差不多，多了一个指定连接成功后进行的操作的定义。

<!--more-->

### websocket-bench 安装

需要使用 npm 以全局的方式来安装 websocket-bench，当然要用阿里提供的[]福利服务器](http://npm.taobao.org)，如下：

```sh
npm install -g websocket-bench --registry=http://registry.npm.taobao.org
```

### 基本使用

这里以在 CentOS 6.5 上进行测试为便进行说明。首先要修改一下文件打开数，默认是1024，修改为一个比较大的值就行，总共65535个端口，我们测试也不会用太大的并发，websocket-bench 推荐设置的是 60000 ，命令如下：

```sh
ulimit -n 60000
```

websocket-bench 的参数与 ab 基本一致，像这样

```sh
websocket-bench -a 300 -c 29 http://localhost:8100 -o opt.log
```

`-a` 参数用于指定总共的测试次数，`-c`参数指定并发连接数。我这里测试的是一个 Socket.io 的服务器，所以不需要使用 `-t`参数指定类型，如果是其它的，则需要使用 `engine.io` `faye` `primus` `wamp` 进行指定。运行完成后，会打印报告，报告分两小部分，前一部分是以 `-c` 指定的数量组织的表格，后一部分是整个测试的统计，数据包括错误数和消耗时间。

使用`-o`参数可以将报告保存到单独的文件中。

### 使用 generator 来自定义测试逻辑

长连接压力测试麻烦的一部分，就在于连接完成后需要完成一定的交互操作，websocket-bench 通过 `generator` 文件来方便测试人员编写连接上服务器后所需要执行的操作。下面是我为了简单的测试一个2D地图移动游戏的简单测试文件：

```js
module.exports = {
  //可选，在建立连接之前会执行
  beforeConnect: function(client){
  },
  //必选，建立连接后所要做的事情
  onConnect: function(client, done){
    //向服务器发送消息
    //client 为客户端的连接实例
    client.emit('setTitle', {title: 'bench_' + randomNumber(), pVer: 2});
    //回调函数
    done();
  },
  //必选，向服务器民送消息时运行的代码
  sendMessage: function(client, done) {
    client.emit('moveTo', {x: randomNumber(3500), y: randomNumber(3500)});
    done();
  }
};


function randomNumber(max){
  return Math.floor(Math.random()* (max || 100000));
}
```

编写完成后，在运行 websocket-bench 时，使用 `-g` 参数指定 generator 文件即可。

另外，测试的时候，可以使用 [iptraf](http://iptraf.seul.org/) 工具来看看带宽的占用情况。