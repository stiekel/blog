title: PhotonVPS系列之六：Wordpress的固定连接设置问题
tags:
  - Blog
  - PhotonVPS
  - wordpress
id: 393
categories:
  - 建站相关
date: 2010-04-18 06:04:21
---

Wordpress的固定连接，有很优点，具体网上有一大箩筐，基本上所有的老Bloger都会推荐你用固定连接。但使用[PhotonVPS](http://chensd.com/tag/photonvps)的同学可能发现，设置固定连接时会出现一些问题。

<!--more-->

### 一、在Wordpress中设置固定连接

在[PhotonVPS系列之四：SSH基本命令](http://chensd.com/2010-03/photonvps-ssh-command.html)里，已经知道了如何在[PhotonVPS](http://chensd.com/tag/photonvps)上搭建一个Wordpress博客程序，搭建完成后，进入后台管理，在&ldquo;设置&rdquo;中选择&ldquo;固定连接&rdquo;，可以看到如下图的设置：

[![](/upfile/2010/04/wordpress-permalinks-setting-500x281.png "wordpress-permalinks-setting")](/upfile/2010/04/wordpress-permalinks-setting.png)

Wordpress里的常规设置中，没有提供伪html结尾的地址，我们可以进行一个自定义，例如，在自定义结构中输入：

> /%year%-%monthnum%/%postname%.html

这样设置，当完成一篇博文后，并在编辑文章中的文章标题下方的&ldquo;固定连接&rdquo;中进行设置后，就可以看到如下的效果：

[![](/upfile/2010/04/wordpress-edit-post-config-permalink-500x68.png "wordpress-edit-post-config-permalink")](/upfile/2010/04/wordpress-edit-post-config-permalink.png)

> [http://chensd.com/2010-04/photonvps-wordpress-permalinks-setting.html](http://chensd.com/2010-04/photonvps-wordpress-permalinks-setting.html)

设置完成后，点击博客首页里的各个地址，可以发现，原本可以正常打开的连接，现在都打不开了。这是因为PhotonVPS VPS的默认设置有问题，我们还需要进行进一步的改动。

### 二、打开ReWrite支持

在windows下，可以使用[PuTTY](http://chensd.com/2010-03/photonvps-ssh-control-panel.html)工具，在Linux下，可以直接使用终端下提供的ssh命令完成连接，以使用的Ubuntu 9.10为例，点击&quot;应用程序&quot;-&gt;&ldquo;附件&rdquo;-&gt;&ldquo;终端&rdquo;，然后输入：

> ssh root@Chensd.com

按提示输入密码，即可进入VPS的终端。输入如下命令：

> sudo a2enmod

然后再输入

> rewrite

即可完成rewrite的设置。

[![设置apache2的rewrite](/upfile/2010/04/ubuntu-ssh-vps-sudo_a2enmod-500x281.png "ubuntu-ssh-vps-sudo_a2enmod")](/upfile/2010/04/ubuntu-ssh-vps-sudo_a2enmod.png)

### 三、设置Apache2的AllowOverride

接着输入命令：

> sudo vi /etc/apache2/sites-enabled/000-default

将会看到如下的内容：

[![](/upfile/2010/04/ubuntu-ssh-vps-allowoverride-2-500x329.png "ubuntu-ssh-vps-allowoverride-2")](/upfile/2010/04/ubuntu-ssh-vps-allowoverride-2.png)

如果没有看到自己所在网站的文件夹，则可以输入：

> sudo vi /etc/apache2/sites-available/default

默认是在上一个的位置，找到自己网站的文件夹，定位光标到其下方

> AllowOverride None

的None值最后一个字母e，按下i键，使VI编辑器进入插入状态，用Backspace和Delete键结合，删除None，并输入All，如下：

> AllowOverride All

然后按ESC键退出VI的插入模式，输入&ldquo;:&rdquo;，键入&ldquo;wq&rdquo;，回车，即可进行保存。

### 四、重启Apache2

完成后，退出到终端命令提示状态，输入如下命令以重启Apache2：

> /etc/init.d/apache2 restart

OK，打完收功！