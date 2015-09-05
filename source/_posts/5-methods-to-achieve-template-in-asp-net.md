title: ASP.NET中五种实现模板功能的方法
tags:
  - ASP.NET
id: 1264
categories:
  - 编程杂记
date: 2011-02-23 14:48:08
---

在追求风格一致的项目中，无论是UI设计还是程序代码，都希望尽量更多的重用，一来修改方便，二来提高效率。对于WEB程序实现，设计的重用更多的时候也是代码的重用，在完成前期的工作后，如果后期能够模套用模板一样来进行，那将大大利于项目的进行。

为了能够实现模板这个功能，在ASP.NET 1.x中提供了用户控件（User Control），到了ASP.NET 2.0还出现了母版（Master Page），除此之外，还有三种方法可以达到类似的目的，具体实现却各有优点。

### 一、抄在前面

有一回对我说道，“你读过书么？”我略略点一点头。他说，“读过书，……我便考你一考。茴香豆的茴字，怎样写的？”我想，讨饭一样的人，也配考我么？便回过脸去，不再理会。孔乙己等了许久，很恳切的说道，“不能写罢？……我教给你，记着！这些字应该记着。将来做掌柜的时候，写账要用。”我暗想我和掌柜的等级还很远呢，而且我们掌柜也从不将茴香豆上账；又好笑，又不耐烦，懒懒的答他道，“谁要你教，不是草头底下一个来回的回字么？”孔乙己显出极高兴的样子，将两个指头的长指甲敲着柜台，点头说，“对呀对呀！……回字有四样写法，你知道么？”我愈不耐烦了，努着嘴走远。孔乙己刚用指甲蘸了酒，想在柜上写字，见我毫不热心，便又叹一口气，显出极惋惜的样子。

