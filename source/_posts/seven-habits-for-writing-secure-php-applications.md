title: 七个习惯助你编写更安全的PHP程序
tags:
  - php
id: 1560
categories:
  - 编程杂记
  - 翻译
date: 2012-12-02 08:35:09
---

本文是一篇翻译文章，原文信息如下：

*   原文：[Seven habits for writing secure PHP applications, Increase the security of your Web applications](http://www.ibm.com/developerworks/opensource/library/os-php-secure-apps/index.html#author1)
*   作者：[Nathan A. Good](https://www.ibm.com/developerworks/community/profiles/user/nathan.a.good)

当谈到安全的时候，我们至少要从三方面入手，平台的、系统的，以及你所编写的程序。而在编写PHP程序时，只有做到了以下七个方面，才能算得上保证了安全：

*   验证输入
*   保护文件系统
*   保护数据库
*   保护会话数据（$_SESSION）
*   防范跨站脚本攻击（XSS）
*   防范伪造表单
*   防范CSRF

<!--more-->

### 1、验证输入

对输入的数据进行验证是安全中最重要防线，想要保证输入的安全，其实很简单，只要不相信你程序的“用户”即可。你的用户可以是普通 的正常用户，他们基本上会按你的设想来使用你的程序，但是，只有涉及到输入，那就很有可能会有恶意的输入，作为一个开发人员，务必保证你的程序能够应对那些恶意的输入，只有考虑到了这一点，你才有可能构建一个健壮而又安全的程序。

对于一个验证，一般遵循以下几个原则：

*   使用白名单
*   对于限制性选项进行重复验证
*   使用退出函数
*   验证输入类型
白名单是一个可能的合法值的列表，与之对应的是黑名单，大多数情况下后者要长得多，其内包含很多不可能的和意料之外的值。

在进行验证的时候，通常情况下，验证允许的值要比验证非法的值要简单得多，比如，当一个输入可能是任意数字，那会验证时确保输入是一个数字即可，千万别试着去一个一个验证那些输入的非数字情况。

### 2、保护文件系统

2000年7月，一个网站将它的客户资料泄露在一台服务器的web目录中，普通的访客都可以通过一个url来查看这个文件中的数据这个案例告诉我们保护文件系统的重要性。

如果你的php程序准备要对文件做一些操作，并且需要用户输入一些数据，那一定要保证用户的输入不会对文件系统做一些让你开心不起来的操作。
**代码一：一个下载文件的例子**

```php
<?php
if ($_POST['submit'] == 'Download') {
    $file = $_POST['fileName'];
    header("Content-Type: application/x-octet-stream");
    header("Content-Transfer-Encoding: binary");
    header("Content-Disposition: attachment; filename=\"" . $file . "\";" );
    $fh = fopen($file, 'r');
    while (! feof($fh))
    {
        echo(fread($fh, 1024));
    }
    fclose($fh);
} else {
    echo("<html><head><");
        echo("title>Guard your filesystem</title></head>");
    echo("<body><form id=\"myFrom\" action=\"" . $_SERVER['PHP_SELF'] .
        "\" method=\"post\">");
    echo("<div><input type=\"text\" name=\"fileName\" value=\"");
    echo(isset($_REQUEST['fileName']) ? $_REQUEST['fileName'] : '');
    echo("\" />");
    echo("<input type=\"submit\" value=\"Download\" name=\"submit\" /></div>");
    echo("</form></body></html>");
}
```

上面的代码最危险的部分在于只要web服务能够读取的文件，用户都可以将它下载回来，包括SESSION存储目录，还有系统的一些敏感文件，比如/etc/passwd。代码例子中，文件名是通过用户在文本框中的输入来获取，但也可以轻易的进行伪造提交。

仅仅通过用户的输入来进行文件系统的访问是危险的，最好的办法是，程序将文件名和位置通过一个伪造的路径来进行对应，并将这些对应关系存储在数据库中。当然，要实现这个还是有点儿麻烦的，简单的办法是，对输入的文件路径进行验证，确保没有特殊字符（如“..”）且只能访问有限的文件，下面的代码利用正则来达到这个目的。
**代码二：检查文件名字符串**

```php
function isValidFileName($file) {
    /* don't allow .. and allow any "word" character \ / */
    return preg_match('/^(((?:\.)(?!\.))|\w)+$/', $file);
}
```

### 3、保护数据库

2008年4月，发生在美国某部（[Department of Corrections](http://en.wikipedia.org/wiki/Department_of_Corrections)，实在不知道咋翻译，对美国的监狱和羁押制度都不了解，而且查了一下几个熟悉的名字都不是，只好学学某部。**2012-12-2 18:51更新**：刚刚在看电影_The Life of David Gale_中看到字幕组将“Ellies Unit, Texas Department of Corrections”翻译为“德州惩治所，艾利斯分所”）的安全事故中，一个漏洞使得恶意攻击者可以通过页面提交他们所想要显示的列名，并获取数据库中存储的敏感数据。这就是一次典型的利用SQL注入实行的攻击，即通过提交一些特殊的字符或者指令使程序在数据库中的查询得到一些开发人员没有意料到的结果。

下面的代码示例中，将重现上述的那个攻击，动态生成一段sql语句，看上去这是一段比较安全的代码，因为它通过一个下拉菜单来指定需要显示的列名，虽然看起来下拉菜单选项里是有限制的，但是POST数据可以轻易的来伪造和提交，这里甚至连星号都没有过滤。

**代码示例三：执行sql**

```html
<html>
<head>
<title>SQL Injection Example</title>
</head>
<body>
<form id="myFrom" action="<?php echo $_SERVER['PHP_SELF']; ?>"
    method="post">
<div><input type="text" name="account_number"
    value="<?php echo(isset($_POST['account_number']) ? $_POST['account_number'] : ''); ?>" />
<select name="col">
<option value="account_number">Account Number</option>
<option value="name">Name</option>
<option value="address">Address</option>
</select>
<input type="submit" value="Save" name="submit" /></div>
</form>
<?php
if ($_POST['submit'] == 'Save') {
    /* do the form processing */
    $link = mysql_connect('hostname', 'user', 'password') or die ('Could not connect' . mysql_error());
    mysql_select_db('test', $link);
    $col = $_POST['col'];
    $select = "SELECT " . $col . " FROM account_data WHERE account_number = " . $_POST['account_number'] . ";" ;
    echo '<p>' . $select . '</p>';
    $result = mysql_query($select) or die('<p>' . mysql_error() . '</p>');
    echo '<table>';
    while ($row = mysql_fetch_assoc($result)) {
        echo '<tr>';
        echo '<td>' . $row[$col] . '</td>';
        echo '</tr>';
    }
    echo '</table>';
    mysql_close($link);
}
?>
</body>
</html>
```

如果单从表单上讲如何保护数据库的安全，那最重要的便是尽量避免动态组装SQL，如果实在需要，也尽量不要让用户能够直接对显示的列进行指定。下面的代码演示了一个简单的验证过程。

**代码四：利用验证和mysql_real__excape_string()来保护数据库**

``` html
<html>
<head>
<title>SQL Injection Example</title>
</head>
<body>
<form id="myFrom" action="<?php echo $_SERVER['PHP_SELF']; ?>"
    method="post">
<div><input type="text" name="account_number"
    value="<?php echo(isset($_POST['account_number']) ? 
        $_POST['account_number'] : ''); ?>" /> <input type="submit"
    value="Save" name="submit" /></div>
</form>
<?php
function isValidAccountNumber($number) 
{
    return is_numeric($number);
}
if ($_POST['submit'] == 'Save') {
    /* Remember habit #1--validate your data! */
    if (isset($_POST['account_number']) &&
    isValidAccountNumber($_POST['account_number'])) {
        /* do the form processing */
        $link = mysql_connect('hostname', 'user', 'password') or
        die ('Could not connect' . mysql_error());
        mysql_select_db('test', $link);
        $select = sprintf("SELECT account_number, name, address " .
        " FROM account_data WHERE account_number = %s;",
        mysql_real_escape_string($_POST['account_number']));
        echo '<p>' . $select . '</p>';
        $result = mysql_query($select) or die('<p>' . mysql_error() . '</p>');
        echo '<table>';
        while ($row = mysql_fetch_assoc($result)) {
            echo '<tr>';
            echo '<td>' . $row['account_number'] . '</td>';
            echo '<td>' . $row['name'] . '</td>';
            echo '<td>' . $row['address'] . '</td>';
            echo '</tr>';
        }
        echo '</table>';
        mysql_close($link);
    } else {
        echo "<span style=\"font-color:red\">" .
    "Please supply a valid account number!</span>";
    }
}
?>
</body>
</html>
```

上面的代码中利用到了mysql_real_escape_string()这个函数，这个可以过滤一些对于sql语句来讲不合法的字符。当然也有人利用magic_quotes_gpc，但这个在php6中就要被取消掉了。而且，magic_quotes_gpc需要在php环境中进行相应的配置。

在代码四中，对最终执行的sql语句进行了输出，通过打印你可以看到，select和from之间的结果集合列是不能改变的，当然，这样做得话，如果要改变表格中显示的数据，必须修改代码。

如果你在使用一些php框架来操作数据库，有些框架已经针对sql语句做了一些验证，具体情况还要看看你所使用的框架的文档。就算如此，也最好做一些其它方面的检查来确保sql没有问题。

### 4、保护会话

默认情况下，php将会话信息存储在一个临时目录（如/tmp目录）中。下面的代码显示了如何将表单中的数据存储到会话变量中。

**代码五：将数据存储在会话变量中**

```html
<?php
session_start();
?>
<html>
<head>
<title>Storing session information</title>
</head>
<body>
<?php
if ($_POST['submit'] == 'Save') {
    $_SESSION['userName'] = $_POST['userName'];
    $_SESSION['accountNumber'] = $_POST['accountNumber'];
}
?>
<form id="myFrom" action="<?php echo $_SERVER['PHP_SELF']; ?>"
    method="post">
<div><input type="hidden" name="token" value="<?php echo $token; ?>" />
<input type="text" name="userName"
    value="<?php echo(isset($_POST['userName']) ? $_POST['userName'] : ''); ?>" />
<br />
<input type="text" name="accountNumber"
    value="<?php echo(isset($_POST['accountNumber']) ? 
    $_POST['accountNumber'] : ''); ?>" />
<br />
<input type="submit" value="Save" name="submit" /></div>
</form>
</body>
</html>
```

下面我们来看看会话变量存储目录中的文件列表。

**代码六：会话存储目录中的文件列表**

[shell]
-rw-------  1 _www    wheel       97 Aug 18 20:00 sess_9e4233f2cd7cae35866cd8b61d9fa42b
[/shell]

再来看看这个文件的内容。

**代码七：会话存储的文件格式**

[shell]
userName|s:5:"ngood";accountNumber|s:9:"123456789";
[/shell]

可以看出，会话变量最终会存储在服务器的文件中，格式的可读性也很高，并且，这个文件是使用web服务的运行账号（如apache或nobody）创建的，这使得会话变量其实是可以通过其它方法来获取其内容的。

**密码存储小贴士**：密码绝对不可以以明文存储在任何地方，无论是数据库，还是会话，或者文件中。最好的办法是将密码进行加密，在对比密码的时候，直接对比加密后的结果。虽然这看起来没有什么，但实践中却有很多地方直接存储了明文密码，比如，当你在找回密码的时候，网站发给你的是你遗忘的密码，而不是一个重置连接，那表明这个网站要么是明文存储了你的密码，要么采用了双向加密的算法，可以根据密码密文解密出原文。就算是后者，那个密钥很有可能泄露，甚至是被猜解出来。

有两种方法可以用来保护会话数据，一是将所有存储到会话中的数据进行加密，当然仅仅是加密也不一定能保证数据的安全。二是自定义会话变量的存储位置，比如，将会话变量也存储到数据库中，当然这又涉及保证数据库的安全，但这至少避免了将会话存储在一个其它账号也可以访问的文件系统中，另外还使得多服务器共享会话变量成为可能。

session_set_save_handler()可以用于定义会话变量的存取和处理，通过它，可以将会话变量加密，并存储到数据库、缓存或者其它地方，代码八便是这样的一个例子。

**代码八：自定义session_set_save_handle()**

``` php
function open($save_path, $session_name)
{
    /* custom code */
    return (true);
}
function close()
{
    /* custom code */
    return (true);
}
function read($id)
{
    /* custom code */
    return (true);
}
function write($id, $sess_data)
{
    /* custom code */
    return (true);
}
function destroy($id)
{
    /* custom code */
    return (true);
}
function gc($maxlifetime)
{
    /* custom code */
    return (true);
}
session_set_save_handler("open", "close", "read", "write", "destroy", "gc");
```

### 5、防止XSS（Cross-site scripting）

XSS的问题存储在于大部分的网页中（不仅仅是php程序）。所谓的XSS，即用户可以将html代码“插入”到你的页面中，当然，这Html代码中是会包含有javascript脚本的，js在Html渲染完成后仍然可以执行的。下面的代码在很多具有文字编辑需求的网站都可以看到，比如BBS、维基以及SNS。

**代码九：可以输入文字的表单**

```html
<html>
<head>
<title>Your chance to input XSS</title>
</head>
<body>
<form id="myFrom" action="showResults.php" method="post">
<div><textarea name="myText" rows="4" cols="30"></textarea><br />
<input type="submit" value="Delete" name="submit" /></div>
</form>
</body>
</html>
```

代码十中显示代码的方式，将是可以利用xss进行攻击的。

**代码十：showResult.php**

```html
<html>
<head>
<title>Your chance to input XSS</title>
</head>
<body>
<form id="myFrom" action="showResults.php" method="post">
<div><textarea name="myText" rows="4" cols="30"></textarea><br />
<input type="submit" value="Delete" name="submit" /></div>
</form>
</body>
</html>
```

如果我们将下面的代码提交到代码九中的表单，那将会在在新窗口中弹出google的首页。

**代码十一：一个利用XSS的恶意输入**

[javascript]
<script type="text/javascript">// <![CDATA[
myRef = window.open('http://www.google.com','mywin',
'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
// ]]></script>
[/javascript]

如果想要防止xss攻击，那就要注意在显示任何输入的值前之前，先使用htmlentities()函数来进行处理。当然，同时也要保持上面提到过的对输入进行验证的习惯。

下面使用htmlentities()来使上面的showResult.php更加安全。

**代码十二：改进后的showResult.php**

```php
<html>
<head>
<title>Results demonstrating XSS</title>
</head>
<body>
<?php
echo("<p>You typed this:</p>");
echo("<p>");
echo(htmlentities($_POST['myText']));
echo("</p>");
?>
</body>
</html>
```

### 6、防止非法的post/get提交

表单欺骗是利用表单所在页面外的地方向你提交数据的一种攻击。最简单的方法是创建一个页面，然后将form的action设置为你的页面。

web的架构决定了web应用程序都是没有状态的，基本没有办法100%禁止这类表单欺骗，不管是通过ip或者主机名之类，仍然都是可能被冒充的。下面的代码是一个简单的可以接受提交数据的页面。

**代码十三：处理一个提交**

```html
<html>
<head>
<title>Form spoofing example</title>
</head>
<body>
<?php
if ($_POST['submit'] == 'Save') {
    echo("<p>I am processing your text: ");
    echo($_POST['myText']);
    echo("</p>");
}
?>
</body>
</html>
```

下面的代码可以将数据提交代码十三中的表单，你可以试着将表彰十三中的内容放到一个web服务器中，再将下面的代码放到你的桌面，再来进行提交（需要个性action和具体的控件名才可以直接看到效果）。

**代码十四：一个用于提交数据的表单**

```php
<html>
<head>
<title>Collecting your data</title>
</head>
<body>
<form action="processStuff.php" method="post">
<select name="answer">
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
<input type="submit" value="Save" name="submit" />
</form>
</body>
</html>
```

不要以为在表单中使用下拉菜单、单选按钮、复选框或者其它对输入进行限制的方法真的会有效，尤其是对于欺骗表单，这些根本不值一提。下面的代码就是包含有非法字符的一次提交。

**代码十五：含有非法数据的表单**

```html
<html>
<head>
<title>Collecting your data</title>
</head>
<body>
<form action="http://path.example.com/processStuff.php" 
    method="post"><input type="text" name="answer"
    value="There is no way this is a valid response to a yes/no answer..." />
<input type="submit" value="Save" name="submit" />
</form>
</body>
</html>

```

如果你以为有了下拉菜单单选按钮这些小玩意儿，或者你有什么其它的js验证，总之可以保证用户不会输入非法的值，就以为可以不用对输入的数据进行验证，那就得想你下那些准备对你的页面进行表单欺骗攻击的人该是有多高兴吧。想要防止表单欺骗，有个办法倒值得一试，那就是使用一次性令牌，并且，每次表单加载，都更换掉令牌。当然，这也不能绝对防止表单欺骗，攻击者依然可以先请求你的表单，然后过滤出你的令牌，并将令牌包含到自己伪造出来的表单数据中。但毕竟大大的增加了进行表单欺骗的难度。使用令牌使得代码十四中的那种静态页面已经不可能再进行提交了。下面的代码实现了一个简单的表单令牌。

**代码十六：使用一次性令牌**

```html
<?php
session_start();
?>
<html>
<head>
<title>SQL Injection Test</title>
</head>
<body>
<?php
echo 'Session token=' . $_SESSION['token'];
echo '<br />';
echo 'Token from form=' . $_POST['token'];
echo '<br />';
if ($_SESSION['token'] == $_POST['token']) {
    /* cool, it's all good... create another one */
} else {
    echo '<h1>Go away!</h1>';
}
$token = md5(uniqid(rand(), true)); 
$_SESSION['token'] = $token; 
?>
<form id="myFrom" action="<?php echo $_SERVER['PHP_SELF']; ?>"
    method="post">
<div><input type="hidden" name="token" value="<?php echo $token; ?>" />
<input type="text" name="myText"
    value="<?php echo(isset($_POST['myText']) ? $_POST['myText'] : ''); ?>" />
<input type="submit" name="submit" value="Save" /></div>
</form>
</body>
</html>

```

### 7、防范CSRF（Cross-Site Request Forgeries）

CSRF，伪造跨站请求，主要是冒充受信任的用户，并利用用户本身具有的权限而进行的攻击，而这个用户在不经意间就变成了“共犯”。下面的代码示范了如何在页面中包含一个动作，这个页面会从cookie中读取用户的登陆信息，只要cookie中的值是有效的，那被包含的页面将会处理这个请求。

**代码十七：一个CSRF示例**

```html
<img src="http://www.example.com/processSomething?id=123456789" alt="" />
```

CSRF攻击一般隐藏在img标签中，因为浏览器会根据img中src的值来请求相应的图片或者页面。img标签同样可以用于xss攻击中，用户可以轻易的做一些动作而不让验证机制发现——这就是伪造。

要想防范CSRF攻击，一是在验证表单时使用一次性令牌，二是尽量使用$_POST获取输入变量，不要使用$_REQUEST，下面的代码示例中，使用get提交都可以轻易的进行伪造。

**代码十八：从$_REQUEST获取数据**

```html
<html>
<head>
<title>Processes both posts AND gets</title>
</head>
<body>
<?php
if ($_REQUEST['submit'] == 'Save') {
 echo("I am processing your text: ");
 echo(htmlentities($_REQUEST['text']));
 echo("...");
}
?>
</body>
</html>
```

下面的代码则限制了只能使用POST方法来提交数据。

**代码十九：仅从$_POST获取数据**

```html
<html>
<head>
<title>Processes both posts AND gets</title>
</head>
<body>
<?php
if ($_POST['submit'] == 'Save') {
 echo("I am processing your text: ");
 echo(htmlentities($_POST['text']));
 echo("...");
}
?>
</body>
</html>
```

### 结论

在写php的时候陪着上面的七个安全习惯，将可避免让你的程序轻易成为一个被攻击的受害者。像所有的习惯一样，刚开始总感觉有些蹩脚，慢慢的就变得自然而然了。

记住第一点最重要的，验证输入的值，当你确定输入的值没有问题后，接着就要保护你的文件系统、数据库和会话变量。最后，确保你的php代码能够一定程序的防范XSS攻击、表单欺骗以及CSRF。遵循这个方法陪养编程习惯，过段时间你将可抵御简单的攻击。


### 后记

博客到Hexo后，对本文的代码格式做了调整，本想从原文中复制代码段，但悲剧的是IBM Developer Works上已经找不到这篇文章了，在Google上检索，也只找到简介和引导（[1](http://www.phpdeveloper.org/news/11125)，[2](http://www.linuxtoday.com/developer/2008100100435OSSWDV)，[3](http://www.webappers.com/2008/10/09/seven-habits-for-writing-secure-php-applications/)）到原文的连接。最后在大[CSDN博客](http://blog.csdn.net/dux003/article/details/6783495)和大[新浪博客](http://blog.sina.com.cn/s/blog_5cdc071b0100b6mh.html)上找到了原文，不过，只有到代码段16的部分。