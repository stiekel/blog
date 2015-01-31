title: 在PHP CLI下使用类似GET的方法传参
tags:
  - php
id: 1531
categories:
  - 编程杂记
date: 2011-11-29 15:28:31
---

Linux下为了方便，有时候会直接使用命令行的方式来执行php程序，比如一些crontab任务之类，但通常写出来的大部分php程序，都没有考虑到命令行下的一些情况，直接使用GET进行参数传递也是常态，但这在命令行下却很无奈，尤其是传递多个GET参数时，连命令都无法正确执行——GET多参数分隔符&会妨碍命令的执行。

### 1、PHP CLI的参数传递方式

PHP CLI下参数的传递是使用Linux命令行的方式进行，将参数值按照指定的先后顺序依次排列，一旦顺序错误，最终传送的结果也将错误，而且，如果程序要支持命令行参数，还需要专门的分析和拆开$argv数组，如果是修改现有程序，工作量将会更大。

### 2、捕获参数，组装伪$_GET和$_REQUEST数组

命令行下是没有$_GET等变量的，但如果使用GET进行参数传递，程序中肯定会有对诸如$_GET和$_REQUEST数组的调用。如果要降低修改的工作量，最简单的办法就是，抓获CLI传递的参数，再将参数组装成一个$_GET和$_REQUEST数组。
为了避开cli中对参数的先后顺序的要求，让命令执行使用更容易分辨更让人熟悉的URL参数传递方式，可以按如下的格式来传递参数并捕获：

```shell
php filename.php "name=Roges&height=187.96&weight=99.79"
```

<!--more-->

注意，命令行中使用`&`符号时，必须要将其用引号括住，否则你会有意外的惊喜。

### 3、实现

想到了过程，实现起来就比较简单了，一个比较简单的实现如下：

```php
    // if file was executed by php cli, cli paramertes will be convert
    // to $_GET and $_REQUEST array.
    if(isset($argv) AND count($argv) <= 2) {
        // GET paramertes are always follow the page url with ? symtax,
        // it show be removed.
        $argv[1] = str_replace("?", '', $argv[1]);

        $params = explode('&', $argv[1]);

        $_REQUEST = array();
        foreach($params as $p) {
            //get the location of the '='
            $eq_loc = strpos($p, '=');

            $_REQUEST[substr($p, 0, $eq_loc)] = substr($p, $eq_loc + 1, strlen($p) - $eq_loc);
        }

        $_GET = $_REQUEST;
    }
```

将这个代码存储为文件，再在需要使用的文件头部进行引用即可。当在命令行下执行脚本时，使会进行转换，否则是不会进行任何操作的。

### 4、执行效果

将上面的代码保存然后在最后加上如下的两句，便可查看参数传递的效果：

```php
    echo '$_REQUEST: ';
    print_r($_REQUEST);
    echo '$_GET: ';
    print_r($_GET);
```

将文件命令为cli_get.php，在命令行中执行，结果如下：

```shell
Roges@US:~/www$ php cli_get.php  "name=Roges&height=187.96&weight=99.79"
$_REQUEST: Array
(
    [name] => Roges
    [height] => 187.96
    [weight] => 99.79
)
$_GET: Array
(
    [name] => Roges
    [height] => 187.96
    [weight] => 99.79
)
```

手机选来选去，还是黑莓靠谱，大屏幕目前只是玩具而已。