——周树人《[孔乙己](http://zh.wikisource.org/zh-hans/%E5%AD%94%E4%B9%99%E5%B7%B1)》·1919年

### 二、实现方法

为了方便理解，在这里将分别使用这五种方法来完成如下的内容的页面，页面分为三部分，上半部分为header，下半部分为footer，要求将这两部分模板化，具体各页面只需要对中间的内容进行指定即可。本文最末提供了所有源代码的下载。<!--more-->

[![aoisola](/upfile/2011/02/TemplateTest_site_shutcat.png "aoisola")](/upfile/2011/02/TemplateTest_site_shutcat.png)

#### 1、使用母版方法实现

母版是在ASP.NET 2.0以后才出现的，使用母版时，相当于将页面的整体结构先构架出来，将各个页不同的位置放置一个contentplaceholder控件，并用ID区别之，套用母版时，只需要声明来自某母版，然后将区别于其它页的部分用Content控件组织起来，再指出它应该出现的位置的contentplaceholder ID，即可完成设计。

母版页就像是在一个完成的页面中挖空，然后在具体页面设计时再填空。空的个数可以在母版页中进行定义。

在Visual Studio 2005中新建一个网站，为了方便，我们将对各部分的样式独立一到个样式表中，在解决方案管理器中添加一个新项，模板中选择样式表，命名为style.css，内容如下：
```css
body {
background-color:#bbb;
}

#header {
  background-color:#aaa;
  text-align:center;
}

#footer {
  background-color:#aaa;
  text-align:left;
}
```
再在解决方案管理器中添加一个新项，模板选择“母版页”，命名为TestMasterPage.master，切换到“源视图”，在<head>和</head>中添加如下一行，以引用样式表：

```html
<link href = "style.css" rel = "stylesheet" type = "text/css" />
```

然后在<form>和</form>之间添加如下代码：
```html
<div>
  <div id="header">
    <h2>Template Test ASP.NET Site</h2>
    <hr />
  </div>
  <asp:contentplaceholder id="testContentPlaceHolder" runat="server">
  </asp:contentplaceholder>
</div>
<div id="footer">
  <hr />
  <a href="javascript:history.go('-1')">Back</a|
  <a href = "default.aspx" >HomePage</a|
  <a href = "javascript:history.go('1')">Next</a>
</div>
```
其中<asp:contentplaceholder...>就是在引用母版页的其它页中可以指定内容的位置。

再在解决方案管理器中添加一个新项，模板中选择“Web窗体”，文件名为“TemplateByMasterPage.aspx”，并勾选“选择母版页”，点击“添加”后选择刚刚新建的母版页TestMasterPage.master。切换到源视图，添加如下代码：
```aspnet
<asp:Content ID="Content1" ContentPlaceHolderID="testContentPlaceHolder" Runat="Server">
  <p>
    This page achiveve by masterpage.
    <br /> MasterPage: <strong>TestMasterPage.master</strong>
  </p>
</asp:Content>
```
这便在母版页的指定位置实现了区别化的部分。

#### 2、使用用户控件实现

在ASP.NET一出现便提供了用户控件，它的目的是为了让用户将多个经常固定出现的控件或者代码，封装起来组织成一个新的引用单位，用户控件的目的是为了便于用户掌握模块粒度，在模块的耦合与内聚之间进行平衡。

相对于母版的填空，控件更像是组装。

由于我们要实现的页面具有三个部分，有两个部分需要模板化，那就需要新建两个用户控件。

在解决方案管理器中添加一个新项，模板选择“Web用户控件”，命名为TemplateByUserControl_header.ascx，然后在源视图中添加如下代码：

```html
<div id="header">
  <h2>Template Test ASP.NET Site</h2>
  <hr />
</div>
```

再添加另外一个用户控件，命名为TemplateByUserControl_footer.ascx，添加如下代码：
```html
<div id = "footer" >
  <hr />
  <a href = "javascript:history.go('-1')">Back</a|
  <a href = "default.aspx" >HomePage</a|
  <a href = "javascript:history.go('1')">Next</a>
</div>
```
两个用户控件便添加完成了。在解决方案管理器中添加一个Web窗体新项，命名为TemplateByUserControl.aspx，在<%@ Page ...%>行后添加如下两行，用以注册刚刚建立的两个用户控件：

```asp
<%@ Register Src="TemplateByUserControl_footer.ascx" TagName="TemplateByUserControl_footer" TagPrefix="uc_footer" %>
<%@ Register Src="TemplateByUserControl_header.ascx" TagName="TemplateByUserControl_header" TagPrefix="uc_header" %>
```

这便完成了用户控件的引用，然后在页面的<head>部分中添加对样式表的引用。再在<form>中添加如下的代码：

```asp
<uc_header:TemplateByUserControl_header ID="id_uc_header" runat="server" />
<p>
This Page Achieve by UserControls.<br />
UserControls: <strong>TemplateByUserControl_header.ascx</strongand <strong>TemplateByUserControl_footer.ascx</strong>
</p>
<uc_footer:TemplateByUserControl_footer ID="id_uc_footer" runat="server" />
```

这便并两个用户控件安放到了页面中指定的位置。

#### 3、利用Response.WriteFile来直接输出html文件

Response.WriteFile方法可以直接将某个文件输出到发给浏览器的HTML代码中，其实它与Response.Write功能极其相似，只是其输出到HTML代码中的内容来源不一样而已。

和用户控件一样，这两部分需要两个Response.WriteFile语句来分别输出，而它们又来处于两个不同的HTML页。
在解决方案管理器中添加一个新项，在模板中选择“文本文件”，命名为header.inc，输入如下代码：

```html
<div id = "header">
<h2>Template Test ASP.NET Site</h2>
<hr />
</div>
```

再新建另外一个文本文件，命名为footer.inc，代码内容如下：

```html
<div id = "footer" >
<hr />
<a href = "javascript:history.go('-1')">Back</a|
<a href = "default.aspx" >HomePage</a|
<a href = "javascript:history.go('1')">Next</a>
</div>
```

再在解决方案管理器中添加一个新项，在模板中选择“Web窗体”，命名为TemplateByWriteFile.aspx。再在<form>中添加如下代码：

```asp
<% Response.WriteFile("header.inc"); %>
<p>
This page achieve by Response.WriteFile Method.<br />
INC file: <strong>header.inc</strong>  and <strong>footer.inc</strong>
</p>
<% Response.WriteFile("footer.inc"); %>
```

注意在页的<head>中添加对样式表的引用，即可实现。

#### 4、通过使用Include添加ASPX文件的方法实现

利用Response.WriteFile是直接输出HTML代码，而通过include方法则可以向ASPX页中添加ASPX代码，这是从ASP中继承来的方法。
需要注意的是，使用这个方法相当于把一个ASPX文件的所有代码添加到另外一个ASPX文件中的指定位置，而很多东西在一个ASPX文件中只有能一个，比如<$@ Page ...$>行，还有比如带有runat="server"属于的<form>，因此要特别注意，插入的文件中最好不要出现这些内容。

使用下面的代码可以插入ASPX代码到文件中：

```asp
<!--#include file = "TemplateByIncludeASPXfile_header.aspx" -->
```

具体的实现方法与Response.WriteFile类似。

#### 5、通过iframe方法实现

iframe使得可以在一个ASPX页中插入另外一个ASPX页，但这并不是相当于把多个页的ASPX代码直接组合，只有在被请求时，被组合的页各自独立的运行并生成HTML代码，然后再把HTML代码进行组合。因此，各个ASPX页中都可以有各自的<%@ Page... %>和带有runat = "server"的form。

具体的实现方法也比较简单，只要有HTML基础即可，例如，如下的代码可以进行ASPX页的iframe插入：

```html
<iframe id="header"  frameborder ="0" style = "width:100%; height:100px" src = "TemplateByIframe_header.aspx"></iframe>
```

### 三、各方法的优点

母版页功能最为强大，可以建立一个供其它页进行填充的框架结构。而用户控件则可以将多行代码或者控件进行组合，类似于一个容器。Response.WriteFile可以将小段的HTML代码进行直接的输出，include则可以将ASPX代码进行组合。虽然iframe是一个令人厌恶的结构，但却可以简单粗暴的组合多个ASPX页。

### 四、代码打包下载

[源代码下载](http://chensd.com/2011-02/5-methods-to-achieve-template-in-asp-net.html/templatetest)（14KB）

下载代码压缩包后，可将其解压，再在IIS中映射一个虚拟目录，即可实现浏览。default.aspx是一个导航页。