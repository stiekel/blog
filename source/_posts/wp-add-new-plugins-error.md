title: PhotonVPS系列之十：添加新插件出现“执行请求动作，连接信息必须提供”错误提示
tags:
  - PhotonVPS
  - VPS
  - wordpress
id: 708
categories:
  - 建站相关
date: 2010-06-20 00:29:41
---

一大清早，在给一个Wordpress博客添加插件的时候，遇到了提供&ldquo;执行请求动作，连接信息必须提供&rdquo;的问题，具体提示情况如下：

[![执行请求动作，连接信息必须提供](/upfile/2010/05/Install-plugin-error.png "Install-plugin-error")](/upfile/2010/05/Install-plugin-error.png)

这个是因为，Linux的文件系统很强调权限的概念&mdash;&mdash;当然在Windows的NTFS分区中也已经有了这个概念，而添加新插件时，会涉及新建文件，所以会出现上面这样的错误，这个错误，还会出现在上传文件的时候。解决方法也很简单，只需要将目录的权限进行更改即可，即，把Wordpress博客所在的文件夹的归属，改变给Apache2运行时所使用的用户。因此，有两个步骤，一个得到Apache2运行所使用的用户名，二是改变目录权限。

<!--more-->

### 一、得到运行Apache的用户名

先简单，php本身提供一个功能，可以得到当前目录的归属。在SSH终端中输入以下命令，以先进入Wordpress所在的目录：

> cd /home/www/

再输入命令，新建一个who.php文件：

> vi who.php

即进入vi编辑器，按下&ldquo;i&rdquo;键，进入编辑模式，再输入如下内容：

> &lt;?php
> 
> echo(exec(&ldquo;whoami&rdquo;));
> 
> ?&gt;

完成后，按下ESC键退出编辑模式，输入&ldquo;:&rdquo;，再键入&ldquo;wq&rdquo;，保存退出vi。完成后，在浏览器中打开这个文件：

> http://ChenSD.com/who.php

即可在浏览器中看到当前运行Apache2的用户，记下这个用户名，比如，这里是user。

### 二、改变目录的归属权限

再到SSH终端中，进入Wordpress所在目录，输入如下的命令，以改变目录的归属：

> chown -R user *

注意字母的大小写。

再返回Wordpress后台，添加新插件，OK，成功了！