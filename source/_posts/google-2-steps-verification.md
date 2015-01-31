title: 体验Google的两步登陆（2-Steps-Verification）
tags:
  - Google
  - 安全
id: 1300
categories:
  - 胡说八道
date: 2011-03-02 00:43:13
---

很久前都听说了Google推出的两步登陆服务，虽然一段时间前就看到[Google Accounts](http://google.com/accounts)页面出现了Using 2-step verification的连接，但点进去都是说稍候，直到今天中午，终于变成了可以设置，于是毫不犹豫，马上开始体验。

[![](/upfile/2011/03/1_2-steps-in-google-accounts-page1.png "1_2-steps-in-google-accounts-page")](/upfile/2011/03/1_2-steps-in-google-accounts-page1.png)

在[Google Accounts](http://google.com/accounts)页面，点击“Using 2-step Verification”可以看到介绍，介绍说只要三步，但实际上却并非如此。<!--more-->

[![](/upfile/2011/03/2_2-step-introduction.png "2_2-step-introduction")](/upfile/2011/03/2_2-step-introduction.png)

点击“Set up 2-step verification”开始设置。首先是选择设备，点击“Next”继续。

[![](/upfile/2011/03/4_2-steps-scan-QR.png "4_2-steps-scan-QR")](/upfile/2011/03/4_2-steps-scan-QR.png)

接下来出来了一个QR码，其实现在你需要在设备上下载[Google Authenticator](https://market.android.com/details?id=com.google.android.apps.authenticator&amp;feature=search_result)软件，然后打开Google Authenticator，点击Scan account barcode按钮，扫描上图中的QR码，Google Authenticator会列出邮件名及一个六位数字。

[![](/upfile/2011/03/7-2-steps-Android-get-code.png "7-2-steps-Android-get-code")](/upfile/2011/03/7-2-steps-Android-get-code.png)

扫描完成后，点击“Next”，再将六位数字填入，点击“Verify”，通过后即可点击“Next”继续。

[![](/upfile/2011/03/8_2-steps-code-verify.png "8_2-steps-code-verify")](/upfile/2011/03/8_2-steps-code-verify.png)

至此对于设备的设置就已经完成了，不过Google提示你，当你的设备不能用（不能正常的运行Google Autenticator程序等），或者丢失，亦或被盗时，该如何进行登陆呢？接下来就是进行一些备用办法的设置。

[![](/upfile/2011/03/9_2-steps-get-backup-options.png "9_2-steps-get-backup-options")](/upfile/2011/03/9_2-steps-get-backup-options.png)

Google提供两种补救办法，一是给你一个Verification Codes，最好是将这些数字截图保存或者打印出来。

[![](/upfile/2011/03/10_2-steps-backup-options.png "10_2-steps-backup-options")](/upfile/2011/03/10_2-steps-backup-options.png)

另外一个办法是由你提供一个备用手机号码，当无法利用Google Authenticator生成六位数字码时，便可以利用这个手机接收六位数字码，可以是同一部手机，也可以是另外的，但Google建议最好是另外一个你可以信任的号码，大多数国家的手机号都在支持的范围，天朝竟然也不例外，不过如果你和我一样是个联通的号码，就会比较惨了——点击一次后，就慢慢等吧，可别像我一样点了好几次，半天没有收到，突然一下蹦出五六条。输入验证数字码后，点击“Next”完成设置。

[![](/upfile/2011/03/11_2-steps-test-phone.png "11_2-steps-test-phone")](/upfile/2011/03/12_2-steps-application-specific-passwords.png)

因为我的这个账号绑定到了Nexus One上，所以Google提示我需要一个Application-Specific passwords，以用来确认这些设备。如果你同时还在其它不能进行两步登陆的地方使用Google账户，也需要为为之生成一个这样的密码。如果使用Google账号的服务用的是OAuth登陆，则不需要。

[![](/upfile/2011/03/12_2-steps-application-specific-passwords.png "12_2-steps-application-specific-passwords")](/upfile/2011/03/12_2-steps-application-specific-passwords.png)

设置就基本完成了。在蓝色的点击“Turn on 2-step verification”按钮后，就真正的打开两步登陆设置了。

[![](/upfile/2011/03/13_2-steps-turn-on.png "13_2-steps-turn-on")](/upfile/2011/03/13_2-steps-turn-on.png)

完成设置后，现在处于登陆状态的Google账户会跳出，然后就可以开始第一次的旅程了。输入平时登陆的密码后。会提示还需要输入使用Google Authenticator生成的六位数字码，

[![](/upfile/2011/03/15_2-steps-login.png "15_2-steps-login")](/upfile/2011/03/15_2-steps-login.png)

完成两步登陆后，Google提示需要生成一个application-specific passwords，因为很多软件无法进行两步登陆，例如Gmail手机版、Picasa桌面版等，为了使用这些软件，需要在这些软件下一次从Google获取资料时输入这个密码。

[![](/upfile/2011/03/17_2-steps-set-application-specific-passwords.png "17_2-steps-set-application-specific-passwords")](/upfile/2011/03/17_2-steps-set-application-specific-passwords.png)

例如，这里为Nexus One上的Gmail生成一个密码，在完成两步登陆后，Nexus One上的Gmail上会要求输入密码，这时候输入平时的密码是无法登陆的，必须输入生成的Application-specific passwords。这个十数位的密码包含数字和字母，并且中间隔几个空格（空格不是密码，只是作隔开用）。

[![](/upfile/2011/03/18_2-steps-get-device-pwd.png "18_2-steps-get-device-pwd")](/upfile/2011/03/18_2-steps-get-device-pwd.png)

以后在登陆时，两步登陆便要求使用Google Authenticator生成的六位数字码，或者也可以使用设置的备用电话通过短信（亦或通过电话）接收一个六位数字码。这才能真正的完成两步登陆。

在使用中发现，手机上的Google Authenticator并不依赖网络。其实这个两步登陆与使用了很久的游戏密保工具类似，只不过以前的密保需要掏钱购买一个专门用来生成数字码的设备，而Google则提供一个软件来代替这个设备，用户便可以以0现金成本的代价来使用了——当然，Google两步登陆却提供了更多的补救方法。

想更好的保护两步登录的安全性，请延伸阅读：[Google两步登陆的安全性分析与保护措施](http://chensd.com/2011-03/why-2-step-verification-is-safe.html)