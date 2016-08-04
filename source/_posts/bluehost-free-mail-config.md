title: BlueHost空间中的免费邮箱功能开通
tags:
  - BlueHost
  - mail
  - 域名
id: 331
categories:
  - 建站相关
date: 2010-04-07 01:01:14
---

BlueHost的空间附带了邮箱功能，功能相对够用。今天早上专门来试了一下BlueHost邮件功能开通的方法，之前搜索了一下，好像网上还没有相对完整的资料，于是开了这个过程记录。主要包括BlueHost设置和MX记录的设置。

<!--more-->

### 1、BlueHost设置

先在BlueHost主页上用域名和密码登录，之后，进入cPanel，然后找到Mail之中的Email Accounts，开始创建Email账号。

[![](/upfile/2010/04/cPanel_Mail-500x146.png "cPanel_Mail")](/upfile/2010/04/cPanel_Mail.png)

添加邮箱的名字和密码，例如，这里的用户名是admin@sex.com（[再次声明](http://chensd.com/2010-04/bluehost-dedicated-ip.html)，sex.com可不是我的），@右侧有个下拉列表，分别是“sex.com”和“mail.sex.com”，如果想使自己的域名是admin@mail.sex.com，则可以选择第二个。MailBox Quote可以设定邮箱大小，只能是250MB或者是无限制。完成之后，点击“Create Account”按钮，即完成添加。

[![](/upfile/2010/04/Email_Accounts-500x298.png "Email_Accounts")](/upfile/2010/04/Email_Accounts.png)

这样，邮箱就添加完成了，然后进入http://sex.com/webmail/，输入用户名密码，即可进行登录：

[![](/upfile/2010/04/Mail_Login-307x400.png "Mail_Login")](/upfile/2010/04/Mail_Login.png)

登录后，就可以看到邮箱的管理界面了：

[![](/upfile/2010/04/Mail_Manage-499x286.png "Mail_Manage")](/upfile/2010/04/Mail_Manage.png)

显示的有三种方法来进行邮件的阅读方式，随便哪一种都行，在这里，我们选择SquirrelMail，然后，即可开始进行邮件的收发。进入后，点击“Compose”，写一个邮件，发到一个Gmail邮箱。

[![](/upfile/2010/04/compose_mail-499x400.png "compose_mail")](/upfile/2010/04/compose_mail.png)

然后发送，数秒之后，即可在Gmail中收到邮件，我们可以试着回复。这会发现，Gmail返给我们一个投递错误的回复。这是因为我们还没有为邮箱设置MX记录。

### 2、为邮箱设置MX DNS记录

我的这个域名是在[Godaddy](http://chensd.com/2010-03/godaddy-plan-to-stop-domain-service-in-china.html)申请的，进入Godaddy，然后登录，再点击Domain Auctions，进入Domains中的Domain Manager，点击相应域名，开始进行域名的管理。

顺便抱怨一下，Godaddy的域名管理系统，竟然还不支持Chrome，害得我每次管理域名，都得使用人见人骂的IE（Firefox已经是我的翻墙专用工具了）。

点击“Total DNS”下方的“Total DNS Control”，开始进行MX记录设置。在管理界面中，找到“MX (Mail Exchange)”，点击右侧的“Add New MX Record”，在“Host Name”和“Enter Goes To Address”都填入“@”，然后点击OK按钮。

[![](/upfile/2010/04/Add_MX_Record-500x178.png "Add_MX_Record")](/upfile/2010/04/Add_MX_Record.png)

稍候，就会提示添加成功。Godaddy的域名指向更改，时间是非常快的。一般对于第一次设置的记录，可以立即生效。

再试试用Gmail给我们的admin@sex.com回复，OK，发送成功了！