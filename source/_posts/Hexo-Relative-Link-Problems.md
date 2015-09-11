title: Hexo中的分页、标签、分类链接地址错误问题
date: 2015-09-12 06:16:54
tags:
  - Hexo
categories:
  - 建站相关
---

从 Wordpress 迁移到 Hexo 已经有半年多的时间了，但有一个问题一直困扰着我没有解决，那就是站点上很多链接的 href 值都有问题，链接点击后会到一些根本不存在的或错误的页面，比如：

*   分页链接：本来 href 的值应该是 `/page/2/index.html` 之类，但它的目标地址却是不存在的 `/page/index.html` ，于是就 404 了
*   分类链接：本来 href 的值应该是 `/categories/建站相关/index.html` 之类，但却是的 `/categories/index.html` ，于是不论怎么点，都还是在分类首页中
*   标签链接：本来 href 的值应该是 `/tags/Hexo/index.html` 之类，但却和分类链接一样，直接链到了 `/tags/inddex.html`

昨天早上的时候，我终于决定，无论如何要找到原因。

<!--more-->

最开始我怀疑的是主题的问题，仔细看了好几个相关的问题，并没有发现任何直接写链接的代码。又更换了主题，问题依然存在，于是便排除主题的原因。

我把所有的 `source/_posts` 中的文件复制到一个完全新建的 Hexo 站点中来，只做最简单的配置，运行起来后，发现所有的链接完全正常。于是复制进来主题目录，依然是正常的。再复制站点的 `_config.yml` 文件——这下便不正常了。

接着就简单了，一个一个找具体是哪一个配置有问题。几次尝试，终于发现了罪魁祸首——原来是相对链接的配置项：

```yml
relative_link: true
```

我最开始使用的是 Hexo 2.x ，可能那时候默认的 `relative_link` 配置是 `true`，而 3.x 中已经默认将其设置为 `false` ，在 3.x 中，Hexo 的相对链接处理，是有 bug 的。于是便导致了这些问题。

已经有人在大前天提了个 [issue](https://github.com/hexojs/hexo/issues/1381) 。