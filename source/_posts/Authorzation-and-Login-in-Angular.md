title: Angular应用中的登录与身份验证
date: 2016-07-10 07:34:34
tags:
  - JavaScript
  - 前端
  - AngularJS
categories:
  - 编程杂记
---

Angular 经常会被用到后台和管理工具的开发，这两类都会需要对用户进行鉴权。而鉴权的第一步，就是进行身份验证。由于 Angular 是单页应用，会在一开始，就把大部分的资源加载到浏览器中，所以就更需要注意验证的时机，并保证只有通过了验证的用户才能看到对应的界面。

<!-- __提示__：阅读本篇文章需要对 Angular 有基本的了解。 -->

## 功能边界

本篇文章中的身份验证，指的是如何确定用户是否已经登录，并确保在每次与服务器的通信中，都能够满足服务器的验证需求。注意，并不包括对具体是否具有某一个权限的判断。

对于登录，主要是接受用户的用户名密码输入，提交到服务器进行验证，处理验证响应，在浏览器端构建身份验证数据。

## 实现身份验证的两种方式

目前，实现身份验证的方法，主要有两个大类：

### Cookies

传统的浏览器网页，都是使用 Cookies 来验证身份，实际上，浏览器端的应用层里，基本不用去管身份验证的事情，Cookies 的设置，由服务器端完成，在提交请求的时候，由浏览器自动附加对应的 Cookies 信息，所以在 JavaScript 代码中，不需要为此编写专门的代码。但每次请求的时候，都会带上全部的 Cookies 数据，

随着 CDN 的应用，移动端的逐渐兴起， Cookies 越来越不能满足复杂的、多域名下的身份验证需求。

### 密钥

实际上基于密钥的身份验证并不是最近才兴起，它一直存在，甚至比 Cookies 历史更长。当浏览器在请求服务器的时候，将密钥以特定的方式附加在请求中，比如放在请求的头部（ headers ）。为此，需要编写专门的客户端代码来管理。

最近出现的基于 JSON 的 Web 密钥（JSON Web Token）标准，便是典型的使用密钥来实现的身份验证。

在 Web 应用中，如果是构造 API ，则应优先考试使用密钥方式。

## 处理登录

登录是身份验证第一步，通过登录，才能够组织起来对应的身份验证数据。

### 需要使用单独的登录页吗？

登录页的处理，有两种方式：

* __单独的登录页__，在登录完成后，跳转到单页应用之中，这样做可以对单页应用的资源进行访问控制，防止非登录用户访问，适合后台或者管理工具的应用场景。但实际上降低了单页应用的用户体验
* __在单页应用之内执行登录__，这样更符合单页应用的设计理念，比较适合大众产品的场景，因为恶意的人总是能够拿到你单页应用的前端代码

### 单独的登录页

一般情况下，使用单独的登录页的目的在于保护登录后跳转的页面不被匿名用户访问。因此，在登录页里，构造一个表单，直接采用传统的表彰提交方式（非 Ajax），后端验证用户名密码成功后，输出登录后单面应用页面的 HTML 。

在这种情况下，可以直接将身份验证信息放在输出的 HTML 里，比如，可以使用 Jade 构造一个这样的页面：

```js
<!-- dashboard.jade -->
doctype html
html
  head
    link(rel="stylesheet", href="/assets/app.e1c2c6ea9350869264da10de799dced1.css")
  body
    script.
      window.token = !{JSON.stringify(token)};
    div.md-padding(ui-view)
    script(src="/assets/app.84b1e53df1b4b23171da.js")

```

后端在用户名密码验证成功之后，可以采用如下的方式来渲染输出 HTML ：

```js
return res.render('dashboard', {
  token: token
});
```

Angular 应用一启动，便可以进行需要使用身份验证的通信。而且还保证了只有登录成功的用户才可以进入这个页面。

### 单页应用内登录的组织

