title: PhotonVPS系列之七：利用SSH代理上网
tags:
  - PhotonVPS
  - ssh
  - VPS
id: 426
categories:
  - 建站相关
date: 2010-04-28 02:59:09
---

SSH是目前相对安全方便的&ldquo;出国上网&rdquo;方式，在美国买了VPS，就相当于拿到了网络上的美国绿卡，而且估计很多买 VPS为美帝&ldquo;GDP保八&rdquo;做贡献的人都是冲着SSH代理来的。就我目前使用的情况来看，利用PhotonVPS的VPS来进行SSH代理上网，速度还是很不错的，在某国外著名视频网站上围观视频都基本上不卡，批判阴谋网站也基本流畅。

<!--more-->

### 1、Plink

SSH本来是用来进行远程管理的，但如今它在大陆广为流传，可能就是因为代理上网了。要利用SSH代理上网，比较方便的就是使用Plink这个软件，上次提到有个PuTTY工具，其中就包括一个叫Plink的工具，专门用来干这个勾当。本文末尾也提供这个软件的单独下载（[直接下载](/upfile/2010/04/Plink_PhotonVPS_SSH_Agent.zip)）。

Plink是一个命令行工具，需要使用一个命令来进行SSH代理设置，例如，下面这个命令行：

> plink root@ChenSD.com -pw XXXXXXXXXX -N -D 127.0.0.1:7070
> 
> @ECHO Off

上面的这两句话，已经放在了ssh_agent.bat文件中，右键打开，将ChenSD.com替换为你的IP或者域名、XXXXXXXXXX替换为你的VPS的root密码即可。当然，你也可以新建一个专门的账号用来SSH代理上网。

如果是第一次在当前计算机上用SSH的方式连接VPS，会有一个SSH密钥确认，输入y，再回车即可，直到看到&ldquo;Using username &quot;root&quot;.&rdquo;，即表示代理建立成功。注意，**在批判反动网站的过程中，不要关闭这个窗口**。

[![](/upfile/2010/04/plink_ssh-499x263.gif "plink_ssh")](/upfile/2010/04/plink_ssh.gif)

### 2、设置FireFox的远程DNS解析

FireFox的远程DNS解析可谓是帮了我天朝子民的大忙，不过默认是设置为不用的，打开firefox，在地址栏中输入about:config，然后点一下&ldquo;I&#39;ll be careful, I promise!&rdquo;确认firefox的配置警告。

[![firefox修改配置时的警告确认](/upfile/2010/04/ssh_firefox_config_confirm-500x134.png "ssh_firefox_config_confirm")](/upfile/2010/04/ssh_firefox_config_confirm.png)

即可进入配置，然后在fiter中输入：network.proxy.socks_remote_dns<span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: arial, sans-serif; font-size: 13px; border-collapse: collapse; ">，再双击唯一筛选出一行，将默认的false改为true。</span>

<span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: arial, sans-serif; font-size: 13px; border-collapse: collapse; ">[![](/upfile/2010/04/ssh_network.proxy_.socks_remote_dns-500x102.png "ssh_network.proxy.socks_remote_dns")](/upfile/2010/04/ssh_network.proxy_.socks_remote_dns.png)</span>

&nbsp;

<wbr></wbr>

<wbr>
	<p><wbr></wbr>

	</wbr><wbr>

<wbr> </wbr>

	</wbr><wbr></wbr><wbr>

<wbr></wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr>

<wbr> </wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr>

<wbr></wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr>

<wbr> </wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr>

<wbr></wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr>

<wbr> </wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr>

<wbr></wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr>

<wbr> </wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr>

<wbr> </wbr>

	</wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr></wbr><wbr>

### 3、修改Firefox的代理设置

依次单击&ldquo;工具Tools&rdquo;&rarr;&ldquo;选项options&rdquo;，出现选项设置，点击&ldquo;高级Advanced&rdquo;，再点击&ldquo;网络Networks&rdquo;选项卡，单击&ldquo;设置Setting...&rdquo;按钮，选择&ldquo;Manual proxy configuration:&rdquo;，并在SOCKS Host中填入127.0.0.1，Port中填入7070，再单击OK保存修改。

[![修改firefox的代理设置](/upfile/2010/04/ssh_firefox_proxy_config-425x399.png "ssh_firefox_proxy_config")](/upfile/2010/04/ssh_firefox_proxy_config.png)

### 4、完成配置，开始批判

这样，配置就完成了。

我个人的推荐是：用firefox批判反动网站，用Chrome作为常用浏览，而IE则主要是来解决基本问题。这样，需要批判反动网站也就比较方便了，只需要打开ssh_Proxy.bat文件和打开firefox就行了。

[![世界充满诱获，我们需要保护](/upfile/2010/04/ssh_youtube-500x371.png "ssh_youtube")](/upfile/2010/04/ssh_youtube.png)

OK，打完收功！

&nbsp;

&nbsp;

### 文件下载

*   文件名称：Plink_PhotonVPS_SSH_Agent.zip
*   文件内容：Plink
*   适用系统：Win
*   文件大小：148KB
*   ＭＤ５码：4824d20e5f9d18769f8f4d334958b4b9
*   下载地址：[/upfile/2010/04/Plink_PhotonVPS_SSH_Agent.zip](/upfile/2010/04/Plink_PhotonVPS_SSH_Agent.zip)
*   压　　缩：zip

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

	</wbr></p>