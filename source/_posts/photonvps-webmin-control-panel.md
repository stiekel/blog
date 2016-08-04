title: PhotonVPS系列之三：Webmin控制面板
tags:
  - PhotonVPS
  - VPS
  - Webmin
id: 71
categories:
  - 建站相关
date: 2010-03-15 08:41:47
---

本文主要介绍PhotonVPS提供的免费控制面板工具Webmin，包括其功能、弱势以及部分界面截图。

<!--more-->

在通过客服得到webmin的登录地址后，就可以进行登录了，比如，我的VPS的登录地址是：

*   [http://manage.unixbsd.info:5353](htpp://manage.unixbsd.info:5353/)
然后输入客服得提供的用户名和密码，进入即可。进入后，界面如下（点击图片可放大）：

[![](/upfile/2010/03/photonvps-webmin-login.jpg "photonvps-webmin-login")](/upfile/2010/03/photonvps-webmin-login.jpg)

从功能上讲，Webmin并不足够强大，比如，不支持直接对VPS中的文件进行编辑，只提供基本的功能。主要功能如下：
<div id="_mcePaste">

1.  **基本管理**：重启、关机、启动；
2.  **备份**：但这个功能好像PhotonVPS用户用不了，至少我的这个“阳光一号”套餐在使用的时候，是不行的；
3.  **重装系统**：Webmin提供了超过三十个版本的Linux系统供选择，基本上包括了Linux的各种发行版本；
4.  **更改root密码和VPS名**：因为默认密码很难记，可以修改一个便于记忆的密码；
5.  **网页SSH命令行终端**；
6.  **查看状态信息**；
</div>
登录后，默认进入的是VPS列表，点击VPS名，可以进行某个VPS的详细管理页面，如下图（点击图片可放大），
[![](/upfile/2010/03/photonvps-webmin.jpg "photonvps-webmin")](/upfile/2010/03/photonvps-webmin.jpg)

直接点击 Re-Install OS图标，可以重新给VPS安装系统，所有数据将丢失，设置也将程初始化状态。Re-Install OS的界面如下（点击图片可放大）：

[![](/upfile/2010/03/photonvps-webmin-re-install-os.jpg "photonvps-webmin-re-install-os")](/upfile/2010/03/photonvps-webmin-re-install-os.jpg)

其它例如设置Root密码等等，都比较简单，单击相应图标，并按提示操作即可。需要注意的是，如果想在网页中使用SSH工具来连接VPS，则需要先通过Console Setting来设置密码，再点击Console图标，并安装相关的Java支持。

[![](/upfile/2010/03/photonvps-webmin-console.jpg "photonvps-webmin-console")](/upfile/2010/03/photonvps-webmin-console1.jpg)