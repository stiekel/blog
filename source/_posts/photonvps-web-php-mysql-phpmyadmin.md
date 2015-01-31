title: PhotonVPS系列之五：VPS上搭建Web服务器环境
tags:
  - Blog
  - PhotonVPS
  - VPS
  - wordpress
id: 178
categories:
  - 建站相关
date: 2010-03-22 00:48:43
---

买VPS的重要目的之一，就是利用它来搭网站，搭网站的前提就是先要在VPS上部署web服务器环境。在下面的内容中，将以Ubuntu 8.10系列为例，进行环境部署的示例。如果你不是Ubuntu，而又想继续参考这个教程，可以在[VPS控制面板](http://chensd.com/2010-03/photonvps-webmin-control-panel.html)中Re-Install OS一下，并选择Debian / Ubuntu系列系统。目的是搭建一个可以运行WordPress的环境，即：
<div id="_mcePaste">

*   支持PHP
*   支持MySQL
</div>
<div id="_mcePaste"><!--more--></div>
<div>对于PhotonVPS来讲，初始化的情况下就已经安装Apache2，当直接打开其IP时，可以看见Apache2的默认页面，显示有It Works!的index.html。这样对于我们部署web环境来讲，就少了一个安装web服务软件的过程。</div>
<div id="_mcePaste">首先[用SSH登录到VPS](http://chensd.com/2010-03/photonvps-ssh-control-panel.html)。在Windows环境下，运行[PuTTY](http://www.vpser.net/uncategorized/putty-ssh-linux-vps.html)，如果是在Linux环境下，直接在命令行中输入ssh root@VPS IP即可，然后按照提示输入密码。</div>
<div id="_mcePaste">在第一次配置VPS时，登录的用户都是root，所以我们在运行的时候，可以不用在安装命令前加sudo。登录后第一步，将你的VPS系统升级到最新版，依次运行如下命令</div>
<pre>apt-get update
apt-get dist-upgrade</pre>
<div id="_mcePaste">PhotonVPS的速度还是不错的，我的这个“栋梁一号”套餐（Beam 1），运行apt-get命令时下载的速度可以达到2MB/s。运行这两个命令的过程中，会提示你是否继续，当然要输入y来确认。</div>
<div id="_mcePaste">升级到最新后，就可以开始安装其它的软件了，运行以下命令：</div>
<pre>apt-get install php5-mysql libapache2-mod-php5 mysql-server</pre>
<div id="_mcePaste">这个命令可以使得目前的纯html环境支持php，并安装上MySQL的相关环境。在命令运行的过程中，会提示你输入MySQL的密码，输入并记下即可。再运行以下的命令：</div>
<pre>apt-get install phpmyadmin</pre>
<div id="_mcePaste">用以安装PHPmyAdmin，安装这个软件可以方便快捷的完成PHP与Apache2相关的配置工作。安装过程中，会提示你输入php需要支持的环境，利用空格键选择Apache2，再用TAB键选择到OK，最后回车即可。</div>
<div id="_mcePaste">安装完以上环境，基本上就可以使VPS支持php和MySQL了，接下来，我们可以测试一下，运行一个iProber PHP页面，来测试一下我们的环境是否搭建成功。依次输入以下命令，务必注意所有命令的大小写：</div>
<pre>cd /var/www/　　　/进入apache2的默认目录
mkdir iProber　　　/新建一个目录，用于存放iProber PHP工具。
cd iProber　　　　/进入iProber目录
wget http://chensd.com/down/iProber.zip　　　　　/下载iProber软件
unzip iProber.zip　/解压iProber</pre>
<div id="_mcePaste">然后，在浏览器输入http://你的IP或者域名/iProber/iProber.php</div>
<div id="_mcePaste">例如我输入的是：http://chensd.com/iProber/iProber.php，一定要注意大小写。可以看到以下页面：</div>
<div>[![](/upfile/2010/03/photonvps-iprober.jpg "photonvps-iprober")](/upfile/2010/03/photonvps-iprober.jpg)</div>
<div id="_mcePaste">其中，可以看到“PHP组件支持”一项，其中就包括刚刚已经安装的MySQL。</div>
<div id="_mcePaste">打完收功！</div>
<div>注：本文借鉴了[kingsun_he](http://hexun.com/11463531/default.html)的[这篇文章](http://11463531.blog.hexun.com/37686444_d.html)。</div>
<div><span style="font-family: Arial; line-height: 22px; font-size: 12px; color: #333333;">以下内容为[我烧网](http://woshao.com)博客验证内容：woshao_6074f4b7c947f59bb9e29bbf40fafc9c</span></div>