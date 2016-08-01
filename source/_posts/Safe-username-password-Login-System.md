title: 打造一个安全的用户名密码登陆系统
date: 2016-08-01 07:08:04
tags:
  - Node.js
  - Waterline
  - AngularJS
  - Express
  - 安全
categories:
  - 编程杂记
---

很多的网络应用都有基于用户名密码的登陆功能，而绝大多数的登陆都毫无安全性可言，不夸张的说，大多数的程序员根本不知道怎样去保证用户名和密码的安全。

## 安全的标准

要想一个登陆系统安全，至少要保证以下几个方面。

### 原始密码的安全

很多人对于用户的原始密码安全，还停留在不被非法第三方获取的层面上，但实际上，原始密码的最大威胁，往往来自于系统的开发人员和服务器的管理人员。这些人可能是有意收集，也可能是无意泄露，往往是用户原始密码的泄露的罪魁祸首。在构建登陆系统的时候，应该从根本上避免，做到只有用户自己和键盘记录器才知道原始密码。

那如何做到这一点呢？首先一点就是一定要在客户端进行密码加密，这可以使得后端拿到的密码已经是加过密的，一来服务器接触不到原始密码，二来就算通信被监听，第三方就算拿到了可以用来登陆的客户端加密密文，也无法获知用户的原始密码。

### 哈希：不可逆加密

密码加密不同于普通的加密，一是内容重要，二是密码的验证根本不需要原文，要检查一个密码是否正确，只需要看它加密的结果与正确的密码加密的结果是否一致即可。确定了这两点，对于加密的方法，就只要求同一个字符串加密后会得到同样的密文。哈希完全满足了这一要求。

在哈希算法中，首选是 SHA2 系列，虽然安全由于 SHA1 的原因而被质疑，但至少目前还没有证明有什么纰漏。MD5 由于用得太多，而且彩虹表实在过于泛滥，并不推荐使用。

另外一个问题，哈希一遍是不是就够了呢？当然不，不仅要多次哈希，而且还要与用户名一类的数据混加，比如，可以使用下面的方式来在客户端加密原始密码：

```js
sha256(
  sha265(sha265(password)) + sha265(username)
)
```

这样，不仅可以增加密文反推原文的难度，还加入用户名，使得就算密码相同，不同用户的密文也完全不一样。

在客户端的加密，基本上也就只能到这一步了，因为一个最主要的问题是，客户端的加密算法是公开的。

### 盐：混入随机数据

虽然在客户端对密码进行了加密，但无论是算法，还是混入的用户名，都是公开了的。剩下的加密，就需要留给后端了。

由于对同一字符串进行哈希的结果是恒定的，所以知道了算法和密文，理论上是可以反推出密码的，反推的难度取决于用户原始密码的复杂度。那如何才能够让反推的难度指数级增大呢？答案是在原始密码密文的基础之上，再加入一个随机字符串，从而达到让用户的密码更复杂的效果。这个随机字符串，便是盐。

后端获取到客户端传来的密码之后，再通过加盐哈希进行再加密。比如像下面这样：

```js
sha256(
  sha256(username + sha256(password + salt)) + salt + sha256(username + salt)
)
```

注意，盐的保存非常关键，务必将它与用户信息分开存放。

### 密文和盐的更新与不可追溯

现在密码已经分别在客户端和后端多次哈希，还加了盐，好像已经很安全了。但其实，我们还可以更安全。那就是经常变更盐，让用户信息表中的密文字段值也经常变化。这样，除非同时拿到用户信息和盐，否则依然无效。

那什么时候变更盐和密文呢？由于后端是不存储客户端哈希的密文的，所以只有在登陆的时候，才能够进行盐和密文的修改。

### 用户名本身可以加密吗？

这个想法好像有点不靠谱，但实际上，用户名如果只是作为单纯的登陆凭证，其实是可以像密码一样加密的。因为无论是注册、登陆还是找回密码，都不需要用户名的原文。但注意，用户名只能哈希，不能加盐，否则就没什么依据去找盐了。

用户名的哈希可以分两部分，一是客户端哈希，到了服务器端，可以进行再次哈希。

在本文的 Demo 中，将不对用户名哈希。

### 通信的安全

在应用层面基本上已经很安全了。接下来就是客户端和通信的安全。客户端的环境基本不可控，所以只能在通信的安全上想办法了。不过其实也不用想什么多的办法，直接使用 HTTPS 就行了。

## 登陆流程

上面总结了怎样保证一个用户名密码登陆系统的安全，这里再来看看一个满足上述要求的登陆系统的登陆流程。注册流程相对来讲简单一些，所以就不再详细介绍。

