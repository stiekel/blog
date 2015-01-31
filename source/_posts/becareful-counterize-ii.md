title: 慎用Wordpress插件：Counterize II
tags:
  - VPS
  - wordpress
id: 994
categories:
  - 建站相关
date: 2010-10-05 04:05:17
---

刚开始折腾博客那会儿，安装了很多统计插件，后来去掉了几个，留了Wordpress Site Status和Counterize II，前些天在进行博客转移时，突然发现，博客的数据库在导出导入时，变得很慢，并有数据在导入后丢失，而且比较大。于是用在phpMyAdmin里进入相应的数据库查看，不看不知道，一看吓一跳，只见几个与Counterize II相关的表都庞大无比——尤其是在wp_posts表都只有一兆多的对比之下：

[![Counterize II占用过多的数据库空间](/upfile/2010/10/Counterize-II-data.png "Counterize-II-data")](/upfile/2010/10/Counterize-II-data.png)

<!--more-->要知道我这可是个每天大不了几十个IP的地儿，插件安装时间也只有不到半年，看来，Counterize II的确是个不吃素的插件，虽然其提供的统计信息的确是非常的丰富，但对于我们这些并没有啥高的统计需求的小博来讲，却成了服务器的一个负担。而且据传Counterize II还有抢占CPU时间的嫌疑，对于使用VPS来放博客的就要注意了，小心超限。