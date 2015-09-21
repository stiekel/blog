title: 如何在 Mongoose 的实例方法中访问静态方法
date: 2015-09-21 21:36:31
tags:
  - Node.js
categories:
  - 编程杂记
---

前几天，在实例一个功能的时候，需要在实例方法中调用静态方法，查了一下 Mongoose 的文档，发现还真没有这方面的内容，不过 Google 了一下，还是在 [stackoverflow](http://stackoverflow.com/questions/14277518/how-to-access-a-static-method-from-a-instance-method-in-mongoose) 上找到了答案。

<!--more-->

方法比较简单，也比较粗糙和丑陋，就是通过构造函数来访问静态方法，大致如下：

```js
WorkSpaceSchema.methods.getPrice = function(startTime, endTime){
  // ...
  var result = days * Math.floor(this.constructor.getPricePerDay(this.discountPrice || this.price, this.priceType));
  // ...
};

WorkSpaceSchema.statics.getPricePerDay = function(price, priceType){
  // code
};
```

看到这个解决方案后，第一想法是，Mongoose 在设计的时候，为什么没有考虑方法之间的访问这一情形呢，仔细一想，静态方法的设计初衷，只是为了通过对 Model 已有方法进行扩充和自定义，创建出一些特别的搜索方法之类，而如果想要创建在其它方法中调用的方法，更好的解决办法是写单独的模块，然后再导出和调用。