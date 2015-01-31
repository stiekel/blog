title: PhotonVPS系列之二：Webmin控制面板和SSH终端使用
tags:
  - PhotonVPS
  - ssh
  - VPS
  - Webmin
id: 52
categories:
  - 建站相关
date: 2010-03-15 01:02:19
---

在完成[VPS的购买](http://chensd.com/2010-03/photonvps-order.html)之后，就可以坐等开通VPS了。大约在你交费后的五个小时左右，你会收到来自PhotonVPS的如下内容的邮件：
> Server Details
> =============================
> Beam1
> Main IP: 173.224.209.19
> Username: root
> Root pass: XXXXX（一串随机密码）
> IP address allocation: 173.224.209.20
> ServerName: vps.chensd.com
> SSH Access Information
> =============================
> Main IP Address: 173.224.209.19
> Server Name: vps.chensd.com
> Root Password: XXXXX（随机密码，与上面的Root pass相同）
<!--more-->

这里包括了关于你VPS服务最重要的信息，包括你的IP地址、ROOT密码等，还有一个套餐内的附加IP。现在，就可以借助SSH进行登陆了。

先说两种SSH的登陆方法，分别是：

1.  在Window平台下，可以借助PuTTY工具，具体下载在[这里](/upfile/2010/03/putty_0.60cn.zip)，使用教程，在[这里](http://www.vpser.net/uncategorized/putty-ssh-linux-vps.html)；
[![](/upfile/2010/03/photonvps-putty.jpg "photonvps-putty")](/upfile/2010/03/photonvps-putty.jpg)
2.  在Linux平台下，可以使用Linux自带的SSH工具，即直接使用ssh命令进行连接即可；
[![](/upfile/2010/03/photonvps-linux-ssh.jpg "photonvps-linux-ssh")](/upfile/2010/03/photonvps-linux-ssh.jpg)
另外就是要获得VPS控制面板的使用地址和用户名密码。可以在PhtonVPS客服系统里[提交服务申请单](https://www.photonvps.com/billing/submitticket.php?step=2&amp;deptid=1)，说明需要使用控制面板来使用VPS，并提供你的VPS基本信息，包括IP、名称、Root密码。三到四小时后，就会得到客服的回复，告知你VPS的控制面板地址、及登陆用户名和密码。如下图（点击可放大）。

[![](/upfile/2010/03/photonvps-support-ticket.jpg "photonvps-support-ticket")](/upfile/2010/03/photonvps-support-ticket.jpg)

之后，便可以登陆Webmin控制面板来控制VPS了。下一篇文章，将介绍Webmin的使用。下图中是Webmin登陆后的界面（点击可以放大）。

[![](/upfile/2010/03/photonvps-webmin.jpg "photonvps-webmin")](/upfile/2010/03/photonvps-webmin.jpg)

一般的，控制面板的登陆密码就是你的Root Pass。