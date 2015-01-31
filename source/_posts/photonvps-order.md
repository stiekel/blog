title: PhotonVPS系列之一：购买
tags:
  - alipay
  - order
  - PhotonVPS
  - VPS
id: 24
categories:
  - 建站相关
date: 2010-03-12 08:49:30
---

象我等普通人，既然决定买了VPS，无非两大功用：

1.  用空间；
2.  架VPN；
第一个不用说，是VPS的主要目的，第二个嘛，对于长期用尽各类“翻*_*墙利器”的同志来讲，经常会有这呀哪啊的问题，一直梦寐以求的就是有一个稳定的翻墙装备，而购买VPS则为你的这个需要提供了一个不错的解决方案。具体用VPS架VPN的文章，可以看[kDolphin的VPN架设教程](http://www.kdolphin.com/node/1099)，以后我也会写一个关于利用PhotonVPS架设VPN的文章。

<!--more-->

话不多说，为什么选择PhotonVPS？原因如下：

1.  便宜，才10.95刀每月；
2.  在这么便宜的情况下，配置还不挺不错，当大部分[10刀以下的VPS](http://www.vpser.net/ten-dollars-vps)都还在64M/128M/256M内存徘徊的时候，PhotonVPS的内存达到了512MB；
3.  默认双IP配置。因为是和朋友[smallbee](http://shenxf.com)一起买VPS，所以肯定是需要两个IP的，而在默认配置中是双IP的，好像除了PhotonVPS就不多了，一个IP每月的价格一般也在2刀左右，就相当于省下了这笔钱；
当然，如果是更多朋友合租PhotonVPS，那就要多考虑一下了，PhotonVPS如果想要多于两个以上的IP，每个IP就需要一个月3刀了，这个是不划算的。

话不多说，先到PhotonVPS的网站看看他们的配置吧：[http://www.photonvps.com/vps.html](http://www.photonvps.com/vps.html)

[![PhotonVPS的产品列表](/upfile/2010/03/photonvps-list.jpg "PhotonVPS的产品列表")](/upfile/2010/03/photonvps-list.jpg)

我选择了第一个，它们提供的“光栋梁一号”，选择后点击下面的order，出现了shopping Cart购物车，Billing Cycle是选择的付费周期，可以月付、季付、半年付和年付。Configure Servers是配置VPS的名字，象我的域名是**chensd.com**，就可以填入chensd，当然，随便填也可以。注意：**Root Password并不是VPS的根用户密码**。

Configurable Options是配置选项，第一个Operating System是选择VPS的系统，这个无所谓，选一个你熟悉的都行，购买完成后，如果你不喜欢这个系统，可以在控制面板中Re Install OS，然后选择你熟悉的系统。Additional IPs，是选择你想额外增加的IP数量，这个是很不划算的，每个每月是3刀。Control Panel是选择VPS控制面板，免费的有Kloxo和Webmin，前者只支持32位OS，后面支持所有。我选择了Webmin，因为也是第一次，用后发现，功能还是相对逊色的。以后会有文章介绍。

完成后就点Update Cart更新购物车吧。

接下来就是优惠码大显身手的时刻了，在[这里](http://www.web-hosting-top.com/web-hosting/web-hosting-top.photonvps.com-reviews)可以查到最新的优惠码：主要有：

1.  首月半价码：**HALFOFF**
2.  总体九价码：**TENOFF**  
因为我选择的是季付，原价32.85刀，TENOFF后是29.57刀，HALFOFF在季付里用不成。呵呵，看来，奸商不是中国特色。不过话说回来，PhotonVPS已经是够便宜了。

如果不想去PhotonVPS的小商品市场，那就可以直接Checkout了，如果属于喜欢逛街的类型，就点Continue Shopping吧。

接着是进行注册账号和选择支付方法，重要通知是：**[PhotonVPS支持支付宝了！！](http://chensd.com/2010-03/photonvps-support-alipay.html)**

支付成功后，很快你会收到订单，一共会收到包括注册成功在内的4个邮件。然后PhotonVPS会为你开通VPS，开通成功后，会以邮件的形式通知你。我当时上上午9：46付费成功，下午4：36收到了开通VPS的邮件通知。主要包括主IP、ROOT密码以及另外的那个附加的IP。

PhotonVPS所提供的VPS都默认安装了Apache2，并设置好了两个IP的各自站点。具体软件相关的设置和使用。还会有后续文章。