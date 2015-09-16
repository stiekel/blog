title: "AngularJS常用插件与指令收集"
date: 2015-06-01 18:21:23
tags:
  - AngularJS
  - JavaScript
categories:
  - 编程杂记
---

使用AngularJS有差不多一年时间了，前前后后也用了不少库和指令，整理了一下，分成四大类列出。有demo地址的，就直接连接到demo地址，其它的直接链到github托管库中。

### 图片视频类
*   [angular-maxonry](http://passy.github.io/angular-masonry/) 图片墙效果插件，可以将图片组织成类似于瀑布流的效果，依赖于jQuery、[imageloaded](http://imagesloaded.desandro.com/)和[Masonry](http://masonry.desandro.com/)
*   [angular-deckgrid](http://andrekoenig.info/angular-deckgrid/#/) 另一个照片瀑布流解决方案
*   [ngImgCrop](https://github.com/alexk111/ngImgCrop) 图片剪裁工具
*   [ngVideo](https://github.com/Wildhoney/ngVideo) 播放器，直接播放指定地址的mp4，控制按钮美观度远甩朝内99.99%的视频站

### 输入控件类
*   [ngDraggable](https://github.com/fatlinesofcode/ngDraggable) 控制元素拖动的控件，[Demo](http://htmlpreview.github.io/?https://github.com/fatlinesofcode/ngDraggable/blob/master/example.html)
*   [angular-umeditor](https://github.com/YinChangSheng/angular-umeditor) 百度umeditor的AngularJS扩展，umeditor从界面上讲并不够现代化，但却总有人喜欢它
*   [ngAutocomplete](https://github.com/wpalahnuk/ngAutocomplete) 喜闻乐见的自动补完
*   [textAngular](http://textangular.com/) 文本编辑器，更简洁，更漂亮
*   [ngTagsInput](http://mbenford.github.io/ngTagsInput/) 以标签的方式来组织输入
*   [Angular-slider](http://prajwalkman.github.io/angular-slider/) 以拖动方式输入值的控件
*   [Angular Slidezilla](http://itslenny.github.io/angular-slidezilla/) 与Angular-slider功能一样，只不过设计风格不一样
*   [Checklist-model](https://vitalets.github.io/checklist-model/) AngularJS 多选框输入的值处理得并不好，通过这个指令，可以方便的将多选框的值直接组织成数组（更新于2015-9-16）

### 界面类
*   [ui-bootstrap](https://angular-ui.github.io/bootstrap/) 官方扩展，在AngularJS中方便的以指令的方式使用[Bootstrap](http://getbootstrap.com/)
*   [ui-map](http://angular-ui.github.io/ui-map/) 用于在页面中集成Google Maps
*   [NG-Grid](http://angular-ui.github.io/ng-grid/) 官方提供的表格插件，支持表格的主题、排序、直接编辑、多行选择等操作，而且使用非常简单，只需要一行HTML代码，但是，比较难看，适合于不讲究外观但要求功能强大的场合，像后台工具、管理系统之类
*   [angular-table](http://samu.github.io/angular-table/examples/examples.html) 第三方表格工具，适合于需要对表格进行高度定制的场合
*   [ng-table](http://ng-table.com/#/) 在易用性和外观上对上面两个进行折衷的解决方案
*   [AngularUI](https://angular-ui.github.io/) 上面的ui-bootstrap、ui-map就是它的一部分，官方提供的常用扩展集，除了这两个，还有ui-router、ui-select等，注意，它使用的是Bootstrap 2.x
*   [Adapt-Strap](http://adaptv.github.io/adapt-strap/) 第三方Bootstrap插件，而且是基于扁平化的Bootstrap 3，更美观
*   [ng-polymer-elements](https://gabiaxel.github.io/ng-polymer-elements/) [Polymer](https://www.polymer-project.org/1.0/)风格的AngularJS指令，Material Design设计，值得尝试
*   [Angular Loading Bar](http://chieffancypants.github.io/angular-loading-bar/) 可用于在页面顶部增加一个漂亮的进度条
*   [angular-busy](http://ngmodules.org/modules/angular-busy) 与Angular Loading Bar有点类似，主要用于处理$http通信时候的动画
*   [ngInfiniteScroll](http://ngmodules.org/modules/ngInfiniteScroll) 从名字可以看出来，它是一个用于组织瀑布流和时间线的扩展
*   [ngScrollTo](https://github.com/iameugenejo/ngScrollTo) 页内滚动工具，可以将页面滚动到指定id的元素位置
*   [ngDialog](http://likeastore.github.io/ngDialog/#) 比Bootstrap更简单，更好用，更漂亮的网页对话框
*   [Angular Treeview](https://github.com/eu81273/angular.treeview) 树状目录组织扩展，使用相当方便，而且不依赖于jQuery
*   [angular-growl](https://github.com/Marcorinck/angular-growl) 用于在页面上显示警告框，可以设置显示时间，还可以直接显示$http中收到的警告
*   [angular-truncate](http://sparkalow.github.io/angular-truncate/) 当文字过多过长时，显示部分文字的插件，可以按文字总长度来控制，也可以按单词数量来控制

### 其它工具类
*   [angular-translate](https://angular-translate.github.io/) AngularJS的i18n扩展
*   [Satellizer](https://satellizer.herokuapp.com/) 可以方便的在AngularJS中集成第三方账号登陆，支持国际主流社交网站账号，支持协议有OAuth 1.0/2.0
*   [ngStorage](https://github.com/gsklee/ngStorage) 本在存储插件，用于处理localStorage和sessionStorage
*   [ng-csv](https://github.com/asafdav/ng-csv) 导出csv的扩展
*   [angular-once](https://github.com/tadeuszwojcik/angular-once) 双向绑定虽然方便，但如果数据太多，会造成一些性能问题。`angular-once`的解决方案是，对于不涉及到修改的数据，不要使用双向绑定，而是使用`angular-once`提供的`once-text`、`once-src`等等。（网页[蔡斯杰](http://t.qq.com/sijie_cai)提供，更新于2018-8-3）