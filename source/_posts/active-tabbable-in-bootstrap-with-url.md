title: 使用URL直接激活Bootstrap中的tabbable
tags:
  - jQuery
id: 1571
categories:
  - 编程杂记
date: 2013-08-05 02:41:14
---

[Bootstrap](http://getbootstrap.com/2.3.2/index.html "Bootstrap 2.3.2")中的[tabbable](http://getbootstrap.com/2.3.2/components.html#navs "Tabbable")的确很好用，但是，tab-content不能直接使用url来定位，只能通过鼠标点击来激活。这成了一个限制，不过通过jquery可以轻松的来使用URL直接定位到tabbable中某个tab-content。

如果要实现通过URL来定位相应的tabbable的内容，那需要改变如下几个内容：

*   删除现有导航和tab-content中class的active值
*   为相应的导航控制添加一个active的class值
*   为相应的tab-content添加一个active的class值
下面的这个js函数可以实现如上的几个操作：

```javascript
function navigateToTab() {
    var TabId = window.location.hash.replace('#', '');
    var isTabExists = ($(&quot;.tabbable li:contains('&quot; + $(&quot;a[href=#&quot; + TabId + &quot;]&quot;).html() + &quot;')&quot;).html());
    if(TabId &amp;&amp; undefined != isTabExists) {
        //高亮相关连接
        $(&quot;.tabbable ul li&quot;).removeClass('active');
        $(&quot;.tabbable li:contains('&quot; + $(&quot;a[href=#&quot; + TabId + &quot;]&quot;).html() + &quot;')&quot;).addClass('active');
        //呈现相关内容（tab-content）
        $(&quot;.tab-content .tab-pane&quot;).removeClass('active');
        $(&quot;#&quot; + TabId).addClass('active');
    }
}
```

将上面的函数，放到通用的js文件中，即可在URL后加#和相应的tab-content id来实现定位了。

更新：代码中增加了判断，只有#后面跟的tab-content id存在的时候，才进行相应的激活操作。