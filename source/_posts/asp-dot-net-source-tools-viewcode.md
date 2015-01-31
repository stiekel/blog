title: ASP.NET源码阅读小工具：ViewCode
tags:
  - ASP.NET
  - 下载
id: 1284
categories:
  - 下载
  - 编程杂记
date: 2011-02-28 03:02:35
---

最近几天看了不少源码，因为源码存在笔记本上，而有时候却要从另外一个电脑上看，于是折腾了一个小工具，以从其它的机器上方便的使用浏览器看ASP.NET的源码，闲着也是闲着，就放到了这里来。

[![ViewCode.aspx](/upfile/2011/02/View_ASPNET_Page_Code.png "ViewCode.aspx")](/upfile/2011/02/View_ASPNET_Page_Code.png)
工具分为两个aspx页面和一个inc文件，功能分别是：

*   ViewCode.aspx：查看其所在文件夹及子目录内所有ASP.NET文件的源码，支持的文件类型包括aspx、master、ascx、htm、html、css、aspx.cs、txt、config；
*   AddViewCodeLink.aspx：给其当前文件夹及子目录内所有aspx文件末尾添加一段代码，实现对ViewCode.inc的引用，表现上是添加一个ViewCode超链接；
*   ViewCode.inc：这是添加到aspx文件末尾的一段代码，作用是向ViewCode.aspx传入当前文件的绝对路径，以在ViewCode.aspx中显示其代码；<!--more-->
[![AddViewCodeLink.aspx](/upfile/2011/02/Add_ViewCode_Link.png "AddViewCodeLink.aspx")](/upfile/2011/02/Add_ViewCode_Link.png)
使用很简单，将其放到aspx源码所在文件夹即可。

[ViewCode源码下载](http://chensd.com/2011-02/asp-dot-net-source-tools-viewcode.html/viewcode_aspnet)