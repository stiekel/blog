title: 译文：在MySQL中使用选项文件（Options File）
tags:
  - MySQL
  - 选项文件
id: 1248
categories:
  - 编程杂记
  - 翻译
date: 2011-02-12 00:42:46
---

*   译　　　文：[在MySQL中使用选项文件（Options File）](http://chensd.com/2011-02/translattion-chapter-11-using-an-options-file.html)
*   原　文　名：Chapter 11 Using an Options File
*   原　书　名：[Learning MySQL](http://oreilly.com/catalog/9780596008642)
*   原书出版社：O'REILLY Media
*   影印出版社：东南大学出版社（[影印版连接](http://www.china-pub.com/34828)）
*   原　作　者：[Seyed M.M. Tahaghoghi](http://tahaghoghi.com/), [Hugh E. Williams](http://hughwilliams.com/)
*   译　作　者：[不可能不确定](http://chensd.com)（@SidCN）
[](http://chensd.com/2011-01//translattion-chapter-11-using-an-options-file.html)

[](http://oreilly.com/catalog/9780596008642)

[](http://hughwilliams.com/)

在阅读本书的过程中，你会发现可以往很多MySQL的程序和脚本传送各种选项或者参数，比如，可以向MySQL监视器传送数据库的用户名和密码。当没有为某个选项指定值的时候，就会使用选项的默认值，再比如，大多数的客户端程序都会使用localhost和3306作为数据库地址和端口的默认值。

如果你不想使用默认值，那么就要在每次运行时进行指定，这不仅麻烦，还有可能引发一些错误。幸好MySQL支持将需要指定的参数或者选项值存储在一个选项文件（options file）里，有时称之为配置文件（configuration file），大多数MySQL程序都能从选项文件中读取选项或者脚本，这些程序包括：myisamchk、myisampack、mysql、mysqladmin、mysqlbinlog、mysqlcc、mysqlcheck、mysqld、mysqld_safe、mysqldump、mysqlhotcopy、mysqlinport、mysql.server和mysqlshow。

下面，将以MySQL监视器为例进行选项文件的介绍。<!--more-->

## 为MySQL监视器配置选项

在本书中经常可以看到在启动监视器时为其指定用户名和密码，诸如：
> sid@sid-ubuntu-laptop:~$ mysql --user=root --password=db> 
> Welcome to the MySQL monitor.  Commands end with ; or \g.> 
> Your MySQL connection id is 50> 
> Server version: 5.1.49-1ubuntu8.1 (Ubuntu)> 
> Copyright (c) 2000, 2010, Oracle and/or its affiliates. All rights reserved.> 
> This software comes with ABSOLUTELY NO WARRANTY. This is free software,> 
> and you are welcome to modify and redistribute it under the GPL v2 license> 
> Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.> 
> mysql&gt;
为了让你的指头少敲几次键盘，你可以将你的用户名和密码保存在一个选项文件里，并将选项文件放在一个监视器在启动时会去检索的位置，之后监视器在启动时，将会从选项文件中自动读取相应的用户名和密码。

在这个选项文件里，首先要指定目标程序－－在这里将是MySQL监视器程序mysql－－再将各个选项一一列在它的后面：
> [mysql]> 
> user=root> 
> password=db
如果你使用的是Linux或者Mac OS X，在一个文本编辑器中输入如上的内容后，将其命名为.my.cnf并保存在用户目录中（~/.my.cnf），如果是Windows，将其命名为my.cnf并保存在 C盘的根目录中（ c:\my.cnf），然后，你将可以不用指定用户名和密码而启动MySQL监视器－－相应的值MySQL监视器会自动从选项文件中读取：
> sid@sid-ubuntu-laptop:~$ mysql> 
> Welcome to the MySQL monitor.  Commands end with ; or \g.> 
> Your MySQL connection id is 47> 
> Server version: 5.1.49-1ubuntu8.1 (Ubuntu)> 
> Copyright (c) 2000, 2010, Oracle and/or its affiliates. All rights reserved.> 
> This software comes with ABSOLUTELY NO WARRANTY. This is free software,> 
> and you are welcome to modify and redistribute it under the GPL v2 license> 
> Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.> 
> mysql&gt;
这实在是太方便了！不幸的是，现在要给你浇一盆冷水了，要提醒的是，将密码使用非加密的方式（纯文本）来存储绝对不是个好主意。至少你要保证只有你能够读写这个文件，在Linux和Mac OS X系统中，可以使用chrom命令来实现：
> chmod u=rw,g=,o= ~/.my.cnf
在本书的第二章中我们讨论了权限的设定，在便利和安全中进行权衡是系统和数据安全中一个永恒不变的话题。你需要确保每个程序的需求。

让我们来看看另外一个例子，如果你想用MySQL监视器连接一个使用端口57777和地址mysql.chensd.com的mysql服务器，并准备使用该服务器上的music数据库，连接这个数据库的用户名为allmusic，密码为the_password，那启动MySQL监视器则需要使用如下的命令
> $ mysql \> 
> --host=mysql.chensd.com \> 
> --port=57777 \> 
> --user=allmusic \> 
> --password=the_password \> 
> --database=music
输入这条命令将是一个恼人的过程，当然，你可以将这些值存储在如下的选项文件中
> [mysql]> 
> host=mysql.chensd.com> 
> port=57777> 
> user=allmusic> 
> password=the_password> 
> database=music
考虑到安全问题，你可以不在选项文件中指定密码，并使用password来取代之，如下：
> [mysql]> 
> host=mysql.chensd.com> 
> port=57777> 
> user=allmusic> 
> password> 
> database=music
这样，MySQL监视器就知道你需要指定密码，在进行连接之前，将会提示你输入密码。

## 选项文件的结构

在上一节我们知道如何为MySQL监视器指定选项值，选项文件可以为每个使用它的程序创建对应的一部分（section），比如，可以为mysql程序指定[mysql]部分，为mysqldump程序指定[mysqldump]部分，同样的，可以使用[mysqld]为、mysqld、mysqld_safe和mysql_nt指定某些个选项。

如果某个选项是针对所有客户端程序的，则可将其整理到[client]部分，同样的，[server]部分中所列出的选项将适用于所有的服务端程序。

需要注意的是，不要将只有某些程序才有的选项加入到通用选项中。例如，mysql是一个客户端程序，且有database这个选项，但是，像mysqladmin和mysqlshow虽然也是客户端程序，但并没有database这个选项，如果将database这个选项放到[client]部分中，如下：
> [client]> 
> database=music
那么这些程序就会出错并退出，像这样：
> sid@sid-ubuntu-laptop:~$ mysqladmin status --user=root --password=db> 
> mysqladmin: unknown variable 'database=music'
像database这样的选项，必须包含在[mysql]中，而不是放在[client]中。

让我们来看看一个更有意思的选项文件：
> [server]> 
> user=mysql> 
> port=67777> 
> basedir=/usr/local/mysql-standard-5.0.22-linux-i686> 
> socket=/home/mysql/servert.sock> 
> datadir=/home/mysql/data> 
> tmpdir=/home/sql/tmp> 
> pid_file=/home/mysql/logs/server.pid> 
> 
> #log server message to:> 
> log=/home/mysql/logs/servert.main.log> 
> 
> #log errors message to:> 
> log_error=/home/mysql/logs/servert.errors.log> 
> 
> #log update to this binary logfile> 
> log_bir=/home/mysql/logs/servert.update.log> 
> 
> [client]> 
> socket=/home/mysql/servert.sock> 
> 
> [mysql]> 
> database=mysql> 
> 
> [mysqldump]> 
> all-databases> 
> result=/tmp/dump.sql
这包括四部分，一个提供给所有的服务端程序，一个提供给所有的客户端程序，一个提供给mysql，一个提供给mysqldump，最后两个都是提供给客户端程序的，但我们列在上面的几个选项并不是所有的客户端程序都能够读取的，所以把它们分开列。
如果一个选项出现在了两个都适用的部分（比如[client]和[mysql]）中，那么越具有针对性的选项会被优先应用（在这里将是[mysql]中的选项）。

以#开始的行在选项文件被读取时是忽略的，这使得可以在选项文件中添加注释，或者将某些值忽略掉。

## 选项的作用范围

选项文件所在的位置决定了这些选项的作用范围。这些范围包括：

*   **全局范围（System-wide）**
选项文件中的设置将会应用到系统中所有的MySQL程序。

在Linux和Mac OS X系统中，全局范围的选项文件需要存储在/etc/my.cnf中，所有的MySQL客户端程序和服务端程序都会自动的读取这个位置的选项文件。

在Windows系统中，选项文件可以存放在&lt;Windows_Directory&gt;\my.ini、&lt;Windows_Directory&gt;\my.cnf、c:\my.ini和c:\my.cnf，&lt;Windows_Directory&gt;是指windows的安装文件夹，通常情况下是c:\windows。目前所有的MySQL Windows版本（４.1.5以上）服务端程序默认情况下不再读取选项文件，因此，如果要为服务端程序指定选项，则需要在服务端程序特有范围（server-specific）选项中指定。但客户端程序不受此影响，仍然会读取这些选项文件。

*   **服务端程序特有范围（server-specific）**
这个范围内的设置只被应用到某个特定的MySQL安装实例中。

这个范围内的选项文件Linux和Mac OS X中存储在&lt;MySQL_Directory&gt;/my.cnf，Windows存储在MySQL_Directory&gt;\my.ini。

这个选项文件有时候也存储在数据文件夹中，但这并不是个好主意，首先，如果不使用默认的数据文件夹，则在安装完MySQL后，还需要指定相应的数据文件夹，否则选项文件是不会起作用的。其次，数据文件夹必须能够被其它需要读取选项文件的客户端程序（包括系统中的其它用户）访问，但数据文件夹最好只限于服务器内部的访问，因此最好将选项文件夹放在其它位置。

Windows中，MySQL在安装过程中会将一个my.ini文件存放在安装文件夹中，当MySQL被安装为系统服务时，会指定选项文件的位置，下面是一个典型的服务：
> "C:\Program Files\MySQL\MySQL Server 5.0\bin\mysql-nt" --defaults-file="C:\Program Files\MySQL\MySQL Server 5.0\my.ini"
如果你想将选项文件存放在其它位置，你可以改变它，比如，你可以让服务端从c:\my.ini读取选项文件：
> "C:\Program Files\MySQL\MySQL Server 5.0\bin\mysql-nt" --defaults-file="C:\my.ini"
如果你想通过命令行而不是系统服务的方式启动服务端，你也需要对选项文件进行指定，可以使用同一个文件，也可以重新建立一个，比如，你可以通过下面的命令来使服务端从c:\my.ini读取相应的配置：
> C:\&gt; mysql-nt --defaults-file="c:\my.ini"

*   **用户特有范围（User-Specific）**
这个范围的设置只在到某些特定用户运行MySQL程序时有效。

在Linux和Mac OS X中，用户特有范围选项文件的默认存储位置是用户目录下的.my.cnf文件，即~/.my.cnf目录，Windows系统中还不支持用户特有范围的选项文件。

## 选项文件的检索顺序

MySQL的客户端和服务端程序按照特定的顺序从指定的位置读取选项文件；从后读取文件中得到的值将会取代先前文件中的值；命令行中指定的值会取代从选项文件中读取的值。

default-file选项可以让MySQL程序忽略默认的选项文件，并从其指定的位置读取选项文件，例如：
> $ mysql --defaults-file=~/mysql/.my.cnf
如果除了默认的选项文件，你还想读取另外的选项文件，可以通过defauls-extra-file选项来进行指定：
> $ mysql --defaults-extra-file=~/mysql/own.cnf
如果你不想程序读取任何选项文件，则可以使用no-defaults选项：
> $ mysql --no-defaults
在Linux和Mac OS X系统中，检索的顺序是：/etc/my.cnf、&lt;MySQL_Directory&gt;/my.cnf、defaults-extra-file，最后是~/.my.cnf，需要注意的是，对于全局可写的选项文件是要被忽略的。通常情况下适当的权限设置应该是：文件所有者对文件具有读写权限，而所在组及其它用户只具有读的权限。这个权限的设置可以使用如下的命令：
> $ chmod u=rw,g=,o= ~/.my.cnf
运行这个命令的时候，需要具有系统的root权限，可以在使用root登录后运行，也可以在这条命令之前加一个sudo。
在Windows系统中，检索的顺序是：&lt;Windows_Directory&gt;\my.ini、&lt;Windows_Directory&gt;\my.cnf、C:\my.ini、C:\my.cnf、&lt;MySQL_Directory&gt;\my.ini、&lt;MySQL_Directory&gt;\my.cnf，最后是defaults-extra-file，重复一遍，Windows中服务端程序不会主动读取选项文件，需要使用defaults-file选项进行指定。

## 判断选项是否有效

有时候我们并不清楚运行某个程序时哪些个选项起到了作用，特别是当在多个文件夹中读取多个选项文件时。大多数MySQL程序都支持print-defaults选项，通过这个选项，可以知道运行程序时有哪些选项起到了作用。例如，想知道mysqldump程序运行是有哪些选项是起到了作用，可以使用如下的命令：
> $ mysqldump --print-defaults> 
> 
> mysqldump would have been started with the following arguments:> 
> --socket=/home/mysql/servert.sock> 
> --all-databases> 
> --result_file=/tmp/dump.sql> 
> --host=localhost> 
> --port=3306> 
> --databases=Music> 
> --result_file=/home/saied/dump.sql
运行my_print_defaults命令并指定要查看的程序可以达到同样的效果，例如，要查看所有客户端程序和mysqldump的设置，可以使用如下的命令：
> $ my_print_defaults client mysqldump> 
> 
> --socket=/home/mysql/servert.sock> 
> --all-databases> 
> --result_file=/tmp/dump.sql> 
> --host=localhost> 
> --port=3306> 
> --databases=Music> 
> --result_file=/home/saied/dump.sql