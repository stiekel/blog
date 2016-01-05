title: PHP空间无法无天API搭建
tags:
  - PhotonVPS
  - VPS
  - 特色
id: 1149
categories:
  - 建站相关
date: 2010-12-10 03:20:57
---

天朝上邦是普及计算机技术的天堂，V5。

最近GAE也用不成了，很多放在Appspot上的宝贝儿全没戏了，法子都得换了。多说无用。在这里，用我手里的[PhotonVPS](http://www.photonvps.com/billing/aff.php?aff=651)的BEAN1 VPS为例进行搭建，当然，想用免费PHP空间的朋友就自己再找找吧，但要注意，**PHP空间一定要支持CURL**，否则这个搭建方案是行不通的。VPS的朋友，进行以下操作的前提是已经在服务器上[安装好了PHP环境](http://chensd.com/2010-03/photonvps-web-php-mysql-phpmyadmin.html)，有了这些，就可以开工了。<!--more-->

### 一、申请API

先到推官网（[http://dev.twitter.com/](http://dev.twitter.com/)）进行申请，这个怎么进去大家自己想办法。进入后，先用你的账号进行登录，点击“[Register an app](http://dev.twitter.com/apps/new)”然后一一填写相应内容，这些以后还可以修改，所以随便怎么填都无所谓。项目主要如下：

*   Application Name：名字，即显示的tweet发送源，随意，可用中英文；
*   Description：相应的描述，相当于API的介绍文字，可以随便，支持中英文；
*   Application Website：每条tweet后，都会显示Application Name，点击这个名字，就会到这个指定的风址；
*   Organization：随意；
*   Application Type：程序类型，选择“Browser”；
*   Callback URL：这个很重要，主要是指你的搭建位置，可以随便填个URL，等一下再回来修改；
*   Default Access Type：这个选择“Read & Write”；
*   Application ICON：图标，随意；
填完后，会给你一个包括有API key / Registered Callback URL / Consumer key等内容，找个安全的地方记下来，等一下还需要用的。

### 二、程序下载与修改

不少开源项目都在做TW API相关的东西。比如这个[twip项目](http://code.google.com/p/twip/)，先[下载](http://twip.googlecode.com/files/twip-4.1-r184.tar.gz)回程序，然后用WinRAR之类的程序解压，找到其中的config-example.php文件，将其改名为 `config.php` 然后，找个文本编辑器打开，比如记事本之类，会看到以下内容：

```php
define('OAUTH_KEY','');
define('OAUTH_SECRET','');
define('BASE_URL','');
define('API_VERSION','1');
define('DEBUG',FALSE);
define('DOLOG',FALSE);
define('COMPRESS',FALSE);
```

接下来，要做的是，确定你的程序存放的位置，免费PHP空间的朋友自理，已经有域名绑定了的PHP空间的，自己可以随意，比如，我这里放在这个博客的根目录下的twapi目录下，则，地址为 `http://chensd.com/twapi/` 现在可以回到推官网（[http://dev.twitter.com/](http://dev.twitter.com/)），然后点击Your apps，将Callback URL修改为上面的地址。

找到刚刚记下的API key / Registered Callback URL / Consumer key，把API key填到第二行的OAUTH_KEY后的单绰号里，把Consumer key填到第二行的OAUTH_SECRET后的单引号里，把你确定的地址填到BASE_URL后的单引号里，完成，然后保存。

### 三、上传与服务器的配置

对于使用VPS的朋友，可以使用SSH Secure File Transfer Client这个工具进行上传。其它的可以八仙过海。

对于VPS，先要让PHP支持curl，以安装Ubuntu 10.04的PhotonVPS可以输入如下命令：

```sh
sudo apt-get install php5-curl
```

然后重启一下apache：

```sh
sudo /etc/init.d/apache2 restart
```

CURL设置就完成了。再就是给twip中的oauth文件夹给写权限，进入放twip的目录，本例是进入chensd.com所在的目录，然后依次执行如下命令：

```sh
cd twapi

sudo chmod 777 oauth
```

即可完成权限的改变。服务器的设置也就完成了。

### 四、打完收功

使用浏览器进入刚刚设置的callback URL，即可看到如下的页面：

[![Twip搭建成功](/upfile/2010/12/twip_index_php.png "twip_index_php")](/upfile/2010/12/twip_index_php.png)

然后点击“使用O模式”，选择“模拟OAuth验证”，输入自定义的URL地址，和账号密码，再提交认证——整个世界都熙熙攘攘了！

[![生成私有的API](/upfile/2010/12/twip_result.png "twip_result")](/upfile/2010/12/twip_result.png)

将其中的“API PROXY地址”填入可以进行API配置的客户端或者插件就可以了。

[![Metrist](/upfile/2010/12/Metrist.png "Metrist")](/upfile/2010/12/Metrist.png)

流氓会武术，神都挡不住。