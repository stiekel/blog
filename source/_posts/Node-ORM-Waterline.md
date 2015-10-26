title: Node.js ORM 数据操作中间件 Waterline
date: 2015-10-25 16:31:51
tags:
tags:
  - Node.js
  - Waterline
categories:
  - 编程杂记
---

这两天在看 [Sails.js](http://sailsjs.org) 的时候，偶然看到了它使用的是 [Waterline](https://github.com/balderdashy/waterline) 来实现数据库的操作，发现它和 Sails.js 为同一团队所开发。翻了一下文档，感觉在中小型项目中使用，的确可以提升开发效率。

Java 中的 Hibernate 框架的一个重要功能便是将数据库中的数据与 Java 中的对象进行映射，被称为 ORM （Object Relational Mapping）。Node.js 里常用的 Mongoose ，便是将 MongoDB 的文档，映射为 JavaScript 的对象，而 Waterline 则是一个支持多种数据库的 Mongoose ，使得可以用一样的代码来实现对多种数据库的操作，无论是关系数据库还是文档数据库，都可以直接使用对象的方法来进行增删改查操作。
<!--more-->

### 功能与特点

*   __广泛的数据库支持__：支持几乎所有的主流关系数据库和文档数据库
*   __脱离 SQL __：对于习惯了使用 Mongoose 的程序员，如果要去使用 SQL 操作关系数据库，肯定会有点费解， Waterline 可以像 Mongoose 一样使用对象的方法来实现关系数据库的操作
*   __屏蔽不同数据库的差别__：对于大部分情况下，你根本不用关心操作的是 MySQL 还是 MongoDB。比如 MongoDB 中并没有数字自增（Auto Increment）的功能，但 Waterline 使用 [`autoPK`](https://github.com/balderdashy/waterline-docs/blob/1b17fbd12ce59b80bb4e53f197bacf0ca86a51d1/models/configuration.md#autopk) 来为 MongoDB 实现了自增
*   __易于理解的符号__：在 Mongoose 中，大于和小于得使用 `$gt` / `$lt` 来表示，而 Waterline 里，直接使用 `>` / `<` 即可
*   __多样的操作支持__：提供了 26 种方法来进行增删改查操作
*   __丰富的数据类型__：支持 JavaScipt 中除了对象外的所有数据类型，还额外提供了日期、时间、二进制、JSON的支持，数字还可以区分整数和浮点数

### 数据库的支持情况

Waterline 里将操作数据库的方法翻译为具体的数据库查询语句的，叫适配器。分为两大类：

*   官方团队提供的适配器：提供了对 MySQL / MongoDB / Redis 的支持
*   第三方开发的适配器：提供了对 PostgreSQL / Oracle / SQL Server / OrientDB / ArangoDB / Apache Cassandra 的支持

基本上实现了对主流数据库的支持。

### 配置中的适配器与连接

Waterline 之所以可以使用一样的代码来操作多种数据库，奥妙~~洗衣粉~~在于其适配器。在进行配置的时候，需要设置两方面的内容，一是具体使用哪些适配器，二是建立数据库连接的时候，使用哪个适配器。下面是使用 MongoDB 的适配器创建一个数据库连接的配置：

```js
var mongoAdapter = require('sails-mongo');
var wlconfig = {
  adapters: {
    'default': mongoAdapter,
    'mongo': mongoAdapter
  },
  connections: {
    'mongo': {
      // adapters 中的适配器代码
      adapter: 'mongo',
      url: 'mongodb://localhost/waterline-sample'
    }
  }
};
```

Waterline 在 MongoDB 的配置中，甚至还直接支持配置复制架构。

注意，需要在 `adapters` 中指定具体的适配器，`connections` 中配置连接时再指定 `adapters` 中的适配器代码。在进行具体的数据集合创建时，将会要指定使用 `connections` 中的哪个连接。

### 数据集合

Waterline 中负责具体与表和集合对应的是数据集合 Collection，它有点类似于 Mongoose 中的 Model，但在 Waterline 中，所有的数据集合合在一起，加上一些其它的属性和方法，构成一整个 `models`。

数据集合在初始化的时候，需要指定使用哪些连接，是否强制模式，具有哪些属性以及集合的 id，如下：

```js
var Post = Waterline.Collection.extend({
  // 集合的 id
  identity: 'post',
  // 使用的连接数
  connection: 'mongo',
  // 是否强制模式
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    content: 'string',
    createTime: 'date',
    lastModifyTime: 'date'
  }
});
```

配置相当简单方便，类似于 Mongoose 中的 Schema。但要注意，指定属性的字段时，使用的是一个字符串值，而不是 JavaScript 中的具体类型，目前支持的数据类型有 `string` / `text` / `integer` / `float` / `date` / `time` / `datetime` / `boolean` / `binary` / `array` / `json`，这个范围要比 JavaScript 的类型范围大。

除了这四个基本配置，还可以配置校验器，添加自定义的方法，设置生命周期回调方法等。

### 校验器

[balderdashy](https://github.com/balderdashy) 为了 Sails.js 创建了 Waterline，为了实现 Waterline 中的数据校验，又参与了 [Anchor](https://github.com/sailsjs/anchor) 的开发。

校验器是在创建数据集合的时候指定给具体的属性的，除了预定义的校验器，还可以自定义校验器。预定义的校验器涵盖了 Mongoose 中的必须字段验证、字符串长度验证等。比如下面这几种：

```js
// Waterline.Collection.extend() 的参数之一
attributes: {
  title: {
    type: 'string',
    required: true,
    maxLength: 100,
    minLength: 5
  },
  views: {
    type: 'integer',
    min: 0
  }
  createTime: {
    type: 'date',
    // 在某个时间点之前
    before: '2100-12-31',
    // 在某个时间点之后
    after: function(){
      return new Date();
    }
  }
}
```

除了上面这几个简单的，[Anchor 支持的验证器](https://github.com/sailsjs/anchor/blob/master/lib/match/rules.js) 还有针对时间、地理位置、正则表达式、布尔值、Email地址的，一共有 20 多个，用过 Mongoose 验证器的人是不是已经泪流满面了？

### 查询

Waterline 提供了 [26 种查询方法](https://github.com/balderdashy/waterline#query-methods) ——你没有看错，是 26 种。除了常规的 `find` / `create` / `update` / `destory` 方法，还有 `findLike` / `startWith` / `findByNameIn` / `nameContains` 之类。

查询方法可以使用三种方式来调用，分别是：

*   回调方式：直接把结果处理函数以回调函数的方法传给查询方法
*   链式方式：查询方法之后，直接以链式方式依次组织各个查询接口
*   Promise：这一方式使得错误处理更漂亮，代码也更容易阅读

[查询的接口](https://github.com/balderdashy/waterline-docs/blob/master/queries/query.md)也很丰富，`where` / `sort` / `exec`，还有 Mongoose 中的 `populate` ，查询翻页使用 `limit` / `skip`，还提供了一个集成的方法 `paginate`，直接传入页码和每码数量即可。

[查询的语法](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md)就更丰富了，包括：

*   [条件修饰符](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md#criteria-modifiers)：包括 `>` / `<` / `>=` / `<=` / `!` / `like` / `contains` / `startWith` / `endWith`，大小比较的，除了常规的数字，也支持时间
*   [查询选项](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md#query-options)：提供了 `limit` / `skip` 两个属性组织分页，使用 `sort` 属性确定排序，排序即可以使用 SQL 语法里的 `DESC` / `ASC` ，也可以用对象的方式来直接指定排序标准，并支持指定多个排序标准。`select` 指定查询结果所包含的字段

### 生命周期回调

Mongoose 可以通过[中间件](http://mongoosejs.com/docs/middleware.html)，来实现在进行特定操作的时候，调用自定义的方法。Waterline 必然也有这个功能，叫[生命周期回调（Lifecycle Callbacks）](https://github.com/balderdashy/waterline-docs/blob/master/models/lifecycle-callbacks.md)，除了没有 Mongoose 中的 `init` ，在 `create` / `update` / `destory` 时，均有多种回调。不过，调用的方法与 Mongoose 稍有不同，Waterline 的生命周期回调，是直接提供对应的方法名，分别是：

*   创建时：`beforeValidate` / `afterValidate` / `beforeCreate` / `afterCreate`
*   更新时：`beforeValidate` / `afterValidate` / `beforeUpdate` / `afterUpdate`
*   删除时：`beforeDestroy` / `afterDestroy`

这些方法，需要在初始化数据集合的时候进行定义。

### 还有吗？

当然，Waterline 还支持[自定义数据类型](https://github.com/balderdashy/waterline#custom-types)、[索引](https://github.com/balderdashy/waterline-docs/blob/1b17fbd12ce59b80bb4e53f197bacf0ca86a51d1/models/data-types-attributes.md#index)和[集合间的关联](https://github.com/balderdashy/waterline-docs/blob/master/models/associations/associations.md)。

下篇文章，我将使用一个例子来展示如何在实际的项目中使用 Waterline。