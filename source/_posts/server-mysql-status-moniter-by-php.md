title: 利用PHP实现对服务器性能与状态的监控
tags:
  - MySQL
  - php
id: 1484
categories:
  - 编程杂记
date: 2011-08-31 15:34:10
---

最近由于工作上的原因，需要开发一套服务器性能的监控工具，主要是一些同架构同软件配置的服务器。考虑到最近用php比较多，随即决定使用php来实现。主要需要实现的部分功能如下：

*   1、系统状态，如cpu / 内存 / swap等数据；
*   2、MySQL的性能与运行状态；
其它主要是配合性的数据存储以及可视化。<!--more-->

### 1、使用SNMP实现对系统状态的抓取

SNMP的确是一个很方便的协议，用它可以获取网络设备几乎所有的信息，Linux和Win都可以很好的支持。MIB是一个纷杂的数据库，通过筛选可以获取我们所需要的信息。

PHP5对snmp协议v2有较好的支持。为了方便，可以获取一大组数据，将其存储到一个数组中，再从数组中挑选需要的数据。snmp2_real_walk便可以满足这个需求。它的用法如下：

```php
$status = @snmp2_real_walk($host, $community, &quot;.1.3.6.1.4.1.2021&quot;,10,5);
```

*   $host是目标主机
*   $community是其相应的SNMP community code
*   “1.3.6.1.4.1.2021”是我们要获取的数据树
*   10是超时时间（秒）
*   5是失败后的重试次数
为了防止出错后报错，使用@强行关闭报错。