[Demo](https://github.com/stiekel/safe-username-password-login) 是一个简单的 Web 用户名密码登陆系统，代码示例也取自于它。

### 浏览器登陆

浏览器主要完成以下工作：

*  获取用户输入的用户名及密码
*  通过输入的用户名和密码，进行哈希，得到浏览器端密文
*  将用户名和密文提交给后端

主要代码如下，取自 [client/app.js](https://github.com/stiekel/safe-username-password-login/blob/master/client/app.js)：

```js
// 密码与用户名的哈希
function encryptPwd(username, password) {
  username = username.toLowerCase();
  return sha256(
    username + sha256 (
      sha256(sha256(sha256(password))) + sha256(username)
    )
  );
}

$scope.login = function(){
  // 检查用户名和密码的合法性，比如是否输入，长度是否足够等
  if($scope.check()) {
    return;
  }
  $scope.successMessage = '';
  $scope.errorMessage = '';
  $scope.status = 'loading';
  // 向后端提交登陆请求
  $resource('/user/login')
  .save({
    username: $scope.username,
    password: encryptPwd($scope.username, $scope.password)
  }, function(res){
    $scope.status = 'done';
    $scope.successMessage = 'login successful!';
  }, function(reason){
    $scope.status = 'done';
    $scope.errorMessage = reason.data || 'failed';
  });
};
```

### 后端密码验证

后端的验证流程如下：

*  获取前端提交的用户名及浏览器端密文
*  根据用户名，在数据库中查询出对应的盐 id 
*  通过盐 id 取出对应的盐，再通过用户名、浏览器端密文和盐算出后端密文
*  根据用户名和后端密文到用户表查询，如果有结果，则表明登陆信息正确，返回给浏览器登陆成功的响应
*  生成新的盐，算出新的后端密文，并将两者更新到数据库中

实现的代码如下，取自 [app/controllers/user.server.controller.js](https://github.com/stiekel/safe-username-password-login/blob/master/app/controllers/user.server.controller.js)：

```js
function encryptPwd(usr, pwd, salt){
  usr = usr.toLowerCase();
  return sha256(
    sha256(usr + sha256(pwd + salt)) + salt + sha256(usr + salt)
  )
}

function login(req, res, next){
  // 用户名密码获取和检查已省略
  // 根据用户名，获取盐 id
  req.models.user
  .findOne({select:['username', 'saltId'], where: {username: username}})
  .exec(function(err, userDoc){
    if(err) return next(err);
    if(!userDoc) return next(new Error('username not exists'));

    // 取盐
    req.models.salt
    .findOne({id: userDoc.saltId})
    .exec(function(err, saltDoc){
      if(err) return next(err);
      if(!saltDoc) return next(new Error('can NOT find salt'));

      // 根据用户名、密码和盐推算出密文
      var pwdHash = encryptPwd(username, password, saltDoc.salt);
      // 在数据库中核对用户名和密文
      req.models.user
      .findOne({select: ['id'], where: {username: username, password: pwdHash }})
      .exec(function(err, doc){
        if(err) return next(err);
        if(!doc) return next(new Error('password error'));

        res.json({
          username: username
        });

        return updateSalt(saltDoc, userDoc, password, next);
      });
    });
  });
}
```

### 盐与密文的更新

前面返回给用户成功登陆的响应之后，调用了更新盐和密文的方法，该方法具体流程如下：

*  生成并存储新盐
*  根据新盐、用户名和浏览器端密文，生成新的后端密文
*  存储后端密文到用户信息表

实现如下，取自 [app/controllers/user.server.controller.js](https://github.com/stiekel/safe-username-password-login/blob/master/app/controllers/user.server.controller.js)：

```js
function updateSalt(saltDoc, userDoc, passwordInputed, next){
  saltDoc.salt = Math.random().toString(15).substr(3, 27);
  saltDoc.save(function(err){
    if(err) return next(err);
    userDoc.password = encryptPwd(userDoc.username, passwordInputed, saltDoc.salt);
    userDoc.save(function(err){
      if(err) return next(err);
      return next();
    });
  });
}
```

## Demo

[Demo](https://github.com/stiekel/safe-username-password-login) 托管在 Github 上。前端采用 AngularJS + Bootstrap ，后端使用 Node.js + Express + MongoDB ，是一个典型的 MEAN 应用 。

数据存储这块，使用了 Waterline 这个 ORM 中间件（以前也曾经写过两篇介绍文章，可供参考：[Node.js ORM 数据操作中间件 Waterline](http://chensd.com/2015-10/Node-ORM-Waterline.html)、[在 Express 项目中使用 Waterline](http://chensd.com/2015-10/Use-Waterline-in-Express-project.html)）。使用它的目的主要是为了将用户信息和盐存储到不同的地方。本例中将盐用 [sails-disk](https://github.com/balderdashy/sails-disk) 存储到了文件中，用户信息用 [sails-mongo](https://github.com/balderdashy/sails-mongo) 存储到了 MongoDB 中。

```sh
git clone https://github.com/stiekel/safe-username-password-login.git
cd safe-username-password-login
npm i
npm i -g gulp
gulp
```

再在浏览器中打开 http://localhost:7102/ 即可。
