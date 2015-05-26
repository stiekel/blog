title: 怎样以后台方式启动和关闭MongoDB
date: 2015-05-26 11:20:13
tags:
---

不知道是多少次看到人问怎样以后台方式启动MongoDB，网上搜索了一下，其实写这个的文章还是挺多的。不过看完发现大家都只写了怎么启动，却没写如何关闭。而且我又想凑个数刷个关键字，于是记下这篇。

<!--more-->

###以后台Demon方式启动MongoDB

这命令很简单，MongoDB的[官方mongod文档](http://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/)已经说明了，使用`--fork`参数即可。但同时，必须指定打印日志的路径。有两个参数可以进行指定：

*   `--syslog`：直接写入到Linux的系统日志里面，简单暴力又方便
*   `--logpath=path_to_log`：指定具体的日志存储位置

命令如下：

```sh
//直接将日志写入到系统日志中
mongod --fork --syslog
//创建MongoDB的日志目录
mkdir /var/log/mongo/
//启动MongoDB
mongod --fork --logfile=/var/log/mongo/mongod.log
```

###关闭以Demon方式启动的Mongod进程

同样是使用mongod命令，只不过添加一个`--shutdown`参数即可。

```sh
mongod --shutdown
```