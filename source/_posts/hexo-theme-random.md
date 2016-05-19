title: hexo theme random
date: 2016-05-20 06:17:40
tags:
 - Blog
 - Hexo
 - JavaScript
categories:
 - 建站相关
---

把博客从 Wordpress 转换到 Hexo 之后，大部分的时间使用的就是 NeXT 这个主题，不过一直不是很喜欢在文章列表中显示摘要，加上最近发现了一个提供随机图片的服务 [unsplash](http://source.unsplash.com/)，所以决定自己来写一款 Hexo 主题。

五一假期的时候动工的，一直到 19 号早上提交到 Hexo 的官方主题列表，总共花了差不多 20 天，大问题已经差不多解决了，不过 css 写得挺乱的。第一次做博客程序的主题，收获还是挺多的，接触了两个新技术，一个是模板引擎 swig，一个是 css 预编译 stylus ——前同天才看到， swig 已经停止更新一年多了。还发现了 [iconfont](http://iconfont.cn/) 这个相当不错的平台。另外就是用了一下在 Github Tending 上发现的视频插件 [plyr](https://plyr.io/) ，界面还挺不错。部署时，由于 Github 上单个 repo 所属的 Github pages 与 stiekel.github.io 的发生冲突，所以用上了注册了很久的 heroku 账号，感叹国内速度 Github Pages 快多了。

在制作主题的过程中，借鉴了 [Tranquilpeak](https://github.com/LouisBarranqueiro/tranquilpeak-hexo-theme) 这个主题，以及 [IwJS](http://iwritejs.com/who-is-using-jquery/) 中的翻页按钮——不过目前做得没这个漂亮。主题的基础是使用 [generator-hexo-theme](https://github.com/tcrowe/generator-hexo-theme) 生成的。

由于使用了 unsplash 的随机图片作为背景图，所以主题定名为 Random ，主要特色如下：

* 使用只有基本信息和链接的首页
* 使用随机轮播大图作为背景，感谢 [unsplash](http://source.unsplash.com/) 和 [vegas](http://vegas.jaysalvat.com/)
* 放弃在存档、标签和分类列表中使用摘要显示
* 放弃在存档、标签和分类列表中使用翻页功能
* 在存档、标签和分类列表中支持图库的显示
* 使用 plyr 来作为视频的播放器

当然，自己的博客第一时间切换到了新主题，最后放上链接：

* heroku 的 [demo](hexo-theme-random.herokuapp.com) 
* Github 上的 [hexo-theme-random](https://github.com/stiekel/hexo-theme-random)  repo 
* [hexo-theme-random 中文文档](https://github.com/stiekel/hexo-theme-random/blob/master/README.CN.md)

有问题或建议，欢迎提 issue。
