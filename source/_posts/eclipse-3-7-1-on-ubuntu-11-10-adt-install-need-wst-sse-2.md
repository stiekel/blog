title: Ubuntu 11.10中 Eclipse 3.7.1 安装ADT提示缺少org.eclipse.wst.sse.core
tags:
  - Android
id: 1522
categories:
  - 随手记
date: 2011-10-04 03:06:37
---

前段时间新装了Ubuntu 11.10 beta2，又使用Ubuntu Software Center下载了eclipse，版本是3.7.1，今天试着配置一下ADT，第一步就卡住了。 安装时无法进行下一步，详细信息中提示：

> Cannot complete the install because one or more required items could not be found. Software being installed: Android Development Tools 12.0.0.v201106281929-138431 (com.android.ide.eclipse.adt.feature.group 12.0.0.v201106281929-138431) Missing requirement: Android Development Tools 12.0.0.v201106281929-138431 (com.android.ide.eclipse.adt.feature.group 12.0.0.v201106281929-138431) requires 'org.eclipse.wst.sse.core 0.0.0' but it could not be found

网上搜索，[StackOverFlow](http://stackoverflow.com/questions/4249695/org-eclipse-wst-sse-core-0-0-0-but-it-could-not-be-found "org.eclipse.wst.sse.core 0.0.0")有人给出了详细答案，3.4 / 3.5 / 3.6均可解决，只需要添加org.eclipse.wst.sse.core的依赖库即可。按照3.4等的升级url构造了一下3.7的如下：

> http://download.eclipse.org/releases/ganymede/

点击Install New Software中的Add按钮，将这个添加到依赖库中，再安装ADT即可顺利进行。