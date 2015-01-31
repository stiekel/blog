title: From Wordpress to Hexo
date: 2014-12-30 11:00:21
categories:
  - 乱七八糟
tags:
---

2014年就要过去了，而我这一年都没有写哪怕一篇博客。于是我开始想着找一个理由。<!--more-->

前不久，因为翻译的原因，开始用Markdown来组织大量的文字，自然而然的也想着用它来写博客，不过一想到打开放在Bluehost上的Wordpress，就实在忍不住抱怨几句：

*   文章的格式与排版：Wordpress的博文，是用HTML组织的，几乎所有的富文本编辑器——包括 Word——都不可避免的会出现格式混乱，尤其是当博文的格式比较复杂的时候，比如，插入代码，Wordpress中的代码，一般都通过专门的插件来显示，而插件还要与富文本编辑器共同组织格式，当博文中包括一段既有HTML，又有JS和PHP的代码时，编辑器内的格式简直不忍直视，显示出来的文章也千奇百怪。想想历史悠久的LaTeX，还有维基百科，使用特殊符号来组织格式，虽然门坎稍微高了点儿，但的确是对文章进行更好的组织和展示的最佳实践。
*   托管：阮一峰老师在他的[博文](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)中提到了博客作者的三阶段，这至少是我的写博经历。最早写[博客BSP](http://blog.csai.cn)现在已经跟风做P2P门户了，搭起独立博客后，是放在租的VPS上，用那句流行的话，叫“基于众所周知的原因”，当然是选择国外的VPS提供商，选后辗转于PhotonVPS、RLS Hosting和Burst.NET，直到现在用的Bluehost——托[朋友](http://shenxf.com)的福，一直没花什么钱。
*   速度：可能如果服务器是在国内，这个问题也便不是问题了，
*   太重了：Wordpress是个强大的平台，支持很完善的个性化和扩展，但对于单纯的写博客而言，其实是有点重的，开始折腾Wordpress的一两年，可能会弄弄这插件，换换那主题，时间一长，其实打开它也就是写写博客，但它的编辑器，而又不是那么友好。

对于格式，Markdown算是比较完美的解决了，而且可以专注于书写，轻松的处理漂亮而又整齐的格式。剩下就是博客平台的问题了，一搜索，于是发现了 Jekyll / Octopress / Hexo，没经过什么徘徊，就决定用Hexo，无它，唯Node.js耳。

Hexo的配置的确比较简单，[modernist](http://orderedlist.com/modernist/)这个主题正合我意。国内的[Gitcafe](https://gitcafe.com/)也正好有与[Github Pages](http://gitcafe.io/)类似的服务，找了几篇相关的介绍文章（[1](http://zipperary.com/categories/hexo/), [2](http://ibruce.info/2013/11/22/hexo-your-blog/), [3](http://blog.yuanbin.me//posts/2014/05/multi-deployment-with-hexo.html)），很快就完成了，Hexo的Wordpress迁移工具也非常给力，唯一遗憾的是，图片还没放到七牛上——他们自定义域名是需要手持身份证拍照验证的——以后再迁移过去吧，先直接放到Gitcafe Pages。