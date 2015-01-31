title: 修改插件文件夹名解决WordPress所有页面及后台打开后空白的问题
tags:
  - wordpress
id: 554
categories:
  - 建站相关
date: 2010-05-23 01:46:14
---

昨天晚上[朋友](http://shenxf.com)Mail，说一个用Wordpress搭的博客打不开了，自从昨天晚上加了个插件后，便所有页面呈空白状态，查看源文件亦没有任何内容。

<!--more-->

早上过来，先用FTP打开了网站根目录，放了一个最简单的htm上去，打开发现可以正常显示，又写了个phpinfo();，亦可以正常显示，可见服务器没有问题。

Google了一下，发现碰到这个问题的人倒有不少，有人提出是[编码问题](http://www.xiaohei.cn/archives/4.html)的，但看了下，却并不是如此。正在郁闷之时，拉动滚动条到搜索結果页最到下方，却发现了这样的提示：

[![Google社会化网络搜索結果](/upfile/2010/05/google_social_search-300x68.png "google_social_search")](/upfile/2010/05/google_social_search.png)

Google的社会化搜索还真是强大，虽然这个朋友还没有深入了解过，但这就算是个开始吧。[打开](http://http://blog.dayanlee.com/?p=39)看了一下，说是插件的问题，需要禁用插件，禁用最简单的办法，即将存放插件的目录改名即可，用FTP打开博客根目录，然后进入wp-content，即可看到默认的存放插件的plugins目录，将其改为任意名称即可。

[![用FileZilla修改FTP中wordpress存放插件的默认目录plugins之名](/upfile/2010/05/rename-plugins-300x229.png "rename-plugins")](/upfile/2010/05/rename-plugins.png)

然后试了下，果然可以正常的打开博客了，随即进入后台，进入插件页，看到wordpress已经因为找不到插件的存放目录，而将所有的插件禁用了：

[![](/upfile/2010/05/wp-admin-plugins-disable-300x210.png "wp-admin-plugins-disable")](/upfile/2010/05/wp-admin-plugins-disable.png)

然后再到FileZilla中插件存放目录改为原名，再刷新，发现插件已经可以设置为启用了。

[![](/upfile/2010/05/wp-admin-plugins-activate-300x210.png "wp-admin-plugins-activate")](/upfile/2010/05/wp-admin-plugins-activate.png)

PS：第一次在Ubuntu上写博文，处理图片的时候还用了下GIMP果然不错的图片处理装备。