title: 无聊：Burst.NET与PhotonVPS的两个性能测试
tags:
  - Burst.NET
  - PhotonVPS
  - VPS
id: 1020
categories:
  - 建站相关
date: 2010-10-10 09:53:41
---

闲来无事，便想着在[Burst.NET](http://chensd.com/tag/Burst.NET)和[PhotonVPS](http://www.photonvps.com/billing/aff.php?aff=651)上跑跑UnixBunch试试。也算是看看用过的几个[VPS](http://chensd.com/tag/VPS)的基本情况。

## 一、UnixBench 5.1.2测试方法

用的是5.1.2版。在网上找到一个可以下载的地址，直接使用下面命令便可以下载后直接运行：
> wget http://www.ctohome.com/linux-vps-pack/unixbench.sh;sh ./unixbench.sh;
网址缩短一下，就可以用下面的命令：
> wget http://zi.mu/unix;sh ./unixbench.sh;
需要注意的是，这个脚本是为CentOS写的，安装程序用的是yum，因此在安装程序这一步，有些需要手动安装，若提示没有gcc，则可以输入如下命令安装：
> sudo apt-get install gcc

## <!--more-->二、ThinkPad T61

先在自己的本本上跑一跑，有个基本的对比。本本是T1300（1.66G）/ 2G，输入第一个命令就直接开始测试了，结果如下：
> <div id="_mcePaste">Benchmark Run: Sun Oct 10 2010 08:19:15 - 08:47:19</div>> 
> <div>1 CPU in system; running 1 parallel copy of tests</div>> 
> <div>> 
> <div>Dhrystone 2 using register variables        6881623.3 lps   (10.0 s, 7 samples)</div>> 
> <div>Double-Precision Whetstone                     1468.8 MWIPS (10.2 s, 7 samples)</div>> 
> <div>Execl Throughput                               2533.9 lps   (29.9 s, 2 samples)</div>> 
> <div>File Copy 1024 bufsize 2000 maxblocks        275748.7 KBps  (30.0 s, 2 samples)</div>> 
> <div>File Copy 256 bufsize 500 maxblocks           88417.0 KBps  (30.0 s, 2 samples)</div>> 
> <div>File Copy 4096 bufsize 8000 maxblocks        641365.2 KBps  (30.0 s, 2 samples)</div>> 
> <div>Pipe Throughput                              480986.3 lps   (10.0 s, 7 samples)</div>> 
> <div>Pipe-based Context Switching                 165843.9 lps   (10.0 s, 7 samples)</div>> 
> <div>Process Creation                               7918.1 lps   (30.0 s, 2 samples)</div>> 
> <div>Shell Scripts (1 concurrent)                   3212.3 lpm   (60.0 s, 2 samples)</div>> 
> <div>Shell Scripts (8 concurrent)                    405.9 lpm   (60.1 s, 2 samples)</div>> 
> <div>System Call Overhead                         682537.7 lps   (10.0 s, 7 samples)</div>> 
> <div>System Benchmarks Index Values               BASELINE       RESULT    INDEX</div>> 
> <div>Dhrystone 2 using register variables         116700.0    6881623.3    589.7</div>> 
> <div>Double-Precision Whetstone                       55.0       1468.8    267.1</div>> 
> <div>Execl Throughput                                 43.0       2533.9    589.3</div>> 
> <div>File Copy 1024 bufsize 2000 maxblocks          3960.0     275748.7    696.3</div>> 
> <div>File Copy 256 bufsize 500 maxblocks            1655.0      88417.0    534.2</div>> 
> <div>File Copy 4096 bufsize 8000 maxblocks          5800.0     641365.2   1105.8</div>> 
> <div>Pipe Throughput                               12440.0     480986.3    386.6</div>> 
> <div>Pipe-based Context Switching                   4000.0     165843.9    414.6</div>> 
> <div>Process Creation                                126.0       7918.1    628.4</div>> 
> <div>Shell Scripts (1 concurrent)                     42.4       3212.3    757.6</div>> 
> <div>Shell Scripts (8 concurrent)                      6.0        405.9    676.5</div>> 
> <div>System Call Overhead                          15000.0     682537.7    455.0</div>> 
> </div>> 
> <div><span style="white-space: pre;"> </span>========</div>> 
> <div>System Benchmarks Index Score                                         <span style="color: #ff0000;">**557.3**</span></div>

## 三、Burst.NET VPS Package #1

先是在Burst.NET的Package #1。下载是正常的，但在执行性报gcc没找到，于是运行了一下：
> apt-get install gcc
安装完后就没啥问题了，运行时间大约半个多小时，得到了如下的结果，情况还不错：
> <div id="_mcePaste">Benchmark Run: Sun Oct 10 2010 00:39:39 - 01:18:55</div>> 
> <div>> 
> <div>1 CPU in system; running 1 parallel copy of tests</div>> 
> <div>Dhrystone 2 using register variables       11464718.2 lps   (10.0 s, 7 samples)</div>> 
> <div>Double-Precision Whetstone                     2153.4 MWIPS (10.0 s, 7 samples)</div>> 
> <div>Execl Throughput                               3356.0 lps   (29.3 s, 2 samples)</div>> 
> <div>File Copy 1024 bufsize 2000 maxblocks        358392.8 KBps  (30.0 s, 2 samples)</div>> 
> <div>File Copy 256 bufsize 500 maxblocks          107579.7 KBps  (30.0 s, 2 samples)</div>> 
> <div>File Copy 4096 bufsize 8000 maxblocks        762370.5 KBps  (31.1 s, 2 samples)</div>> 
> <div>Pipe Throughput                              675895.9 lps   (10.0 s, 7 samples)</div>> 
> <div>Pipe-based Context Switching                 227716.8 lps   (10.0 s, 7 samples)</div>> 
> <div>Process Creation                               9698.3 lps   (30.0 s, 2 samples)</div>> 
> <div>Shell Scripts (1 concurrent)                   2494.0 lpm   (60.0 s, 2 samples)</div>> 
> <div>Shell Scripts (8 concurrent)                    310.8 lpm   (60.0 s, 2 samples)</div>> 
> <div>System Call Overhead                         603895.0 lps   (10.0 s, 7 samples)</div>> 
> <div>System Benchmarks Index Values               BASELINE       RESULT    INDEX</div>> 
> <div>Dhrystone 2 using register variables         116700.0   11464718.2    982.4</div>> 
> <div>Double-Precision Whetstone                       55.0       2153.4    391.5</div>> 
> <div>Execl Throughput                                 43.0       3356.0    780.5</div>> 
> <div>File Copy 1024 bufsize 2000 maxblocks          3960.0     358392.8    905.0</div>> 
> <div>File Copy 256 bufsize 500 maxblocks            1655.0     107579.7    650.0</div>> 
> <div>File Copy 4096 bufsize 8000 maxblocks          5800.0     762370.5   1314.4</div>> 
> <div>Pipe Throughput                               12440.0     675895.9    543.3</div>> 
> <div>Pipe-based Context Switching                   4000.0     227716.8    569.3</div>> 
> <div>Process Creation                                126.0       9698.3    769.7</div>> 
> <div>Shell Scripts (1 concurrent)                     42.4       2494.0    588.2</div>> 
> <div>Shell Scripts (8 concurrent)                      6.0        310.8    518.1</div>> 
> <div>System Call Overhead                          15000.0     603895.0    402.6</div>> 
> <div>========</div>> 
> </div>> 
> <div id="_mcePaste">System Benchmarks Index Score                                         <span style="color: #ff0000;">**659.6**</span></div>
Burst.NET据说是便宜VPS中unixbunch跑分中很高的一类，看来也的确不假，在论坛上看到还有人Package #1竟然是[双CPU护航](http://www.hostloc.com/thread-13593-4-159.html)——据说是给老客户的优惠。

## 四、PhotonVPS BEAN1

这个[BEAN1 VPS](http://chensd.com/2010-03/photonvps-order.html)本来是10月4号到期，但[PhotonVPS](http://chensd.com/tag/photonvps)的确是很够意思，都超了一个星期了，VPS还是可以照用不误。便宜VPS中，PhotonVPS看来的确是很地道的一个了。

直接运行命令，提示了个“dpkg was interrupted”，于是只好运行了下面的命令：
> dpkg --configure -a
OK，再运行测试的命令，成功了。结果如下：
> <div id="_mcePaste">------------------------------------------------------------------------</div>> 
> <div>> 
> <div>Benchmark Run: Sun Oct 10 2010 10:45:16 - 12:44:40</div>> 
> <div>8 CPUs in system; running 8 parallel copies of tests</div>> 
> <div>Dhrystone 2 using register variables       22290114.7 lps   (10.0 s, 7 samples)</div>> 
> <div>Double-Precision Whetstone                    14931.2 MWIPS (10.3 s, 7 samples)</div>> 
> <div>Execl Throughput                               6916.5 lps   (29.3 s, 2 samples)</div>> 
> <div>File Copy 1024 bufsize 2000 maxblocks        637621.2 KBps  (30.0 s, 2 samples)</div>> 
> <div>File Copy 256 bufsize 500 maxblocks          217357.3 KBps  (30.0 s, 2 samples)</div>> 
> <div>File Copy 4096 bufsize 8000 maxblocks       1377232.8 KBps  (30.1 s, 2 samples)</div>> 
> <div>Pipe Throughput                             1977423.3 lps   (10.0 s, 7 samples)</div>> 
> <div>Pipe-based Context Switching                 458583.4 lps   (10.0 s, 7 samples)</div>> 
> <div>Process Creation                              15561.5 lps   (30.0 s, 2 samples)</div>> 
> <div>Shell Scripts (1 concurrent)                   8611.0 lpm   (60.0 s, 2 samples)</div>> 
> <div>Shell Scripts (8 concurrent)                   1201.9 lpm   (60.1 s, 2 samples)</div>> 
> <div>System Call Overhead                        1265721.4 lps   (10.0 s, 7 samples)</div>> 
> <div>System Benchmarks Index Values               BASELINE       RESULT    INDEX</div>> 
> <div>Dhrystone 2 using register variables         116700.0   22290114.7   1910.0</div>> 
> <div>Double-Precision Whetstone                       55.0      14931.2   2714.8</div>> 
> <div>Execl Throughput                                 43.0       6916.5   1608.5</div>> 
> <div>File Copy 1024 bufsize 2000 maxblocks          3960.0     637621.2   1610.2</div>> 
> <div>File Copy 256 bufsize 500 maxblocks            1655.0     217357.3   1313.3</div>> 
> <div>File Copy 4096 bufsize 8000 maxblocks          5800.0    1377232.8   2374.5</div>> 
> <div>Pipe Throughput                               12440.0    1977423.3   1589.6</div>> 
> <div>Pipe-based Context Switching                   4000.0     458583.4   1146.5</div>> 
> <div>Process Creation                                126.0      15561.5   1235.0</div>> 
> <div>Shell Scripts (1 concurrent)                     42.4       8611.0   2030.9</div>> 
> <div>Shell Scripts (8 concurrent)                      6.0       1201.9   2003.1</div>> 
> <div>System Call Overhead                          15000.0    1265721.4    843.8</div>> 
> <div>========</div>> 
> <div>System Benchmarks Index Score                                        <span style="color: #ff0000;">**1618.7**</span></div>> 
> </div>
PhotonVPS着实让我有些震惊，不过想想它八个核的CPU，也就坦然了。这也从性能上证明了PhotonVPS的确是个不赖的选择。

从测试花的时间来算，最快的是我的本本，大约半个小时就跑完了，PhotonVPS最长，两个多小时还没有折腾完——的确是测试时间越长，得分越多——不亏待苦劳，还真是那么回事儿。