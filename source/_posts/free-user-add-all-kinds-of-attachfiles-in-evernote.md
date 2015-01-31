title: 突破Evernote免费用户不能添加DOC、XLS、PPT、RAR等格式附件的限制
tags:
  - evernote
id: 1087
categories:
  - 乱七八糟
date: 2010-11-09 03:19:36
---

Evernote的方便就不用说了，免费用户也足够满足大部分人的使用需求。唯一比较遗憾的是，Evernote限制了免费用户添加附件的格式，只能添加jpeg、png、gif、mp3、wav、pdf，连常用的doc、xls、ppt等都不行，更不用说小程序小软件了。

[![Evernote限制了免费用户添加附件的格式](/upfile/2010/11/evernote-free-user-attachfile-add-limit.png "evernote-free-user-attachfile-add-limit")](/upfile/2010/11/evernote-free-user-attachfile-add-limit.png)

<!--more-->

好在Evernote不是通过文件头部信息来判断文件格式，而是通过扩展名。所以办法就很简单了，如果只需要存放office或者其它单文件，则可直接将文件扩展名改为pdf，若想存放多个文件，则可以将其打包，再将扩展名改为.pdf。为了方便记忆原文件格式，建议不修改原扩展名，而是在文件夹后直接增加.pdf，例如，原名为“myrar.rar”，可改名为“myrar.rar.pdf”。

当插入“pdf”文件后，Evernote会生成一个pdf图标在笔记中，需要使用时，在图标上点右键，选择“Save As...”，选择另存位置，再将文件改为原扩展名即可。

该方法在Evernote 4.0.1中测试通过，在Linux的NeverNote 0.92.1中亦可正常使用（NeverNote会有错误提示，可忽略）。