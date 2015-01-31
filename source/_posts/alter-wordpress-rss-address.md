title: 修改Wordpress页面中的默认RSS地址
tags:
  - RSS
  - wordpress
id: 524
categories:
  - 建站相关
date: 2010-05-13 07:25:44
---

<!--more-->用Wordpress搭建的博客，所有页面默认的RSS订阅地址为：

> [http://chensd.com/feed](http://chensd.com)

但为了方便RSS的管理控制和发布统计，一般会用第三个RSS烧制工具，比如国内的Feedsky，通过这些网站提供的服务，可以把RSS地址转换成：

> [http://feed.feedsky.com/chensd](http://feed.feedsky.com/chensd)

但这个订阅地址依赖feedsky，所以很多时候我们可能并不放心，幸好feedsky提供[个性化域名](http://www.williamlong.info/archives/1186.html)的支持，因此，你可以把自己的域名作为RSS订阅地址，即，可以在&ldquo;Feed优化&rdquo;&rArr;&ldquo;域名绑定&rdquo;中修改成：

> [http://feed.chensd.com](http://feed.chensd.com)

但是，Wordpress中所有页面的默认RSS订阅地址并没有改变，仍然是[http://chensd.com/feed](http://chensd.com)，虽然可以借助其它一些插件来修改，但有个更简单的方法，仅通过修改主题就可以完成这个操作。

首先，打开控制面板，然后打开&ldquo;外观（Appearance）&rdquo;中的&ldquo;编辑（Editor）&rdquo;，选择右侧的&ldquo;头部文件（header.php）&rdquo;文件，找到其中如下的一列：

> &lt;link rel=&quot;alternate&quot; type=&quot;text/xml&quot; title=&quot;RSS .92&quot; href=&quot;<span style="color:#f00;">&lt;?php bloginfo(&#39;rss_url&#39;); ?&gt;</span>&quot; /&gt;

奖其中href的值改成我们需要的Http://feed.chensd.com即可，如下：

> &lt;link rel=&quot;alternate&quot; type=&quot;application/rss+xml&quot; title=&quot;RSS 2.0&quot; href=&quot;<span style="color:#f00;">http://feed.chensd.com</span>&quot; /&gt;