title: Angular 控制器之间的数据共享与通信
date: 2016-07-28 06:02:45
tags:
  - JavaScript
  - 前端
  - AngularJS
categories:
  - 编程杂记
---

AngularJS 本身已经提供了像指令 Directive 和 服务 Service 一类的方式，来实现数据和代码的共享和复用，但在实际的项目开发中，或许是处于懒惰，亦或是为了便利，总会想在两个控制器之间，直接进行数据的共享
通信，或者是函数与方法的调用，这里我们就看看有哪些方法可以满足这个要求。

## 单例服务

单例服务是 AngularJS 本身支持的数据和代码共享方式，因为是单例的，所有的控制器访问的便是同一份数据。比如，下面的 Service 便可以实现：

```js
angular
  .module('app')
  .service('ObjectService', [ObjectService]);
function ObjectService() {
  var list = {};
  return {
    get: function(id){
      return list[id];
    },
    set: function(id, v){
      list[id] = v;
    }
  };
}
```

在一个控制器中，调用 `ObjectService.set('i', 1)` 设置的数据，在其它控制器中，便可以通过  `ObjectService.get('i')` 来获取。

## 广播与事件

AngularJS 中在触发事件和发送广播时，都可以传递参数，可以通过这一特性，来实现数据的共享。与事件和广播相关的，共有三个方法，分别是：

*  `$emit()`：触发事件，它可以向上传递数据，比如，子控制器向父控制器，还有控制器向 `$rootScope`
*  `$broadcast()`：发送广播，它可以向下传递数据，比如，父控制器向子控制器传递数据，或者 `$rootScope` 向任意控制器传递数据
*  `$on()`：监听事件与广播，可以捕获 `$emit` 和 `$broadcast`

可以将控制器之间的通信，分为三种情形：

* 无直接关联的控制器：使用 `$rootScope.$emit()`、`$rootScope.$boardcast()` 或 `$scope.$emit` 来发出数据，通过 `$rootScope.$on()` 来获取数据
* 父控制器到子控制器：父控制器使用 `$scope.$boradcast()` 来发送数据，子控制器通过 `$scope.$on()` 来获取数据
* 子控制器至父控制器：子控制器使用 `$scope.$emit()` 来发送数据，父控制器通过 `$scope.$on()` 来获取数据

下面是简单的用法：

```js
// one controller
angular
  .module('app')
  .controller('OneController', ['$scope', OneController]);
function OneController($scope){
  var data = {value: 'test'};
  $rootScope.$broadcast('open.notice.editor', data);
}

// other controller
angular
  .module('app')
  .controller('AnotherController', ['$scope', AnotherController]);
function AnotherController($scope){
  $scope.$on('open.notice.editor', function(event, data){
    $scope.open(data);
    $scope.$emit('notice.editor.opened');
  });
}

```

## 父控制器

如果两个控制器共同拥有同一个父控制器，则可以通过父控制器来进行数据共享和通信。比如：

```html
<div ng-controller="ParentController">
  <div ng-controller="ChildOneController"></div>
  <div ng-controller="ChildTwoController"></div>
</div>
```

```js
// 父控制器
angular
  .module('app')
  .controller('ParentController', ['$scope', ParentController]);
function ParentController($scope){
  // 用于传递数据的变量
  $scope.data = null;
}

// 子控制器
angular
  .module('app')
  .controller('ChildOneController', ['$scope', ChildOneController]);
function ChildOneController($scope){
  // 数据设置
  $scope.$parent.data = 1;
}

// 子控制器
angular
  .module('app')
  .controller('ChildTwoController', ['$scope', '$timeout', ChildTwoController]);
function ChildTwoController($scope, $timeout){
  $timeout(function(){
    // 数据读取
    console.log($scope.$parent.data);
  }, 1000);
}

```

## 全局或共用的变量

AngularJS 提供了对 `window` 和 `localStorage` 两个变量的封装，`$window` 和 `$localStorage` ，通过修改和监听这两个值，可以达到在控制器之间数据共享和通信的目的。方法如下：

```js
// one controller
angular
  .module('app')
  .controller('OneController', ['$scope', '$window', OneController]);
function OneController($scope, $window){
  // 数据设置
  $window.data = 1;
}

// other controller
angular
  .module('app')
  .controller('AnotherController', ['$scope', AnotherController]);
function AnotherController($scope){
  // 监听修改
  $scope.$watch(function(){
    return $window.data;
  }, function(n){
    $scope.windowData = n;
  });
}
```

其实，这种监听修改的方式，也可以用在其它通信方式中。

## 元素绑定

AngularJS 中，可以通过一个元素，来获取其上的控制器实例。通过这种方式便可以快速的获取
修改某个控制器中的数据，或者调用这个控制器中的方法。比如：

```html
<div ng-controller="AppController">
  <div id="div-a"></div>
</div>
```

可以通过以下的方法，来获取控制器实例：

```js
var instance = angular.element(document.getElementById('div-a')).scope();
```

接着，便可以通过这个 `instance` 来调用控制器的方法，获取和修改值了。无法是元素本身绑定有控制器，还是元素的父级元素绑定有控制器，都可以成功的获取。

茴字有很多写法，具体写的时候用哪种，完全看情况和心情。
