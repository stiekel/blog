title: PhotonVPS系列之九：将IXWebHosting中的博客转移到PhotonVPS
tags:
  - Godaddy
  - PhotonVPS
  - VPS
  - wordpress
id: 595
categories:
  - 建站相关
date: 2010-05-28 08:41:21
---

IXWebHost（以下简称IX）的唯一优势，可能就是超便宜的价格了，比如[Unlimited PRO](http://www.ixwebhosting.com/index.php/v2/pages.hostingPlans)系列，月付7.95，但有三个免费域名、15个独立IP、无限流量、无限空间、无限数据库。但是，这些诱人数据的背后，也意味着对用户耐心的考验，其速度的确不敢恭维，尤其是在天朝上邦。PhotonVPS也是个走价格路线的主，其Bean 1月付10.95刀，也是VPS中的低价供应商。随着使用时间的增加，也越发发现其VPS超卖现象越来越严重。

但好歹也要“矮子里面挑将军”，虽然PhotonVPS也算不上一流，但好歹还比IX强，前两天，也终于把[Apache2的单IP多域名](http://chensd.com/2010-05/photonvps-apache2-single-ip-support-multi-domains.html)支持配置成功，于是计划把放在IX上的三个博客（[灌木丛](http://xingyz.com)、[鲍毡博客](http://zbao.us)、[途说维基](http://saywiki.com)），全部转到PhotonVPS来，毕竟，这三个全部是中文博客。三个博客也全部都是由Wordpress构建，因此要转移，主要是博客程序和MySQL数据库里的数据。

<!--more-->

### 一、在IX上备份博客程序

先进入IX的管理后台，在Hosting Products中相应的服务里点击“Manage”，在Tools一项中，点击File Manager，这是IX提供的一个以WEB方式进行文件管理的工具。其中，还提供了一个文件夹打包再下载的功能，方便很简单，先勾选要打包的文件夹，再点击上方的“ARCHIVE”按钮，再选择好打包的格式，即可完成。但是，该功能我试了好几次，各种打包格式都试过，均无法正常的完成。IX服务的稳定性，亦可见一斑。

[![IX的文件管理器中的打包下载](/upfile/2010/05/IX_file_manager1-560x160.png "IX_file_manager")](/upfile/2010/05/IX_file_manager1.png)

没办法，只好使用传统的FTP软件进行下载，但是，这个就必须一个文件一个文件的下载了，三个Wordpress程序的网站，小文件非常多，基本上下了一个晚上才完成。

### 二、在PhotonVPS上部署博客程序

打包下载完成后，把这些文件上传到VPS上，可以利用FTP等多种方式，因为我在PhotonVPS中配置vsftp，限于自己的水平，总是不能达到预计的要求，索性关闭了FTP。幸好手边还有个BlueHost主机，于是先FTP传到BlueHost主机上，再在VPS中用Wget工具进行下载。BlueHost上传速度基本稳定在260 KB/S，而VPS从BlueHost上下载的速度，则可以稳定在990 KB/S。

程序上传完毕后，解压到各自目录，再就是设置[Apache2让一个IP支持多个域名](http://chensd.com/2010-05/photonvps-apache2-single-ip-support-multi-domains.html)，设置方法，可见[此文](http://chensd.com/2010-05/photonvps-apache2-single-ip-support-multi-domains.html)。

### 三、更改域名的设置

之所以安排在这一步开始更改域名设置，是因为域名的生效是有时间的，如果你的速度够快，还可以在第一步就开始更改域名的设置。主要是把域名中的A记录中的IP更改为现在的IP。具体方法，可以参考[这篇文章里的Godaddy设置方法](http://chensd.com/2010-05/photonvps-apache2-single-ip-support-multi-domains.html)。

### 四、备份IX上的数据库

在IX的管理后台Databases一项中，点击打开phpMyadmin，即可显示出当前该用户下的MySQL数据库列表，然后点击相应数据库后面的Login按钮，即可进入phpMyAdmin，点击“Export”按钮，然后选择要导出的数据库，导出格式用SQL，压缩方式，选择“bzipped”（推荐压缩，否则在导入的时候，如果导入文件过大，有可能会出问题）。然后点击“Go”按钮，即可导出数据库。用同样的方法，将三个数据库全部导出。

[![phpMyAdmin中数据库的导出](/upfile/2010/05/IX_Mysql_Export-547x560.png "IX_Mysql_Export")](/upfile/2010/05/IX_Mysql_Export.png)

### 五、将数据输入到PhotonVPS中的MySQL

数据导入，方便的方法是使用phpMyAdmin，IX上已经安装好了phpMyAdmin，但是VPS需要自己安装，安装方法在[这里](http://chensd.com/2010-03/photonvps-web-php-mysql-phpmyadmin.html)，一般的网站目录都改变了，因为还需要网站目录中，放一组phpMyAdmin所需要的php文件。

先进入目录已经可用的网站的目录，例如，进入本博客的根目录：
> cd /home/wwwcsd
然后，开始下载phpMyadmin，使用如下的命令即可：
> wget http://downloads.sourceforge.net/project/phpmyadmin/phpMyAdmin/3.3.3/phpMyAdmin-3.3.3-all-languages.zip?use_mirror=nchc
上面的网址太长，也可以用下面缩短后的网址（注意大小写）：
> wget http://to.ly/4Lt1
下载完成后，解压：
> unzip phpMyAdmin-3.3.3-all-languages.zip
再将已经解压的文件夹改名：
> mv phpMyAdmin-3.3.3-all-languages phpMyAdmin
即安装完成，然后，在浏览器中输入如下的地址，即可打开phpMyAdmin：
> http://chensd.com/phpMyAdmin
输入VPS的MySQL用户名和密码，即可登录，登录后，点击“import”，使用默认选项，导入刚刚导出的SQL文件压缩包。

由于IX的MySQL数据库名前部都加有一串数字，因为，还可以使用phpMyAdmin对数据库进行重命名，在phpMyAdmin中选择刚刚导入的数据库，再点击“Operations”，再在“Rename databases to”中输入新名字，最后点击“Go”即可。

### 六、更改程序中的数据库连接设置

上面虽然已经将程序和数据都导入到VPS中，但实际上程序还是连接到IX的数据库，所以还必须更改博客程序中的数据库设置。只需更改wp-config.php中的相应字段即可。

在终端中进入VPS，然后到各自网站的根目录中，输入如下命令开始编辑wp-config.php：
> vi wp-config.php
然后，大如下位置，填入用户名和密码，例如，VPS的MySQL用户名为root，密码为8888，相应博客使用的数据库为dbsw，则将其改为：
> define('DB_NAME','dbsw');
> 
> define('DB_USER','root');
> 
> define('DB_PASSWORD','8888');
然后保存退出。VI的使用方法，可以参考[这里](http://chensd.com/2010-05/photonvps-apache2-single-ip-support-multi-domains.html)的相应部分。

### 七、设置伪静态，以支持固定连接

在如上的设置后，wordpress博客已经可以打开了，但是，当点击一些连接后，发现就出现无法显示的提示，这需要设置伪静态。在终端输入如下命令：
> a2enmod
在出现提示后，再次输入：
> rewrite
即可完成设置。

OK，所有打完收功。