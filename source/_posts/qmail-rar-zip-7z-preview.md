title: QQ邮箱附件压缩包“在线预览”功能初识
tags:
  - mail
  - QQ
id: 350
categories:
  - 乱七八糟
date: 2010-04-07 09:52:29
---

Qmail再一次向我们证明了她的不断进步！当Gmail还停留在Gmail could not scan this file for viruses的时候，Qmail再次展示了她的威力！支持压缩包在线预览。当然，为了防止被骂，我先声明一下，在此免谈Qmail的内容审查。

<!--more-->

在这里，从Gmail发送一个邮件，包含了五个附件，分别测试如下功能：

*   对rar的支持
*   对zip的支持
*   对[7zip](http://www.7-zip.org/)的支持
*   对加密（文件名不加密）rar包的支持
*   对加密（文件名也加密）rar包的支持
Qmail接收后，均显示可以“在线预览”。

[![](/upfile/2010/04/all-can-preview.png "all-can-preview")](/upfile/2010/04/all-can-preview.png)

先来看看对7zip格式的支持情况：

[![](/upfile/2010/04/7z-folder-preview-426x400.png "7z-folder-preview")](/upfile/2010/04/7z-folder-preview.png)

可见，对于7zip格式的支持还是很不错的。做到了全功能预览。

再来看看对于加密了内容但又不加密文件名的压缩包，提供对文件名的显示，但不能查看其具体内容，而且，在列表中，并没有显示出与非加密压缩包的区别。

[![](/upfile/2010/04/rar-filename-uncoded-preview-500x354.png "rar-filename-uncoded-preview")](/upfile/2010/04/rar-filename-uncoded-preview.png)

再来看看对于内容和文件夹均进行加密的压缩包：

[![](/upfile/2010/04/rar-filename-coded-preview.png "rar-filename-coded-preview")](/upfile/2010/04/rar-filename-coded-preview.png)

对于内容和文件都加密的压缩包，不提供任何内容的在的预览。

可喜的是，基本上做到了对于主流压缩文件的支持，这一点上，Gmail是的确给落在了后面。在国内邮箱中，Qmail的确是不二的选择。