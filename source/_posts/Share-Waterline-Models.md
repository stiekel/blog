title: 应用内 Waterline 实例的共享
date: 2016-05-13 09:46:42
tags:
  - Node.js
  - Waterline
categories:
  - 编程杂记
---

相对于 Mongoose 的初始化来讲，Waterline 的要麻烦得多，首先 Waterline 的初始化是异步的，其次，它是返回一个全新的对象，所以不得不使用单独的代码，来解决应用内共享同一个数据库的 models 。[在 Express 项目中使用 Waterline](/2015-10/Use-Waterline-in-Express-project.html)一文中，我们是将所有的集合加载到 Express 的实例中，网友 wuwanyu 问道，还有没有其它的办法，让应用内能够更方便的共享 Waterline 实例。

在 Node.js 中，模块是单例模式共享的，所以可以利用这一特性来在应用内共享 Waterline 实例。下面的代码依然是基于 [waterline-sample](https://github.com/stiekel/waterline-sample) 。

首先，为了程序的可读性，我们在 `config/waterline.js` 的最后一行，增加一个导出的变量，用以存放 waterline 中所有 models 的引用，将其初始化为 `null`：

```js
exports.orm = orm;
exports.config = wlconfig;
exports.models = null;
```

接着，在初始化的时候，将其赋值，修改 `bin/www` 相关代码如下：

```js
#!/usr/bin/env node

var app = require('../app');
var config = require('../config/config');
var waterline = require('../config/waterline');

waterline.orm.initialize(waterline.config, function(err, models){
  // ...
  waterline.models = models.collections;
  // app.set('models', models.collections);
  // ...
});
```

以后，直接使用 `config/waterline.js` 中导出的 `models` 即可进行 Waterline 的相关操作了，比如，在控制器中，可以这样操作：

```js
var waterline = require('../../config/waterline');
module.exports = {
  list: function(req, res, next){
    var page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
    var limit = parseInt(req.query.limit, 10) ? parseInt(req.query.limit, 10) : 1;
    // req.models.post
    waterline.models.post
    .find()
    .paginate({page: page, limit: limit})
    .exec(function(err, docs){
      res.json(docs);
    });
  }
};

```

同理，其它所有需要在应用内进行共享的数据，都可以通过 Node.js 模块的单例特性来实现。
