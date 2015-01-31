title: Sliverlight for WP7 中WebBrowser控件对js和css的支持性总结
tags:
  - WP7
id: 1471
categories:
  - 编程杂记
date: 2011-07-06 09:09:18
---

最近因为工作上的原因，重拾C#做一个Windows Phone 7的客户端应用，虽然半途而废，不过也在碰摔中了解到了WP７的确是一个仓促之作，尤其是对于开发人员而言。

在应用中展示html或者远程网页，SliverLight for Windows Phone提供了一个叫[WebBrowser](http://msdn.microsoft.com/en-us/library/microsoft.phone.controls.webbrowser_members(v=VS.92).aspx "WebBrowser Members")的控件。在使用这个控件的过程中，发现了一个哭笑不得的问题：应用无法直接使用其内部的各类资源，无论是html还是图片，必须先得将这些复制到手机上，再从手机上读取后使用！天哪！亏WP7 SDK的开发人员想得出来，你看到[这篇MSDN文章](http://msdn.microsoft.com/en-us/library/ff431811(v=VS.92).aspx "How to: Display Static Web Content Using the WebBrowser Control for Windows Phone")的时候一定会崩溃，不过我已经不是第一个[遇到这种情况的人了](http://technodave.wordpress.com/2010/11/11/moving-files-from-xap-to-isolated-storage-for-local-html-content-on-windows-phone-7/ "Moving Files from XAP to Isolated Storage for Local HTML Content on Windows Phone 7")。

WebBrowser控件在默认的情况下，是不支持JavaScript的，若需要对其进行支持，需要设置其IsScriptEnabled为true，但要命的是，设置之后，只有在下一次打开页面的时候才会生效。

经测试，当html是从手机的独立存储中读取时，无论CSS是在手机内，还是在远程服务器上，均可正常支持。JavaScript同样如此。当html位于远程服务器中时，js可以是来自另外的远程服务器。

但致命的问题是，当WebBrowser控件中的内容有鼠标点击动作时，整个控件（还包括其它的输入性控件，如TextBox或者RadioButton）均有闪烁的情况！！这预示着大部分的html5游戏是没办法简单的移植了。

另外，对于WebBrowser中的内容，无法设置其x和y坐标，也无法设置其缩放比例！这点很是蛋疼。

看来，Android和iOS的确让Microsoft慌了手脚，NOKIA就不用说了。