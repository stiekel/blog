title: 坑爹的思科精睿
id: 1394
categories:
  - 乱七八糟
date: 2011-03-18 01:32:16
tags:
---

与女人们花99块钱买遍LV、GUCCI的想法一样，一时之快便选择了思科精睿的SRP532W路由器，这才发现，“阿迪达斯·邦威”和“阿迪达斯”是不一样的，甚至连扯蛋的“美特斯邦威”都不如。

当然，一开始，你是不知道它叫思科精睿SRP532W的，你看到的名字是CISCO SRP532W，直到你因为使用这劳什子发现问题联系CISCO售后并趾高气昂的报出自己的设备型号时——如果你运气足够好，碰到一个售后MM，便会听到“对不起，您的设备是思科精睿中小企业产品系列的，请联系思科精睿售后，电话是400-000-0000”——直接从800跌到了400。

我最烦的事情之一，就是各大公司售前电话全是800，售后电话净是些400，最没形象的干脆给你来个0316-00000000。

2WAN口、8LAN口、QoS控制、VLAN、ACL……要命的是还支持四个无线网络！关键还是CISCO的，而且只要4000块，就是人民币！哎呀妈呀，不选它选谁啊！

如果你象我一样，那你的恶梦就来临了。

一开始设置的时候，你会发现，QoS流量控制中，竟然只能限制上传速度，不能限制下载速度！再走两步发现，只能Block 10个外网地址。用段时间后你又发现，不对啊，怎么跨VLAN最高速度只有不到10Mbps，而且VLAN内部的广播数据每几十分钟总得出那么些问题，离谱的是，竟然还碰到了一个VLAN的广播传到了另外一个VLAN里，不错，那不仅是在电影里出现的，你的思科精睿同样可以做到！

现在，你可以去换其它的便宜货了。