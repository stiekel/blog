title: PhotonVPS系列之四：SSH终端基本命令
tags:
  - Linux
  - PhotonVPS
  - ssh
  - VPS
  - 命令
id: 97
categories:
  - 建站相关
date: 2010-03-16 08:31:30
---

<div id="_mcePaste">可能像我一样对Linux并不怎么了解的人大有人在，所以也为了方便像我这样的人，特立此文。不求最全，只列所需。</div>
<div id="_mcePaste"><!--more--></div>
<div>首先，对Webmin还不了解的同学，请移步[这里](http://chensd.com/2010-03/photonvps-webmin-control-panel.html)。</div>

## 一、使用SSH连接VPS

<div>PhotonVPS在交费后大约四个小时左右，会向你的注册email发送一个开通通知，通知中包括VPS的IP地址以及root密码，这便是你通过SSH登陆的所有信息。对于Win用户，可以在[这里](http://www.vpser.net/uncategorized/putty-ssh-linux-vps.html)查看详细连接方法，对于Linux用户，可以直接打开终端，然后输入如下命令：</div>
<div>ssh root@173.224.209.19</div>
<div>然后会提示一个RSA确认，输入yes，再输入密码即可，默认的密码是没有规律的，最好是[通过Webmin来修改一个易记而复杂的密码](http://chensd.com/2010-03/photonvps-webmin-control-panel.html)。</div>
<div>[![](/upfile/2010/03/photonvps-linux-ssh.jpg "photonvps-linux-ssh")](/upfile/2010/03/photonvps-linux-ssh.jpg)</div>

## 二、文件和文件夹操作类

<div id="_mcePaste">切换目录：cd</div>
<div id="_mcePaste">例：要打开PhotonVPS上所安装的Apache2的默认根目录，可以使用以下命令：</div>
<div id="_mcePaste">cd /var/www</div>
<div id="_mcePaste">当前目录是/var/www/，如果想回到/var目录，则可以使用</div>
<div id="_mcePaste">cd ..</div>
<div id="_mcePaste">注意两个英文句号与cd之间，有个空格。</div>
<div id="_mcePaste">当前目录是/var/www/，如果想回到根目录，则可以使用</div>
<div id="_mcePaste">cd</div>
<div id="_mcePaste">不带任何参数，可以直接从任意目录回到根目录。</div>
<div id="_mcePaste">任意位置查看根目录下的文件列表情况：</div>
<div id="_mcePaste">ls /</div>
<div id="_mcePaste">查看/var/www目录中的文件列表</div>
<div id="_mcePaste">ls /var/www</div>
<div id="_mcePaste">查看当前目录下的文件列表</div>
<div id="_mcePaste">Ls</div>
<div id="_mcePaste">需要注意的是，在根目录下如果要查看根目录文件列表，必须用ls /。</div>
<div id="_mcePaste">若要建立文件夹blog，可使用如下命令：</div>
<div id="_mcePaste">mkdir blog</div>
<div id="_mcePaste">删除blog文件夹，可使用如下命令：</div>
<div id="_mcePaste">rm –rf blog</div>
<div id="_mcePaste">删除文件index.php，可使用如下命令：</div>
<div id="_mcePaste">rm index.php</div>
<div id="_mcePaste">将目录wordpress重命名为www，可使用如下命令：</div>
<div id="_mcePaste">mv wordpress www</div>

## 三、文件下载与解压类

<div id="_mcePaste">例如，要从wordpress官方网站下载最新版的wp，则可以使用以下命令：</div>
<div id="_mcePaste">wget http://wordpress.org/latest.tar.gz</div>
<div id="_mcePaste">再将latest.tar.gz解压为latest.tar，可用以下命令：</div>
<div id="_mcePaste">gzip –d latest.tar.gz</div>
<div id="_mcePaste">将latest.tar解压，可使用以下命令</div>
<div id="_mcePaste">tar xvf latest.tar</div>
<div id="_mcePaste">即可看到wordpress目录。</div>

## 四、权限分配类

<div id="_mcePaste">有时候，需要给目录分配一定的权限，例如，要正常的运行wordpress（存储在/var/www），则需要对相应的目录使用以下命令：</div>
<div id="_mcePaste">chmod 755 /var/www</div>
<div id="_mcePaste">将wordpress目录设置为www-data用户的目录</div>
<div id="_mcePaste">chown www-data /var/www/</div>

## 五、下载解压wordpress实例

<div id="_mcePaste">下面将以从网上下载wordpress，并解压到/var/www/为例进行演示：</div>
<div id="_mcePaste">cd /var/                                                                     //打开/var目录，即/var/www的上层目录</div>
<div id="_mcePaste">wget http://wordpress.org/latest.tar.gz     //下载wordpress最新版</div>
<div id="_mcePaste">gzip -d latest.tar.gz                                                //解压gz文件</div>
<div id="_mcePaste">tar xvf latest.tar                                                     //解压tar包</div>
<div id="_mcePaste">rm –rf www                                                               //删除www目录</div>
<div id="_mcePaste">mv wordprss www                                                 //将wordpress目录直接命令为www</div>

## 六、SSH命令大全

<div id="_mcePaste">一个比你现在看到的这个要全的说明在[这里](http://www.vpser.net/build/linux-vps-ssh-command.html)，如果你还想更全，参照各Linux命令文章即可</div>