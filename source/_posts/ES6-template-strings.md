title: Node.js 4.0.0 新特性：模板字符串（Template Strings）
date: 2015-09-13 06:21:58
tags:
  - JavaScript
  - Node.js
categories:
  - 编程杂记
---

前两天[新发布的 Node.js 4.0.0 稳定版](https://nodejs.org/en/blog/release/v4.0.0/)，总算让 Node.js 用上了新的 V8 4.5，也使得 V8 中的 ECMAScript 6 新特性终于来到了 Node.js，除了引入注目的类型数据、箭头函数一类，还有个模板字符串（Template Strings），使得广大 Node.js 程序员可以用原生的方法来进行相对复杂的字符串处理了。

<!--more-->

### 蛮荒时代

在以前，如果要处理一个多行的字符串，你得：

```js
// \\n 是为了高亮插件的显示，实际应为 \n
console.log('鹅，鹅，鹅，\\n\
曲项向天歌。\\n\
白毛浮绿水，\\n\
红掌拨清波。');

```

当然，老成一点的，还知道可以用数组进行组合。

```js
console.log(['鹅，鹅，鹅，',
'曲项向天歌。',
'白毛浮绿水，',
'红掌波清波。'].join('\\n'));
```

那如果要在字符串中插入变量呢？

```js
var person = {name: 'Sid', location: 'Shanghai'};
console.log('person: ' + JSON.stringify(person) + ' is here');
// person:{"name":"Sid","location":"Shanghai"} is here
```

或者这样：
```js
console.log('person:', person, 'is here');
// person: { name: 'Sid', location: 'Shanghai' } is here
```

没错，一个都没让人省心。

### 闪亮登场

模板字符串出场了，它就是为了解决上面这些问题。与变通字符串使用单双引号来包裹值不一样，模板字符串用的是'\`'，可以随意组织多行数据而不加入任何特殊符号，比如：

```js
console.log(`  鹅，鹅，鹅，
  曲项向天歌。
 白毛浮绿水，
红掌波清波。`);
```

既然称之为模板，当然也就具有模板的一些功能：

```js
var nameHe = 'Li Lei', nameShe = 'Han Meimei';
console.log(`
  this is ${nameHe}, 
  this is ${nameShe}`
  , nameHe);
/*
  this is Li Lei, 
  this is Han Meimei Li Lei
*/
```

还可以直接执行表达式：

```js
var intA = 10;
console.log(`Math.sqrt(3):${Math.sqrt(3)}, intA^2: ${intA * intA}`);
// Math.sqrt(3):1.7320508075688772, intA^2: 100
```

此外，可以组织一个函数，来专门处理模版字符串，类似于这样：

```js
function taggedTS() {
  console.log('arguments:', arguments);
}

taggedTS `This is ${intA} and sqrt: ${Math.sqrt(intA)}`
/*
arguments: { '0': [ 'This is ', ' and sqrt: ', '' ],
  '1': 10,
  '2': 3.1622776601683795 }
*/
```

注意，虽然看起来像个普通的函数，但在调用的时候，不能使用括号，而是直接用函数名加模板字符串的方式。传入的参数，分为两部分，第一个是被动态的值所分隔的多个字符串，后面是对应的各个动态值的计算结果。

### 安全问题

与SQL注入一样，如果要把用户的输入直接作为模板字符串的内容，务必先进行仔细的检查，因为恶意的输入者，可能会通过猜测变量名，来获取你程序中比较危险的值。