对于多视图的 Angular 应用，一般会采用路由，在页面之内，一般有固定的侧边栏菜单，或者顶部导航菜单，正文区域由路由模块来控制。

下面的示例代码，使用的是 [Angular Material](https://material.angularjs.org/latest/) 来组织页面，路由模块使用的是 [ui-router](https://github.com/angular-ui/ui-router) 。在应用打开的时候，有专门的加载动画，加载完成之后，显示的页面，使用 `AppController` 这个控制器，对于没有登录的用户，会显示登录表单，登录完成之后，页面分为三大部分，一是顶部面包屑导航，二是侧边栏菜单，另外就是路由控制的正文部分。代码如下：

```html
<body ng-app="app" layout="row">
  <div id="loading">
    <!--页面加载的提示-->
  </div>
  <div flex layout="row" ng-cloak ng-controller="AppController" ng-init="load()">
    <div ng-if="!isUserAuth", ng-controller="LoginController">
      <!--登录表单-->
    </div>
    <div ng-if="isUserAuth" flex layout="row">
      <md-sidenav flex="15" md-is-locked-open="true" class="stop-text-select bbmd-sidebar md-whiteframe-4dp">
        <!--侧边栏菜单-->
      </md-sidenav>
      <md-content flex layout="column" role="main">
        <md-toolbar class="stop-text-select md-whiteframe-glow-z1">
          <!--顶部菜单-->
        </md-toolbar>
        <md-content>
          <!--路由-->
          <div ui-view class="md-padding"></div>
        </md-content>
      </md-content>
    </div>
  </div>
</body>
```

对于 Loading 动画，是在 `AppController` 之外的，可以在 `AppController` 的代码中，对其进行隐藏。这样达到了所有 CSS / JavaScript 加载完成之后 Loading 就消失的目的。

`AppController` 中有一个变量 `isUserAuth` ，初始化的时候是 `false` ，当本地存储的会话信息验证有效，或者登录完成之后，这个值便会置为 `ture` ，由于 `ng-if` 的控制，便可以实现隐藏登录表单、显示应用内容的目的。要注意，这里只有使用 `ng-if` 而不是 `ng-show/ng-hide` ，前者才会真正的删除和增加 DOM 元素，而后者只是修改某个 DOM 元素的 CSS 属性，这点很重要，只有这样，才能够保证登录完成之后，再加载单页应用中的内容，防止还没有登录，当前路由中的控制器代码就直接执行了。

### 为什么客户端也要加密密码

一个比较理想的基于用户名和密码的登录流程是这样的：

* 浏览器端获取用户输入的密码，使用 MD5 一类的哈希算法，生成固定长度的新密码，如 `md5(username + md5(md5(password)))` ，再将密码哈希值和用户名提交给后端
* 后端根据用户名获取对应的盐，使用用户名和密码哈希值，算出一个密文，根据用户名和密文去数据库查询
* 如果查询成功，则生成密钥，返回给浏览器，并执行第 4 步
* 后端生成新的盐，根据新的盐和浏览器提交的密码哈希值，生成新的密文。在数据库中更新盐和密文

可能有 80% 的人无法理解为什么要把一个登录做得这么复杂。这可能要写一篇专门的文章才解释得清楚。在这里先解释一下为什么浏览器端要对密码做哈希，原因如下：

*  从源头上保护用户的密码，保证只有做按键记录才可以拿到用户的原始密码
*  就算网络被窃听，又没有使用 https ，那么被偷走的密码，也只是哈希之后的，最多影响用户在这个服务器里的数据，而不影响使用相同密码的其它网站
*  就算是服务器的所有者，都无法获取用户的原始密码

这种做法，使得用户的最大风险，也只是当前这个应用中的数据被窃取。不会扩大损失范围，绝不会出现 CSDN 之流的问题。

### 登录成功的通知

对于有些应用，并不是所有的页面都需要用户登录的，可能是进行某些操作的时候，才需要登录。在这种情况下，登录完成之后，必须要通知整个应用。这可以使用广播这个功能。

简易代码如下：

```js
angular
  .module('app')
  .controller('LoginController', ['$rootScope', LoginController]);

function LoginController($rootScope) {
  // 登录成功之后调用的函数
  function afterLoginSuccess() {
    $rootScope.$broadcast('user.login.success', {
      // 需要传输的数据
    });
  }
}
```

在其它的控制器中，便可以监听这个广播，并执行登录成功之后需要进行的操作，如获取列表或者详情：

```js
$scope.$on('user.login.success', function(handle, data){
  // 处理
});
```

## 身份验证信息

登录成功之后，服务器返回了密钥，之后的 API 请求都需要带上密钥，而且请求返回的响应，还需要检查是否是关于身份信息失效的错误。这一系列的工作比较繁琐，应该是自动完成才行。

### 保存

密钥的保存，大概有如下几个办法：

*  __Cookies__：前面已经提到了，这个并不推荐使用。同时，它还有最大 4k 的限制
*  __sessionStorage__：tab 页内有效，一旦关闭，或者打开了新的 tab 页，sessionStorage 是不能共享的
*  __localStorage__：较为理想的存储方式，除非清理浏览器数据，否则 localStorage 存储的数据会一直存在
*  __Angular 单例 Service__：存储在应用之内得话，刷新后数据会丢失，当然也不能 tab 页之间共享

比较好的办法是，身份验证信息存储在 localStorage 里，但在应用启动时，初始化到 Angular 的单例 Service 中。

### 在请求中加入身份验证信息

身份验证信息的目的，是为了向服务器表明身份，获取数据。所以，在请求中需要附加身份验证信息。

一般的应用中，身份验证信息都是放在请求的 headers 头部中。如果在每次请求的时候，一一设置 headers ，那就太费时费力了。Angular 中的 `$httpProvider` 提供了一个拦截器 `interceptors` ，通过它可以实现对每一个请求和响应的统一处理。添加拦截器的方式如下：

```js
angular
  .module('app')
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push(HttpInterceptor);
  }]);
```

`HttpInterceptor` 的定义方式如下：

```js
angular
  .module('app')
  .factory('HttpInterceptor', ['$q', HttpInterceptor]);

function HttpInterceptor($q) {
  return {
    // 请求发出之前，可以用于添加各种身份验证信息
    request: function(config){
      if(localStorage.token) {
        config.headers.token = localStorage.token;
      }
      return config;
    },
    // 请求发出时出错
    requestError: function(err){
      return $q.reject(err);
    },
    // 成功返回了响应
    response: function(res){
      return res;
    },
    // 返回的响应出错，包括后端返回响应时，设置了非 200 的 http 状态码
    responseError: function(err){
      return $q.reject(err);
    }
  };
}
```

拦截器提供了对发出请求到返回响应的全生命周期处理，一般可以用来做下面几个事情：

*  统一在发出的请求中添加数据，如添加身份验证信息
*  统一处理错误，包括请求发出时出的错（如浏览器端的网络不通），还有响应时返回的错误
*  统一处理响应，比如缓存一些数据等
*  显示请求进度条

在上面的示例代码中，当 localStorage 中包括 `token` 这个值时，就在每一个请求的头部，添加一个 `token` 值。

### 失效及处理

一般的，后端应该在 `token` 验证失败时，将响应的 http 状态码设置为 401 ，这样，在拦截器的 `responseError` 中便可以统一处理：

```js
responseError: function(err){
  if(-1 === err.status) {
    // 远程服务器无响应
  } else if(401 === err.status) {
    // 401 错误一般是用于身份验证失败，具体要看后端对身份验证失败时抛出的错误
  } else if(404 === err.status) {
    // 服务器返回了 404
  }
  return $q.reject(err);
}
```

其实，只要服务器返回的状态码不是 200 ，都会调用 `responseError` ，可以在这里，统一处理并显示错误。
