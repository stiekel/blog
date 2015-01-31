title: 由MySQL的1194错误导致的Wordpress主页无任何文章显示
id: 752
categories:
  - 建站相关
date: 2010-06-28 09:20:10
tags:
---

6月13号到14号，PhotonVPS号称是[给机房换供电设备](http://www.netroby.com/article-2463.html)，13号晚上还发了设备换毕的邮件，结果14号还在抽风，一度连其官方网站都打不开，直到14号晚上才终于恢复正常。整整两天，PhotonVPS就没有怎么正常过。事后，官方也没有给出邮件进行解释，就更谈不上补偿损失了。

[![](/upfile/2010/06/photonvps_down.png "6月14日PhotonVPS连其官方网站都无法打开")](/upfile/2010/06/photonvps_down.png)

比较惨的是，经过两天的折腾后，打开自己的博客一看，首页已经无任何博文显示了。其它页面，也没有内容。

<!--more-->

[![](/upfile/2010/06/saywiki_black-560x531.png "saywiki_black")](/upfile/2010/06/saywiki_black.png)

于是用phpMyAdmin登录上，查看相应的数据库，发现数据库本身是正常的，但在浏览wp_post表的时候，前几页还没有问题，往后翻时，出现了1194错误的提示。

[![](/upfile/2010/06/mysql_1194_error.png "MySQL数据库1194错误")](/upfile/2010/06/mysql_1194_error.png)

幸好问题不大，于是试着用phpMyAdmin修复相应被损坏的表。在phpMyAdmin中选择相应的数据库，然后进入数据表列表，在需要修复的wp_post表前打勾，再在下方的下拉选框中选择&ldquo;Repair Table&rdquo;（修复表），即可完成修复。

在修复以后，发现表中最新的几条记录已经无法找回了。没办法，只好借助RSS输出来找回了一些数据。

忍不住抱怨一下PhotonVPS，据说部分用户提前收到了通知，但我却没有看到。直到13号晚上发邮件说设备弄好了才知道，结果14号还是断断续续的出问题。官网都抽冈了，结果连个道歉的邮件都没有看到。