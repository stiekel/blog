title: 使用过滤器filter在ngOptions和ngRepeat中筛选与排除
date: 2015-03-03 13:11:12
tags:
  - AngularJS
  - JavaScript
categories:
  - 编程杂记
---

ngRepeat和ngOptions中经常会涉及到特定值的筛选和排除，但在排除值的时候，与最直观的想法有点儿不一样，尝试了几次，最后是查了[官方的filter文档](https://docs.angularhtml.org/api/ng/filter/filter)，才找到正确的写法。干脆搬运一下。

<!--more-->

下面代码中所使用的数组结构如下：

```js
$scope.newsCategories = [
  {name: 'hotNews', showName: '热门新闻'}
  , {name: 'health', showName: '健康知识'}
  , {name: 'feeling', showName: '情感生活'}
  , {name: 'video', showName: '视频'}
  , {name: 'humNews', showName: '幽默新闻'}
  , {name: 'lecture', showName: '学堂'}
]
```

## 过滤器的基本运算符

### 简单筛选

过滤出所有包含某个字符串的对应元素，注意，如果元素有多层，只要任何一层中有值满足即可，写法如下

```html
filter: "o"
```

上面便可以筛选出所有包含`o`的元素，不管是`name`属性中包含`o`，还是`showName`中包含`o`，它其实是下面这种写法的简写：

```html
filter: {$: "o"}
```

### 简单排除

排除的写法有点怪异，是直接将排除操作符写到引号之内，如下：

```html
filter: "!o"
```

它的完整写法是：

```html
filter: {$: "!o"}
```

### 单个属性过滤

筛选的时候，也可以指定单个属性，如下：

```html
filter: {name: "o"};
```

### 多个属性过滤

筛选可以指定多个属性，筛选同时满足多个属性条件的值：

```html
filter: {name: "o", showName: "!新闻"};
```

这其实相当于是`AND`，filter不支持直接进行`OR`类似的筛选，必须通过自定义的过滤器才能完成。

## 在ngRepeat中使用过滤器

以上面的多属性过滤为例，可以这样使用：

```html
<li ng-repeat='c in newsCategories | filter: {name: "o", showName: "!新闻"}'>
  {{c.name}}
</li>
```

## 在ngOptions中使用过滤器

直接在ngOptions的`as`和`for`语句后追加过滤器，如下：

```html
<select 
  class="form-control" 
  ng-model='news.filter.category' 
  ng-options='c.name as c.showName for c in newsCategories | filter: {name: "o", showName: "!新闻"}' 
  ng-change='news.changeCategory()'></select>
```

在网上搜索了一下这个话题，其实写的人很多了，不过还是决定写下来。
