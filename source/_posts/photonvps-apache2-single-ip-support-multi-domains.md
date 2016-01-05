title: PhotonVPS系列之八：Apache2中单IP多域名的设置
tags:
  - apache
  - Blog
  - Godaddy
  - PhotonVPS
id: 568
categories:
  - 建站相关
date: 2010-05-27 01:33:59
---

VPS的费用中，购买单独的IP是一个不少的开支，例如PhotonVPS的独立IP的费用就是每年一个IP要36$，幸好PhotonVPS本来就送两个IP，但仅仅两个人用得话，一年130+$的费用还是比较高的。不过幸好Apache可以将让一个IP绑定多个域名，这样就可以使一个VPS挂N个网站了。下面我们就看看Godaddy域名和PhotonVPS中的设置方法，目的是完成一个如下功能的配置：

*   在Godaddy中设置[saywiki.com](http://saywiki.com)中的二级域名[t.saywiki.com](http://saywiki.com)作为域名，指向PhotonVPS中VPS的IP：173.224.209.20；
*   在PhotonVPS中设置目录/home/wwwsaywiki作为网站主目录；
*   在主目录中放入一个文件index.htm，内容为&ldquo;This is t.saywiki.com&rdquo;；

最终的结果是，输入[t.saywiki.com](http://saywiki.com)域名，即可打开内容为&ldquo;This is t.saywiki.com&rdquo;的网页。

<!--more-->

### 一、Godaddy设置

先进入Godaddy的Domain Manager中，然后选择要设置的域名，进入Total DNS Control，然后点击Add New A Record，在Host Name中输入t，在Points To Ip Address中输入173.224.209.19，完成设置。

[![Godaddy中t.saywiki.com的设置](/upfile/2010/05/Godaddy_t_saywiki-560x101.png "Godaddy_t_saywiki")](/upfile/2010/05/Godaddy_t_saywiki.png)

### 二、新建/home/wwwsaywiki目录和index.htm文件

使用windows下的PuTTY，或者Ubuntu中的ssh工具，[登录到PhotonVPS的VPS上](http://chensd.com/2010-03/photonvps-ssh-control-panel.html)。首先是新建/home/wwwsaywiki目录，输入以下命令即可完成：

```sh
mkdir /home/wwwsaywiki/
```

目录即新建完成，再新建index.htm文件，输入如下命令

```sh
vi /home/wwwsaywiki/index.htm
```

然后即进入vi，按下i，进入vi的编辑模式，输入如下的内容：

```html
<h1>this is t.saywiki.com</h1>
```

然后按esc键退出vi的编辑模式，输入&ldquo;:&rdquo;，再输入wp，保存退出。

### 三、设置Apache2

目录，这个VPS已经挂有两个网站，基本情况如下：

*   [chensd.com](http://chensd.com)，使用IP：173.224.209.20
*   [shenxf.com](http://shenxf.com)，使用IP：173.224.209.19

现在，需要将t.saywiki.com绑定到173.224.209.20这个IP上。这个需要通过设置Apache2来完成，主要是通过一个相关的配置文件来完成，输入如下文件，开始编辑相关的配置文件：

```sh
sudo vi /etc/apache2/sites-available/default
```

开始编辑这个文件，在文件中，输入以下内容：

```
NameVirtualHost 173.224.209.20:80
  <VirtualHost 173.224.209.20:80>
    ServerName t.saywiki.com
    DocumentRoot /home/wwwsaywiki
  </VirtualHost>
  <VirtualHost 173.224.209.20:80>
    ServerName chensd.com
    DocumentRoot /home/wwwcsd/
  </VirtualHost>

NameVirtualHost 173.224.209.19:80
  <VirtualHost 173.224.209.19:80>
    ServerName shenxf.com
    DocumentRoot /home/wwwsxf/
  </VirtualHost>
```

OK，在浏览器中输入[t.saywiki.com](http://saywiki.com)，成功显示&ldquo;this is t.saywiki.com&rdquo;，设置成功。

[![t.saywiki.com设置成功](/upfile/2010/05/t_saywik.png "t_saywik")](/upfile/2010/05/t_saywik.png)

[PhotonVPS系列](http://chensd.com/tags/photonvps)