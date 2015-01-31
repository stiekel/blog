title: 在Wordpress中添加Evernote的Site Memory按钮
tags:
  - Blog
  - evernote
  - wordpress
id: 886
categories:
  - 建站相关
date: 2010-09-11 02:38:13
---

[Evernote的评论](http://www.steelsnarl.com/evernote%E5%87%A0%E4%B8%AA%E6%8A%80%E5%B7%A7%EF%BC%88%E7%BD%91%E7%BB%9C%E7%89%88%E3%80%81%E5%85%B1%E4%BA%AB%EF%BC%89/)不用多说，国内也有不少用户，作为一个优秀的云服务，相对于Dropbox，被封的可能性要小得多，因为Evernote更注重的是收集而不是分享。前段时间Evernote推出了在网站中添加[Site Memory按钮](http://techcrunch.com/2010/09/10/site-memory-evernote-for-websites/)，来快速保存网页中信息的功能，更是方便了用户，下面就以Wordpress blog为例来介绍一下添加Evernote Site Memory按钮的方法。

<!--more-->

### 一、获得代码

*   先打开[Evernote Site Memory的代码生成页面](http://www.evernote.com/about/developer/sitememory/)，点击“Show advanced note-specific options”，显示所有可以编辑的选项，选择图标，然后填写如下内容：
*   Site Name：你的网站或者博客的名字，这个可以随意；
*   Suggested notebook for clips：“推荐粘贴的笔记本名”，这个建议为空，因为如果填入了这一项，而用户的Evernote中又没有与你的这个名字一样的笔记本，Evernote将会默认新建一个，估计有些用户不会喜欢这个功能；
*   Content to clip：这个是为了让Evernote知道你的需要截取你网站中的哪部分，只需要填写相应div的名字即可，对于wordpress来讲，输入“content”即可；
*   Evernote referal code：推荐专用，详细查看Evernote的介绍；
*   Suggested note title：“推荐使用的标题”，这个还是不用了吧，最好就用网页的标题；
*   Source URL：URL地址最好也不要填，就用当前网页的地址吧；
*   Suggested Tags：推荐使用的标签，这个可以填，根据你博客的主题来吧；
*   Styling：可以选择是只复制纯文本，或者全部复制；
[![](/upfile/2010/09/get-evernote-site-memory-button-code.png "get-evernote-site-memory-button-code")](/upfile/2010/09/get-evernote-site-memory-button-code.png)

填完后复制相应的代码即可，例如如下的代码：
> <div id="_mcePaste">&lt;script type="text/javascript" src="http://static.evernote.com/noteit.js"&gt;&lt;/script&gt;</div>
> 
> <div id="_mcePaste">&lt;a href="#" onclick="Evernote.doClip({styling:'full',providerName:'不可能不确定',suggestTags:'技巧'}); return false;"&gt;&lt;img src="http://static.evernote.com/article-clipper.png" alt="Clip to Evernote" /&gt;&lt;/a&gt;</div>

### 二、配置wordpress博客

然后是博客的配置工作。简单的讲，就是修改主题中的single.php即可。打开博客管理后台，仿效点击“外观”》“编辑”，然后选择编辑single.php页面，在&lt;/div&gt;&lt;!-- END entry --&gt;代码之前，粘贴你的代码即可。

然后即可完成配置。