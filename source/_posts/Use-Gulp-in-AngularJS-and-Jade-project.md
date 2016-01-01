title: 使用 Gulp 构建 AngularJS / Jade 项目
date: 2015-11-08 07:22:45
tags:
  - JavaScript
  - Gulp
categories:
  - 编程杂记
---

我所经历的大部分项目，并不是纯粹的前端项目，相关的前端文件，都是使用 Express 来处理，除了 Jade 文件之外的，全部放在 Express 静态文件目录 `public` 中，Bower 也配置为将依赖包直接安装到 `public/lib` 目录，然后直接使用原路径在 HTML 中引用对应的 JavaScript / CSS 文件，经常是一个页面加载几十个静态资源。

上周在做一个 App 项目的商户端，对应的 API 已经完成，只是用 AngularJS 来实现一个前端 Web 页面，其中的 HTML 使用了 Jade 来完成。由于是一个完全的前端项目，终于决定尝试用 Gulp 来进行构建。整体的需求如下：

*   使用 Bower 管理前端依赖
*   需要将 Jade 文件编码成 HTML，并按照 Angular New Router 中的 Components 来组织目录结构
*   将 CSS / JavaScript 文件组装为单个文件
*   图片和字体等静态资源存放到对应目录
*   使用 Gulp 创建一个调试用的服务器，并能够修改文件后自动重载浏览器页面

<!--more-->

### 项目的目录与文件结构

整体文件夹结构如下：

```sh
├── app
│   ├── controllers // AngularJS 控制器
│   │   └── home.js
│   ├── modules // AngularJS 模块
│   │   └── app.js
│   ├── services // AngularJS 服务
│   │   └── city.client.service.js
│   └── views // Jade 文件
│       ├── index.jade
│       └── _partial
│           └── home.jade
├── bower.json
├── config.js
├── gulpfile.js
├── package.json
├── README.md
└── static
    ├── css
    │   └── style.css
    └── images
        ├── avatar.png
        └── logo.gif

```

另外还有个 `public` 目录，作为发布目录，提供给 Web 服务器对外发布。所有需要在浏览器使用的文件，最后使用都要生成或者复制到 `public` 中。

### 使用 Bower 管理前端依赖

悲剧，在我定这篇文章的大纲的时候， Bower 还在更新，结果没两天就宣布不再开发了。

Bower 之所以在以前统治着前端包管理领域，原因在于它的扁平化包管理， NPM 中每个模块都有独立的属于各自的目录，来存储对应的依赖包，虽然会占用比较多的磁盘，但却可以防止模块版本不同而造成的依赖问题。 Bower 本身并不直接决定应用的包依赖，它将模块的依赖同模块本身一样安装。

自从 NPM 成立专门的公司来运营以后，已经致力于将自己从 `Node Package Manager` 提升为 `JavaScript Package Manager`。所以也开始像 Bower 来组织模块的依赖—— Bower 存在的理由又少了一个。

这两天，网上正在嘲笑 `bower --save` 并不会把当前已经安装的依赖存储到 `bower.json` ，不过我怀疑他们没有看到过 NPM 3.3.x 是怎么处理依赖的， `npm --save` 后的 `package.json` 估计会相当的不堪入目吧。

### Jade 模板文件转换为 HTML 文件

以前 Jade 文件是使用 Express 的 `view engine` 来转译，在专门的路由文件中，一一按照 Angular New Router 的 Components 标准来进行解析。使用 Gulp 转换也是类似，借助 `gulp-jade` 模块，设置 `gulp.src` 为 jade 文件路径，`gulp.dest` 为转换后的 HTML 文件路径，为了方便，将需要转换的 jade 文件和对应的路径组成一个数组，再在 `gulp.task` 中对数据进行遍历，并执行转换。

```js
var gulp = require('gulp');
var jade = require('gulp-jade');

var jadeFiles = [
  {src: './app/views/index.jade', dest: './public/'},
  {src: './app/views/_partial/home.jade', dest: './public/components/home/'}
];

gulp.task('jade', function(){
  jadeFiles.forEach(function(jf){
    if(!jf.src || !jf.dest) return;
    gulp.src(jf.src)
      .pipe(jade({petty: true}))
      .pipe(gulp.dest(jf.dest));
  });
});
```

