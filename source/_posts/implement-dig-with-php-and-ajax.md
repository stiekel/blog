title: 利用PHP和AJAX实现“顶”贴功能
tags:
  - ajax
  - php
id: 1400
categories:
  - 编程杂记
date: 2011-05-16 08:16:54
---

最近与[xiaofeng](http://shenxf.com)在实现一个类Digg的聚合网站，其中有一个很常见功能——“顶”贴，虽然使用普通的超连接也可以实现这一功能，但在用户点击后会有一个刷新的过程，要想有更好的体验，使用AJAX是必须的，这也是一个典型的AJAX应用。

AJAX在用户的操作和服务器间建立了一个桥梁，改变了以前在浏览器中每次点击都要刷新页面才能获取新数据的缺点，用户在浏览器的行为将被AJAX的JavaScript脚本捕获，并适时的向服务器获取数据，再在浏览器中进行显示。

### 1、实现功能与结构

最终的结果，是实现一个由一个超连接和一个span，点击超连接后，将数据库中该文章被顶次数加1，另外将span中显示的被顶数加1。具体演示可以参考[Digg.com](Digg.com)主页中的Digg按钮。这一功能分别有以下两个文件来实现：

*   index.php：文章列表，有多篇文章，每篇文章标题的左侧显示有该文章的被顶数及“顶”按钮；
[![](/upfile/2011/05/dig.png "dig")](/upfile/2011/05/dig.png)

*   dig.php：接受一个get参数，名称为postid，值为文章的id，实现的功能是将这篇文章存储在数据库中的被顶次数加1；
*   dig.js：存储超链接的单击事件，在超链接单击后，一方面将文章id传给dig.php，另外将index.php页面中的被顶数加1；
<!--more-->

### 2、index.php中“顶”及被顶次数

在一个文章列表中，拥有多个文章，而为了控制每篇文章的次数，需要对显示被顶次数的span指定一个唯一的id。例如，下面的代码可以实现这一功能（$row为从数据库中取出的一行，其中id为文章id，dig为该文章被顶次数）：

```html
<span id = "numDig-<?php echo $row["id"]?>"><?php echo $row['dig'];?></span>
```

利用文章在数据库中的id和一个固定的字符串就为span指定了唯一的id，如numDig-474等。

在其下方还有一个供点击的超连接，超连接的单击事件将调用javascript中自定义的dig函数，并向其传送一个参数，参数内容为被顶文章的id，实现如下：

```html
<a href="javascript:void(0)" onclick = "dig(<?php echo $row['id'];?>)" id = "btnDig-<?php echo $row['id']?>">顶</a>
```

文章列表中显示被顶次数的顶贴连接就完成了。

### 2、dig.js中AJAX的实现

对于这个脚本来讲，它要实现以下两个方面的功能

*   改变index.php中由id为numDig-postid的span中显示的被顶次数，使其加1；
*   向dig.php提交被顶文章的id，以便其更新数据库中的数据；
先看改变index.php中被顶次数显示的实现，这里用一个自定义函数实现，函数名changeNumDig，需要传送一个参数，即被改变被顶次数文章的id。调用函数后，先检查参数是否为一个数字，若是则选构造显示被顶次数的span的id，其结构为numDig-postid，再获取其中存储的被顶次数值，并递增1。代码如下：

```javascript
function changeNumDig(postid) {
    if(!isNaN(postid)) {
        spanNumDigName = &quot;numDig-&quot; + postid;
        numDig = document.getElementById(spanNumDigName).innerHTML;
        if(!isNaN(numDig)) {
            numDig ++;
            document.getElementById(spanNumDigName).innerHTML = numDig;
        }
    }
}
```

另外就是更改数据库中的被顶次数，即向dig.php提交被顶文章的id，构造一个URL，再将其提交即可。这一过程需要使用AJAX中最重要的对象XmlHttpRequest，这一对象的创建不同的浏览器不一样，具体创建的方法可以参考[W3CSchool中的介绍](http://www.w3school.com.cn/php/php_ajax_xmlhttprequest.asp "AJAX XMLHttpRequest")。代码如下：

```javascript
function GetXmlHttpRequest() {
    var xmlHttpReq = null;
    try {
    xmlHttpReq = new XMLHttpRequest();
    }
    catch(e) {
        try {
        xmlHttpReq = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;);
        }
        catch(e) {
        xmlHttpReq = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
        }
    }
    return xmlHttpReq;
}
```

具体实现过程是使用XmlHttpRequest对象的open方法，实现代码如下：

```javascript
function dig(postid) {
    if(!isNaN(postid)) {
        var url = &quot;dig.php?postid=&quot; + postid;
        xmlHttpReq = GetXmlHttpRequest();
        xmlHttpReq.open(&quot;GET&quot;, url, true);
        xmlHttpReq.send(null);
        changeNumDig(postid);
    }
}
```

3、dig.php修改数据库中的被顶次数

dig.php接受一个需要改变被顶次数的文章id，然后在数据库中查询其所在行，将其dig属性自增1即可。

考虑到安全问题，也需要先检查传进来的文章id是否为数字，然后连接数据库，构造查询字符串，执行检查并关闭即可。具体实现代码如下：

```php
if(!empty($_GET['postid']) and (ctype_digit($_GET['postid']))) {
    require_once('config.php');
    $db = new mysqli($dbhost, $dbuser, $dbpwd, $dbname) or die();
    $query_string = &quot;UPDATE top10_posts SET dig = dig + 1 WHERE id ={$_GET['postid']}&quot;;
    $db->query('SET character_set_client = utf8');
    $db->query('SET character_set_connection = utf8');
    $db->query('SET character_set_results = utf8');
    $db->query($query_string);
    $db->close();
}
```

以上三部分即可实现顶贴功能，这可以在很多Web2.0和聚合网站中看到，只不过可能要相对复杂，但实现的逻辑大都如此。