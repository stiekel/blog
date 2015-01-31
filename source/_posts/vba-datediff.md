title: 2010年3月二级Access考试难点：DateDiff
tags:
  - Access
  - datediff
  - 真题
  - 计算机等级考试
id: 223
categories:
  - 考试
date: 2010-03-27 05:13:33
---

<!--more-->

27日下午更新：发布[2010年3月计算机 二级各科目公共基础部分答案](http://chensd.com/2010-03/ncre-2-201003-jichu.html)。

29日上午更新：[2010 年3月计算机二级Access全部答案发布](http://chensd.com/2010-03/ncre-2-access-201003-test-answer.html)。

29日上午更新：正在撰写各题答案解析，请稍候……

29日下午更新：[2010 年3月计算机二级Access答案详细解析已经出炉](http://chensd.com/2010-03/ncre-2-access-201003-answer-analyse.html)，另外，还可下载本次考试[二 级Access笔试各VBA程序题的示例程序](/upfile/2010/03/NCRE-2-Access-201003-Test-APP.7z)。

在本次Access考试中，有道内容大致如下的题目：
> 有一程度的代码如下：
> 
> Private Sub Command1_Click()
> 
> Dim d1As Date,d2 As Date
> 
> d1 = #2009-12-25#
> 
> d2 = #2010-1-5#
> 
> Msgbox DateDiff("ww",d1,d2)
> 
> End Sub
> 
> 当点击按钮后，输出结果为：
> 
> A：1　　　B：2　　　C：10　　　D：11
这道题目的关键在于理解DateDiff这个函数，关于这个函数的详细信息，可以在这里查看。我们简单的理解一下题目中的关键语句：
<pre>Msgbox DateDiff("ww",d1,d2)</pre>
Msgbox是弹出一个对话框，框中的显示内容为DateDiff("ww",d1,d2)的结果。其关键部分意义如下：

*   DateDiff：求两个日期之间的差值，结果是个Long
*   "ww"：求差值的单位，"ww"表示是周
所以，需要表明的意思就是，日期d1与d2之间的周数。也即2009年12月25日与2010年1月5日之间的星期间隔数。二者之差相差10天，即，两周。因此，**正确答案应该是B**。

## 连接

<div>

*   2008年3月和9月试卷下载：[http://chensd.com/2010-03/ncre-2-access-2008-test-papers.html](http://chensd.com/2010-03/ncre-2-access-2008-test-papers.html)
*   2009年3月的试卷下载：[http://chensd.com/2010-03/ncre-2-access-200903-test-papers.html](http://chensd.com/2010-03/ncre-2-access-200903-test-papers.html)
*   2009年9月的试卷下载：[http://chensd.com/2010-03/ncre-2-access-200909-test-papers.html](http://chensd.com/2010-03/ncre-2-access-200909-test-papers.html)
*   2010年3月的试卷（word版）下载：[http://chensd.com/2010-09/ncre-2-access-201003-doc.html](http://chensd.com/2010-09/ncre-2-access-201003-doc.html)
*   2010年3月公共基础题目答案与分析：[http://chensd.com/2010-03/ncre-2-201003-jichu.html](http://chensd.com/2010-03/ncre-2-201003-jichu.html)
*   2010年3月笔试题目答案分析：[http://chensd.com/2010-03/ncre-2-access-201003-answer-analyse.html](http://chensd.com/2010-03/ncre-2-access-201003-answer-analyse.html)
</div>