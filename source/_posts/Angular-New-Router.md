title: Angular2路由模块简介
date: 2015-06-7 15:19:08
tags:
  - AngularJS
  - JavaScript
categories:
  - 编程杂记
---

Angular2虽然还没有正式发布，但全新设计的路由模块已经提前面世，它从AngularJS 1.4开始支持。相对于老的`ngRoute`，使用更方便，配置更简单，更加注重约定。新的路由模块被命名为[Angualar New Router](https://github.com/angular/router)，以前的`ui-view`被新的`ng-viewport`取而代之，另外引入了`component`的概念。我们用一个例子来对它做一个简单的了解。

先放[代码](https://coding.net/u/Stiekel/p/static/git/tree/master/public/angular-new-router)和[DEMO](http://stiekel.coding.io/angular-new-router/#/)。

<!--more-->

### 基础代码

先来构建基础的HTML和JS代码，[index.html](https://coding.net/u/Stiekel/p/static/git/blob/master/public/angular-new-router/index.html)代码如下：

```html
<!DOCTYPE html>
<html>
<head>
  <title>Angular New Router Test</title>
</head>
<body ng-app="webApp" ng-controller="AppController as app">
  <div class="container">
    <ng-viewport></ng-viewport>
  </div>

  <script src="../lib/angular2/angular.js"></script>
  <script src="../lib/angular-new-router/dist/router.es5.js"></script>
  <script src="./app.js"></script>
</body>
</html>
```

然后是AngularJS基础代码，[app.js](https://coding.net/u/Stiekel/p/static/git/blob/master/public/angular-new-router/app.js)：

```js
'use strict';

angular.module('webApp', ['ngNewRouter'])
  .controller('AppController', ['$router', AppController]);

AppController.$routeConfig = [
];

function AppController ($router) {
}
```

### 构件`component`

AngularJS 1.3之前，在配置一个路由页面时，一般会包括一个HTML模板，一个控制器和一套路由配置。路由配置中，要指定相应的HTML模板和控制器名称。在新的路由策略中，这些被构件（`component`）所取代，一个构件包括以下几部分：

*  独立的目录，目录名就是构件名
*  目录内，与目录同名的一个js文件，用它来存储模块和控制器代码
*  目录内，与目录同名的HTML文件

比如，像下面这样：

```sh
home/
├── home.html
└── home.js
```

单从上面这几部分来讲，可能看不出来构件的优势，但在路由配置的时候，你根本不用指定HTML文件，也不用指定控制器名字，只需要直接使用构件名——也就是目录名就行了。像这样：

```js
  {path: '/', component: 'home'}
```

配置的代码简化了许多，而你所需要做的，就是遵循约定，使用约定来取代配置。先来看看`home.js`文件，它包括控制器和模块代码：

```js
angular.module('webApp.home', [])
  .controller('HomeController', ["$router", HomeController]);

function HomeController($router) {
  this.AppName = 'Angular New Router示例';
}
```

终于不再`$scope`满天飞了，控制器更符合面向对象的概念，使用了`this`。以前在HTML中，是直接使用控制器内的变量，再在，需要指定构件名了，如下：

```html
<div class="page-header">
  <h3>{{home.AppName}}</h3>
</div>
```

构件的js文件，需要使用`<script>`来导入，另外还要在`app.js`的主模块中，加入对构件模块的依赖，如下：

```js
angular.module('webApp',
    ['ngNewRouter', 'webApp.home', 'webApp.articles']
  )
  .controller('AppController', ['$router', AppController]);
```

在上面的`index.html`文件中，曾经为BODY元素指定了控制器：

```html
<body ng-app="webApp" ng-controller="AppController as app">
</body>
```

如果要使用`AppController`中的变量，则需要像下面这样：

```html
  <span>{{app.AppName}}</span>
```

### 路由的配置

`ngRoute`中的路由配置，结构还是比较复杂的——反正我每次都是从现成的路由配置文件复制过来，不然可真记不住。但新的路由模块配置，相当简单方便，其实刚刚我们已经看过一行了，再来看看完整的代码：

```js
AppController.$routeConfig = [
  {path: '/', component: 'home'}
];
```

没错，直接设置控制器的属性就行了。还可以在控制器代码内配置：

```js
function AppController($router) {
  $router.config([
    {path: '/index', redirectTo: '/'}
  ]);
}
```

以前的`url`属性，现在叫`path`了，单从字面意思上讲，其实用`path`更准确。如果要设置某个路由直接跳转到另外一个，使用`redirectTo`即可：

```js
AppController.$routeConfig = [
  {path: '/', component: 'home'},
  {path: '/index', redirectTo: '/'}
];
```

当然，你也可以直接设置别名：

```js
  {path: '/', component: 'home', as: 'home'}
```

基本上，一个路由只需要一条无需换行的代码便可以配置完成了。

### 指向路由的链接

`ngRoute`中是使用`ui-sref`来创建链接，现在增加了一个`ng-link`，虽然名字变了，但用法其实差不多，使用如下：

```html
  <a ng-link='index' class="navbar-brand">Angular2的路由</a>
```

### `ng-viewport`

实在不知道这个`viewport`怎么个翻译，查了下[有道](http://dict.youdao.com/search?q=viewport)，居然叫视口——好吓人的感觉。

其实，它和以前的`ui-view`差不多，用法如下：

```html
  <ng-viewport></ng-viewport>
  <div ng-viewport></div>
  <div ng-viewport="content"></div>
```

这三种都行。最后一种用于有多个构件需要加载的情况。

### 路由参数

路由参数和以前相比，没什么变化，它在路由中的配置如下：

```js
  {path: '/articles/:id', component: 'articles'}
```

在控制器中，也还是使用`$routeParams`，如下：

```js
angular.module('webApp.articles', [])
  .controller("ArticlesController", ['$routeParams', '$router', ArticlesController]);

function ArticlesController($routeParams, $router){
  this.id = $routeParams.id || 0;
}
```

链接的格式也没有变化，仍然使用：

```html
  <li><a ng-link='articles({id: 1})'>AngularJS常用插件与指令收集</a></li>
```

打完收功。