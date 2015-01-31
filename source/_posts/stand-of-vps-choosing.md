title: 人不识货钱识货：一次便宜VPS选购的教训
tags:
  - Burst.NET
  - PhotonVPS
  - RLSHosting
  - VPS
id: 973
categories:
  - 建站相关
date: 2010-10-04 09:38:37
---

9月27号，在[Bare Virtual Server](http://www.barevs.com/)上看到[RLS Hosting](http://rlshosting.com/)折后才不到[三美元的VPS](http://www.barevs.com/rls-hosting-3-95-us-vps-256mb-openvz/)，而且，配置还不错，256M内存，512M共享内存，10G空间，100G流量，于是动心了，当时就和[朋友](http://shenxf.com)商量买这个，很快便用Paypal付了款，几乎是付款的同时，便收到了VPS已经成功开通的消息，拿到IP和密码，立即试了试，速度也还比较满意，国内下载稳定在1.05MB/S，算是很不错了。于是连忙把[PhotonVPS](http://chensd.com/tag/photonvps)的[BEAN 1](http://chensd.com/2010-03/photonvps-order.html)上放的几个博客全部迁移到了RLS Hosting的新VPS里。搬进去后都感觉不错，2.97刀的价格尤其吸引人，一乐还写了篇文章来专门推荐这个便宜速度又不错的VPS。

悲剧出现在30号下午，博客已经打不开了，SSH也无法登陆，于是只好打开 VPS ControlPanel，进去一看，硬盘空间和流量情况显示正常，但当前使用内存的情况却一直为零，VPS状态显示正常在线。<!--more-->

[![VPS空间和流量显示正常，内存显示异常](/upfile/2010/10/rls-vps-error-3.png "rls-vps-error-3")](/upfile/2010/10/rls-vps-error-3.png)

于是试着重启VPS，发现情况仍然没有改变，偶然一起重启，发现VPS内存占用在启动开始的几秒里，达到惊人的 1.89G：

[![VPS空间和流量显示正常，内存异常，近2G](/upfile/2010/10/rls-vps-error-2.png "rls-vps-error-2")](/upfile/2010/10/rls-vps-error-2.png)

开始以为是VPS内存占用过高，被系统给kill掉了，于是想着用 Serial Console把服务进行一些调整，先关掉一些再看情况。进去一后才发现，几乎什么都动不了，apache和mysql进程全部无法启动，VPS也无法使用网络，连ping 127.0.0.1都提示“Network is unreachable”。初步判断，与这个VPS无关，但与服务商肯定有关。

[![VPS无法使用网络](/upfile/2010/10/rls_vps_down_net.png "rls_vps_down_net")](/upfile/2010/10/rls_vps_down_net.png)

于是30号下午发了个support ticket问情况，结果却一直没有回应，偶然看到他们网站上写的Twitter是@rlshosting，于是连忙follow，还用@的形式发了几个消息，要求处理相关的ticket，10月1号，收到他们回fo的mail。为了更好的说明，我关掉了以前的ticket，重新发了个有几张配图的ticket。又连忙用DM的方式来请求处理相关的ticket。后来才终于收到了他们的回复。

收到了回复，却更让人生气，只是把我在Serial console里的截图打了个反问：
> is it still down ?
看来 ，这位技术人员也不熟悉VPS的一些情况，通过Serial Console里的截图认为我已经可以正常的连上VPS。而且，不巧的是，回复的签名和@rlshosting竟然是同一个人名。

于是连忙又回复了几次ticket解释引起这些情况可能的原因，结果，得到了这个回复，我崩溃了：
> I don't know how to solve this issue. I tried.
至此，唯一的想法就是能够挽回数据，连忙在Serial Console里想到办法，但mysql服务根本无法启动，sftp也有问题——基本可以绝望了！也幸好只有三天，数据还不怎么多，以前的PhotonVPS也还没有到期，数据也不用转了，直接改域名设置吧。

后来购买了Burst.NET的入门级的VPS，想相民Burst.NET也时老牌服务商了，应该不至于弄出这种事情来。

看来，这个RLS Hosting就有可能是传说中的One Man Company了——至少他们VPS部门的人非常少。不过，事后虽然数据没有导出，但他们也非常及时的退回了Paypal的款项，至少还不至于是个骗子公司。

以后在选择VPS——尤其是便宜的VPS时，一定要注意以下几方面：

*   1、在网上搜索一下，看有没有关于这个公司的信息，尤其是注意看信息发出的时间，要有一定的时间跨度；
*   2、不要便宜得太离谱了，如果你真打算选择异常便宜的VPS，那就不要抱太大的希望，尤其是不要把关键数据放在上面；
*   3、观察这个服务商的产品线，另外注意一下这个公司是不是新近才开始提供VPS服务；
小时候外婆经常告诉我“人不识货钱识货”，看来这次就是不大不小的教训了。