### 将 JavaScript / CSS 文件组装为单个文件

对于遵循 AngularJS 模块化设计的前端应用， JavaScript 文件那必然是相当多，再加上使用一些扩展，就算是中小型项目，超过 70 个以上那也是相当常见，看 Chrome 开发工具中的 Network 页那可以部是相当精彩，

如果只是将多个 JavaScript 和 CSS 文件合为一个，使用 `gulp-concat` 模块即可，压缩 JavaScript 文件，可以再加一个 `gulp-uglify` 模块，压缩 CSS 文件，可以使用 `gulp-minify-css` 模块。`gulp.src` 支持使用数组的方式来指定要处理的文件列表。

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var jsFiles = [
    './bower_components/jquery/dist/jquery.js', 
    './bower_components/bootstrap/dist/js/bootstrap.min.js', 
    ',/bower_components/PACE/pace.min.js', 
    './bower_components/angular/angular.js', 
    './bower_components/angular-new-router/dist/router.es5.js', 
    './bower_components/at-table/dist/angular-table.js', 
    './app/modules/businessApp.js', 
    './app/controllers/home.js'
];
var cssFiles = [
    './bower_components/bootstrap/dist/css/bootstrap.min.css', 
    './bower_components/font-awesome/css/font-awesome.min.css', 
    './bower_components/PACE/themes/blue/pace-theme-loading-bar.css', 
    './static/css/start.css'
];
// 在这两个 `min` 任务之外，还有两个不带 `min` 的任务，区别在于不对文件压缩
gulp.task('scripts_min', function(){
  return gulp.src(jsFiles)
    .pipe(concat('all.js')) // 合并 JavaScript ，并设置合并后的文件名
    .pipe(uglify()) // 执行 JavaScript 压缩
    .pipe(gulp.dest('./public/js'));
});
gulp.task('stylesheets_min', function(){
  return gulp.src(cssFiles)
    .pipe(concat('all.css')) // 合并 CSS ，并设置合并后的文件名
    .pipe(minifyCss()) // 执行 CSS 压缩
    .pipe(gulp.dest('./public/stylesheet'));
});
```

### 管理图片字体等静态资源

对于图片、字体等文件，只是需要使用 Gulp 自带的 `gulp.src` 和 `gulp.dest` 来复制到 Web 目录即可。除了这些静态文件，有些文件可能也需要单独处理，比如 JavaScript 中的一些配置项文件，另外，如果使用加载状态提示模块，这个也是需要优秀加载的。顺便安利一下 [PACE](http://github.hubspot.com/pace/docs/welcome/) ，它是个使用相当方便的加载提示模块。

```js
gulp.task('pace', function(){
  // copy pace.js to js folder
  return gulp.src('./bower_components/PACE/pace.min.js')
    .pipe(gulp.dest('./public/js'));
});
```

其它需要直接复制的文件，也都是类似方法处理。

### 使用 Gulp 来创建文件修改后浏览器自动刷新的 Web 服务器

如果想要文件修改后，浏览器自动刷新，需要做两方面的工作：

*   监控 JavaScript / Jade / CSS 文件，修改后重新转换或者压缩
*   监控 JavaScript / Jade / CSS 文件，修改后刷新浏览器

对于第一个，使用 `gulp-watch` 模块来监视文件，并执行对应的 Task ，对于第二个，可以使用 `gulp-webserver` 模块，它可以创建一个 Web 服务器，并且在浏览器和服务器之间创建 Socket.IO 长链接，一旦有文件修改，便通过长链接通知浏览器刷新页面。


```js
var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('watch', function(){
  // 不同的文件个性，需要执行不同的任务来处理
  gulp.watch(['app/views/*', 'app/views/_partial/*'], ['jade']);
  gulp.watch(['bower_components/*'], ['scripts', 'stylesheets']);
  gulp.watch(['static/css/*'], ['stylesheets']);
  gulp.watch(['app/controllers/*', 'app/modules/*', 'app/services/*'], ['scripts']);
});

gulp.task('webserver', function(){
  gulp.src('./public/')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      fallback: 'index.html'
    }));
});
```
