title: 怎样以后台Demon方式启动关闭MongoDB和Redis
date: 2015-05-26 11:20:13
tags:
 - Linux
categories:
  - 建站相关
---

不知道是多少次看到人问怎样以后台方式启动MongoDB，网上搜索了一下，其实写这个的文章还是挺多的。不过看完发现大家都只写了怎么启动，却没写如何关闭。而且我又想凑个数刷个关键字，于是记下这篇。

update @ 2015-5-26 增加Redis的启动与关闭

<!--more-->

###MongoDB

在MongoDB的[官方mongod文档](http://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/)已经说明如何以Demon服务的方式启动和关闭mongod。只需要使用`--fork`参数即可。但同时，必须指定打印日志的路径。有两个参数可以进行指定：

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

关闭同样是使用mongod命令，只不过换用`--shutdown`参数即可。

```sh
mongod --shutdown
```

###Redis

在[Redis的官网文档](http://redis.io/topics/quickstart)中同样做出了说明，需要修改配置文件。无论是安装还是直接下载的可执行文件，在安装目录中均可以找到`redis.conf`文件，修改其中的`daemonize`配置即可，默认值为`no`，修改为`yes`。在Redis 2.8.19中，该参数是在`redis.conf`文件的第37行。

```sh
daemonize yes
```

然后在启动`redis-server`的时候，指定配置文件路径即可。

```sh
redis-server /usr/share/redis/redis.conf
```

如果要结束Redis服务，需要使用`redis-cli`命令，并追加`shutdown`参数，如下：

```sh
redis-cli shutdown
```

完成。