获取的结果存储在$status里，之后便可以从$status中定位我们所需要的数据了。MIB可能是用数字组织的，也有可能是一堆名字，具体可以在[这里](http://net-snmp.sourceforge.net/docs/mibs/ucdavis.html)进行查询。需要注意，获取的结果中，值和结果是混合在一起的，需要对字符串进行一定的截取。下面是几个比较常用的值：

```php
    $host_status['uptime_1min']         = (float)@substr($status['UCD-SNMP-MIB::laLoad.1'], 9);
    $host_status['uptime_5min']         = (float)@substr($status['UCD-SNMP-MIB::laLoad.2'], 9);
    $host_status['uptime_15min']        = (float)@substr($status['UCD-SNMP-MIB::laLoad.3'], 9);
    $host_status['user_cpu']            = (int)@substr($status['UCD-SNMP-MIB::ssCpuUser.0'], 9);
    $host_status['system_cpu']          = (int)@substr($status['UCD-SNMP-MIB::ssCpuSystem.0'], 9);
    $host_status['idle_cpu']            = (int)@substr($status['UCD-SNMP-MIB::ssCpuIdle.0'], 9);
    $host_status['total_swap']          = (int)@substr($status['UCD-SNMP-MIB::memTotalSwap.0'], 9);
    $host_status['available_swap']      = (int)@substr($status['UCD-SNMP-MIB::memAvailSwap.0'], 9);
    $host_status['total_ram']           = (int)@substr($status['UCD-SNMP-MIB::memTotalReal.0'], 9);
    $host_status['used_ram']            = $host_status['total_ram'] - (int)@substr($status['UCD-SNMP-MIB::memAvailReal.0'], 9);
    $host_status['cached_memory']       = (int)@substr($status['UCD-SNMP-MIB::memCached.0'], 9);
```

SNMP采用的是**UDP协议**，因此数据获取可能会失败，可以考虑在失败之后重试几次。

```php
    $i = 0;
    $status = array();
    do {
        $i ++;
        $status = @snmp2_real_walk($host, $community, &quot;.1.3.6.1.4.1.2021&quot;,10,5);
    } while(!(count($status) != 0 OR $i >= 3));
```

### 2、获取MySQL数据库的状态数据

获取MySQL的状态较简单，只需要运行下面这个查询即可：

```sql
SHOW GLOBAL STATUS
```

这个查询的结果也非常丰富，只需要从中挑选需要的即可。例如下面的例子获取了若干查询的数量：

```php
    $db = @new mysqli($host, $mysql_user, $mysql_pwd);
    $result = @$db->query(&quot;SHOW GLOBAL STATUS&quot;);
    $status = array();
    if($result) {
        while($temp = $result->fetch_assoc()) {
            switch($temp['Variable_name']) {
                case &quot;Com_select&quot;:
                case &quot;Com_insert&quot;:
                case &quot;Com_delete&quot;:
                case &quot;Com_update&quot;:
                case &quot;Com_change_db&quot;:
                    $status[$temp['Variable_name']] = $temp['Value'];
                    break;
                default:
                    break;
            }
        }
        $db->close();
        return $status;
    } else
        return false;
```

唯一需要注意的是，上述值是MySQL服务启动之后的**累加值**，所以说只要MySQL不重启，这些值是递增的。而在实际分析或者显示时，一般是需要某个时间段内的值，有如下两个思路来应对：

*   1、获取最新一次的数据时，从数据库中查询到上次获取的值，二者相减，即可得到两次查询内的数据值，这个实现时还需要保存一个额外的临时值以用于作为减数，否则会失去“坐标”；
*   2、将最新获取的值存储在数据库中，在显示或者读取时，再进行相应的减法操作；
个人比较推荐采用第二种方法，即在使用时再对数据进行处理，这至少遵循了“保存原始数据”这一原则，而且需求是有可能变化的。

### 3、定期执行PHP脚本获取状态值

PHP本身无法实现定时运行这一功能，因此只有借助其它手段，比如，Linux中的crontab，按设定的规则和时间在后台执行，只需要将定时执行的内容换成命令行下的PHP脚本即可。

下面的这一段PHP可以实现从命令行或URL接受参数并执行相关操作的功能

```php
    $action = '';
    if(isset($_GET['action']))
        $action = $_GET['action'];
    if(isset($argv[1]))
        $action = $argv[1];
    switch($action) {
        case &quot;snmp&quot;:
            refresh_host_status_by_snmp();
            break;
        case get_option(&quot;refresh_frequency&quot;) . &quot;min&quot;:
            refresh_order_count();
            refresh_service_status();
            break;
        case &quot;1day&quot;:
            refresh_uptime_yesterday_in_service_list();
            save_all_tasks_one_day_details();
            break;
        default:
            echo &quot;help content here.\n&quot;;
            break;
    }
```

将上述脚本保存为cli.php，则可以通过下面两种方法来运行：

*   1、http://chensd.com/cli.php?action=5min
*   2、/usr/bin/php cli.php 5min
php执行文件的位置可能会因编译或安装的情况而不一样。

在crontab中添加如下的一行可以每隔五分钟运行一次：

```shell
5,10,15,20,25,30,35,40,45,50,55,0 * * * * /usr/bin/php /home/xxx/cli.php 5min
```

或

```shell
*/5 * * * * /usr/bin/php /home/xxx/cli.php 5min
```

### 4、数据的可视化

无论是什么样的人，总是更容易接受图表一些——这个与智商关系不大。

现在的数据可视化技术实在是太丰富了，除了以前比较常见的flash和图片，现在的js可视化技术也进入了实用化阶段，而且将图表的生成工作量转给了客户端浏览器，也没有了插件的依赖，要命的是iOS也没问题……

[Highcharts](http://highcharts.com/demo)和[flot](http://code.google.com/p/flot/)都很不错，前者相对更成熟，后者是开源项目，Highcharts母公司新推出了[Highstocks](http://highcharts.com/stock/demo)也很不错，但是现在还在测试阶段，净highstocks.js都有300多KB。

性能上讲，据称，flot表现1000个点时仍然轻松自如。从我实现的情况来看，highstocks一个图中同时显示3000余个点依然很流畅，单图15000个数据仍然可以灵活拉动highstocks的时间轴。