title: Hexo 主题制作指南
date: 2016-06-19 15:17:53
tags:
  - Hexo
  - Blog
  - 前端
categories:
  - 编程杂记
---
当你看到你用的主题出现在两个以上的博客的时候，那你就要考虑自己写一个了。本文的主角是 Hexo ，如果你没有用过，那可以考虑 [Hexo 你的博客](http://ibruce.info/2013/11/22/hexo-your-blog/) 了，如果你还没有写博客，那你真的[该试试了](https://www.google.com/#q=%E4%B8%BA%E4%BB%80%E4%B9%88%E5%86%99%E5%8D%9A%E5%AE%A2)。根据[阮一峰提出的博客三阶段](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)，技术人员早晚会选择 Github Pages 类似的服务，而 Hexo 绝对是值得尝试的。

## 本文内容与目的

写这篇文章的目的，当然是希望帮你快速的制作一款主题，将要包含的内容如下：

* 主题的基本结构
* 常见问题
* 常用页面的实现
* 基本工具

## 最终结果

写这篇文章的原因，就是因为制作了一个主题 [Random](http://chensd.com/2016-05/hexo-theme-random.html)（[代码](https://github.com/stiekel/hexo-theme-random)、[Demo](http://random-stiekel.rhcloud.com/)），大家可以先看看，下面的代码，大都来自于这个主题。

## 基础知识

制作 Hexo 主题，除了需要了解 HTML / CSS / JavaScript 之外，还需要了解两个主要的技术，首先一个是模板引擎，Hexo支持主流的模板引擎，像 EJS / Jade / Swig 等，另外一个是 CSS 预处理，如 SASS / LESS / Stylus ，当然，这两个不用，直接使用 HTML / CSS 也是可以的，只不过可能效率会低一点，在本文中，选择使用如下两个：

* Stylus：[语法文档](http://stylus-lang.com/)，选择它，纯粹是因为想熟悉一下新技术
* Swig：[语法文档](http://paularmstrong.github.io/swig/)，这个项目的作者已经半放弃了该项目，你也可以考虑使用 ~~Jade~~ [Pug](http://jade-lang.com/tutorial/) ，两个功能差距不大，选择这个的原因同上

这篇文章将不介绍它们的使用，请参考它们的文档。

## Hexo 工作流程

如果你已经看到了这篇文章，基本上你已经是一个 Hexo 用户了，但还是简单的介绍一下 Hexo 的流程：

* 使用 `hexo init` 来生成基本文件，做一些基本的配置，像安装模块、配置主题等
* 使用 `hexo new page / post `来生成文章或页面的 md 文件，编辑
* 使用 `hexo g` 生成文件，Hexo 会根据主题中的模板，来生成对应的 html 文件，转译 CSS 文件，复制其它的静态文件（如图片图标字体等），组织为一个静态网站
* 使用 `hexo d` 来部署，一般是借助一些[部署模块](https://hexo.io/docs/deployment.html)完成

主题的作用就是在 Hexo 生成文件的时候，提供对应的模板和资源。

## 主题的基本结构

Hexo 对主题的基本要求，是需要有如下几个页面：

* 首页 `index`
* 存档页 `archive`
* 标签文章列表页 `tag`
* 分类文章列表页 `category`
* 文章详情页 `post`
* 页面详情页 `page`

以上这些文件，是 Hexo 在生成 HTML 文件时要用到的，全部放在主题的`layout`文件夹中。由于上面这些页面里，有很多代码是重复的，比如，HTML文件的 head 部分，页面的顶部导航，底部版权部分等，为了修改方便，组织简洁，一般会将可重用的部分提出来，再利用模板引擎来引入。

此外，还有些 JS / CSS / 图片/ favicon.ico 一类的文件，这类文件并不需要 Hexo 进行转换，直接就在 HTML 页面里引用了，所以全部放在主题的`source` 文件夹中。

## 使用 yeoman 生成基础代码

现在开始项目之前，我都会搜索一下 yeoman 有没有库，生成 Hexo 主题就有 [generator-hexo-theme](https://github.com/tcrowe/generator-hexo-theme) 。如果还没有安装 yeoman ，那先用 npm 全局安装。

```sh
npm i -g yo
```

接着安装生成器的库：

```sh
npm i -g generator-hexo-theme
```

然后到自己的博客目录之下，进入到 `themes` 目录，创建一个用主题名命名的新文件夹，比如`test`，进入新文件夹，先设置一下目录的权限，否则 yeoman 会提示权限不足：

```sh
chmod 675 ./
```

运行这个命令一般需要管理员权限，请根据自己系统的情况加`su` / `sudo`。接着开始生成代码：

```sh
yo hexo-theme
```

然后选择一些基本的配置，比如使用什么模板引擎，使用什么 CSS 预编译等，这里分别选择 Swig 和 Stylus。完成之后，主题目录下就会生成一些如下结构的文件：

```sh
├── _config.yml // 主题配置文件
├── languages // 多语言文件夹
├── layout
│   ├── archive.swig // 存档页模板
│   ├── category.swig // 分类文章列表页模板
│   ├── includes // 各页面共享的模板
│   │   ├── layout.swig // 页面布局模板，其它的页面模板都是根据它扩展来的
│   │   ├── pagination.swig // 翻页按钮模板
│   │   └── recent-posts.swig // 文章列表模板
│   ├── index.swig // 首页模板
│   ├── page.swig // 页面详情页模板
│   ├── post.swig // 文章详情页模板
│   └── tag.swig // 标签文章列表页模板
└── source
    ├── css
    │   └── theme.styl // 主题自定义 CSS 文件
    ├── favicon.ico
    └── js
        └── theme.js // 主题 JavaScript 文件
```

赶紧在 Hexo 的主配置文件中使用新主题，到博客根目录下找到 `_config.yml` 文件，找到`theme`行，修改如下：

```json
theme: test
```

赶紧 `hexo s` 启动博客，到浏览器看看效果吧。

## 多语言支持

Hexo 支持多语言显示，在主题的 `languages` 文件夹中，存放具体的多语言文件，可以是 YML 或者 JSON 文件。再在主配置文件 `_config.yml` 中使用下面的方法来指定具体的使用的配置文件名：

```json
language: zh-CN
# 或者多个配置文件
language:
 - zh-CN
 - en
```

像下面这样组织语言文件，`languages/en.yml`：

```json
archive_title: Archives
category_title: Category
tag_title: Tag
```

在模板里，当需要在页面中显示文字时，可以使用 Hexo 提供的帮助函数 `__()` / `_p()` 来读取具体的值，如：

```js
{% if is_archive() %}
  {% set pageTitle = _p('archive_title') %}
{% endif %}
<h1>{{ page_title }}</h1>
```

这样，主题就可以轻松支持使用不同语言的博客主。

## 各个页面的布局

在上面生成的代码中，所有页面均使用同一个布局，全部扩展自 `includes/layout.swig` ，在这个文件中，可以看到第 51 行有如下的代码：

```js
{% block body %}{% endblock %}
```

在其它的布局文件（除开 `includes` 目录中的）里，都是使对 `includes/layout.swig` 进行扩展，然后指定 `body` 这个块的代码，比如像 `index.swig` 的代码如下：

```js
{% extends 'includes/layout.swig' %}

{% block body %}
  {% include 'includes/recent-posts.swig' %}
  {% include 'includes/pagination.swig' %}
{% endblock %}
```

这就相当于是使用 `includes/layout.swig` 里的代码，并且将 `block body` 替换为那两行代码。注意，这个功能， EJS 模板引擎是不支持的。

因此，如果你要不同页面使用不同的布局，那就需要你在各自的页面里自定义，或者在单独的布局文件中定义，再扩展。

## 数据的填充

主题是供了页面的布局和样式，在生成 HTML 文件时，Hexo 会把特定的数据，传给 swig 模板，然后再由 swig 将数据填充到 HTML 文件之中。这些特定的数据，分为如下几类。

### 主配置文件数据

Hexo 的根目录中，有个 `_config.yml` 文件，它就是主配置文件，数据组织使用 [yml语法](http://docs.ansible.com/ansible/YAMLSyntax.html)，其中的项目，可以在模板中直接使用，比如博客的名字、副标题等等之类。这些数据项组织在 `config` 对象中。可以数字、字符串、对象、数组，例如：

```json
# 字符串
title: 不可能不确定
# 没有值
permalink_defaults:
# 逻辑值
auto_spacing: true
# 数字
since: 2010
# 数组
skip_render: 
  - "books"
  - "books/*"
# 对象
social:
  GitHub: https://github.com/stiekel
  Coding.NET: https://coding.net/u/Stiekel
  Twitter: https://twitter.com/SidCN
```

完整代码，请参见[_config.yml](https://github.com/stiekel/blog/blob/master/_config.yml)。

### 主题配置文件

每个主题，还有单独的配置文件，用于配置与主题紧密相关的内容，格式与主配置文件一致。只不过变量名为 `theme`。

具体哪些数据放到主配置文件中，哪些数据放到主题配置文件，自由度其实很高，一般的，推荐与博客中的数据相关的，放主配置文件，如博客的名字、作者、菜单配置等，与主题相关的，放到主题配置文件，比如主题的脚本文件列表、样式文件列表等。当然，在编写主题的时候，也可以考虑对于某一个数据，既可以放在主配置文件中，也可以放在主题配置文件中，像这样：

```json
{% set menu = config.menu || theme.menu %}
```

要读取菜单配置时，任意哪个配置文件中有都可以，而且是优先使用主配置文件中的配置。

### 配置文件中数据的使用

如果要在模板中使用某个具体的值，比如字符串、数字、逻辑变量或者对象的某个成员，可以在主题的模板文件 swig 中直接使用：

```js
<div class="title" onClick="openUserCard()">{{ config.title }}</div>
```

这就相当于把配置文件中的 `title` 输出到 HTML 中。如果是要遍历数组或者对象，就要复杂一点：

```js
<ul class="index-nav-link">
  {% set menu = config.menu || theme.menu %}
  {% for key in Object.keys(menu)  %}
    {% if menu[key] != '/'  %}
      <li><a href="{{ url_for(menu[key]) }}">{{ key }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

```

`Object.keys` 是取出一个对象的所有索引，`for key in `是遍历索引数组，即将对象的所有值生成一组用 `<li></li>` 组织的链接。

## 常用功能的实现

Hexo 提供了很多专门的变量及函数，用于在编写主题时使用。请参见[变量列表](https://hexo.io/docs/variables.html)和[帮助函数列表](https://hexo.io/docs/helpers.html)。这里针对常用的一些功能做对应的介绍。

### 获取站点的所有的文章、页面、标签和分类

Hexo 为主题提供了一个变量 `site` ，这个变量包括以下几个成员：
         
* `site.posts` 博客里的所有文章列表
* `site.pages` 所有创建的页面的列表
* `site.categories` 分类列表
* `site.tags` 标签列表

其中，`site.posts`与`site.pages`两个结构是相同的，它们各自包括两个成员，一个 length 为长度，一个 data 为具体的数组，它是个对象，但索引是数组，成员是各个文章的详情。

`site.categories`和`site.tags`则为两个对象，成员比较多，但具体的分类和标签列表，存在索引为`data`的成员上，该成员为对象，对象的索引为分类和标签对应的 `id`，类似于：
 
```json
"data":{
  "cipap3lwj0001fhpvlubaa0sp":{
    "name":"乱七八糟",
    "_id":"cipap3lwj0001fhpvlubaa0sp"
  }
}
```

不过实际在编写主题的时候，很少会直接用到这几个变量。

### 获取当前页面的数据

这个变量便是 `page` ，这个变量的特点是，在不同的页面中，它的成员会不一样。比如，在文章归档页，它就有文章列表，如果在文章详情页，它就包含有文章的相关信息。而且在不同的页面中，就算同一个索引的成员，值也会不一样，比如 `page.posts`，在首页，它是按分页设置限制过的文章列表，而在存档页则是所有文章的列表。

比如，在我们生成的代码中，首页里使用 `includes/recent-posts.swig` （[在线代码](https://github.com/stiekel/hexo-theme-random/blob/master/layout/includes/recent-posts.swig)）来显示文章列表，其主要代码如下：

```js
{% if site.posts.length > 0 %}
    {# ... #}
    {% for postItem in site.posts.toArray() %}
      {# ... #}
    {% endfor %}
{% endif %}
```

如果你的博客已经有几篇文章得话，会发现文章虽然列出来了，但并不是按时间来排列的。所以几乎没什么用，但如果使用 `page.posts` 变量替代 `site.posts`，结果就不一样了，修改一下试试。

再刷新一下首页，可以看到，文章只有几篇，并不是全部文章，且按时间倒序排列。`page` 的所有成员，请参见[列表](https://hexo.io/docs/variables.html#Page-Variables)。

### 各种链接的处理

获取某个页面的地址，有很多方法。包括：

* 全局的变量 `path` `url`
* `page.path` `page.permalink`，这两个值在单个的文章、分类和标签中，也是都有的

我们来看看这几个值各自有何作用。打开 `layout/post.swig` ，在第4行前插入如下代码：

```js
  <p>{{ path | json }}</p>
  <p>{{ url | json }}</p>
  <p>{{ page.path | json }}</p>
  <p>{{ page.permalink | json }}</p>
```

然后启动博客，进入做任意一篇文章，可以在顶部看到三个字符串，类似于：

```html
"2016-06/Material-Design-Float-Action-Button.html"
"http://chensd.com/2016-06/Material-Design-Float-Action-Button.html"
"2016-06/Material-Design-Float-Action-Button.html"
"http://chensd.com/2016-06/Material-Design-Float-Action-Button.html"
```

链接的具体样式，是主配置文件中 `permalink` 来决定的，这里的配置值为`:year-:month/:title.html`。可以看出来，`path` 与 `page.path` 输出一致，`url` 与 `page.permalink` 一致。而这几个链接都是无法直接使用的。因为 `page.path` 的值是相对路径，所以除了首页都是不能直接当链接的。而 `path.permalink` ，则是带有主配置文件中 `url` 值配置的全路径，也不太好当作站内链接直接使用。这时候，就需要 Hexo 提供的帮助函数 `url_for()` 来救场了。

再来加一行：

```js
  <p>{{ url_for(page.path) | json }}</p>
```

输出为：

```html
"/2016-06/Material-Design-Float-Action-Button.html"
```

这个结果就比较适合作为站内链接了。

### 在页面中加入 css 与 js 文件

Hexo 提供了两个帮助函数 `css()` 和 `js()` ，传入路径数组便可生成对应的 `link` / `script` 标签。路径数组配置在主题的配置文件中。

### 当前页面类型的判断

由于有些代码在不同的页面都是共用的，所以有时候就需要根据不同的页面，做不同的显示。比如，一般会把 HTML 的 `<head></head>` 部分写到一个单独的文件里。比如，这里生成的 `layout/includes/layout.swig` 文件里，就需要根据不同的页面，来生成不同的 `<title></title>` 标签值。[这类判断的方法](https://hexo.io/docs/helpers.html#Conditional-Tags)主要有：

* `is_tag()`
* `is_category()`
* `is_month()` 存档页中的按月份文章列表页
* `is_year()` 存档页中的按年份文章列表页
* `is_archive()`
* `is_post()`
* `is_home()`
* `is_current()` 传入一个 URL ，判断是否本页就是，比如，链接中要对当前页面的链接做加强显示，就可以利用这个方法来添加对应的 class

### 常用的字符串处理函数

* `strip_html()` 去除一段 HTML 代码中的标签，返回其包含的字符
* `markdown()` 将 md 代码转换为 HTML
* `word_wrap()` 将一段字符，按固定宽度插入换行符号
* `truncate()` 按固定长度截取字符串，比如，生成摘要时，如果没有摘要，可以截取一段文本

另外几个，请参见[字符串处理函数](https://hexo.io/docs/helpers.html#String-Manipulation)列表。

### 时间的处理

Hexo 提供了多个[时间处理函数](https://hexo.io/docs/helpers.html#Date-amp-Time)，不过一个 `date()` 也就够用了，接受两个参数，第一个为时间值，第二个为格式，模板引用中用法如下：

```js
{% set thisYear = date(Date.now(), 'YYYY') %}
```

HTML 中用法如下：

```html
<span id = "post-title-date">{{ date(postItem.date, 'M-D') }}</span>
```

由于是使用 Moment.js 来显示的时间，所以直接使用 Moment.js 的[时间格式](http://momentjs.com/docs/#/displaying/)就行了，常用的如下：

* `YYYY-MM-DD` => 2016-06-17
* `M-D` => 6-17
* `HH:mm:SS` => 07:38:19

### 生成标签云

Hexo 提供了帮助函数`tagcloud()`来生成标签云。生成的时候，可以设定标签云的文字大小范围、排序、颜色等值。具体请参见[参数列表](https://hexo.io/docs/helpers.html#tagcloud)。

以下是生成的一个标签云 HTML：

```html
<div class="tag-cloud-tags">
  <a href="/tags/ASP-NET/" style="font-size: 17.33px; color: #929292">ASP.NET</a>
  <a href="/tags/Access/" style="font-size: 24px; color: #6f6f6f">Access</a>
  <a href="/tags/Android/" style="font-size: 17.33px; color: #929292">Android</a>
</div>
```

这样便可以通知设置 `tag-cloud-tags` 的样式来自定义标签云的外观。

### 生成文章的目录

对于长文章，目录还是非常实用的，Hexo 也提供了 `toc()` 来实现这一功能，具体请参见[文档](https://hexo.io/docs/helpers.html#toc)。

生成的 HTML 是个有序列表，结构如下：

```html
 <ol class="toc">
  <li class="toc-item toc-level-3">
    <a class="toc-link" href="#按钮的定位">
      <span class="toc-text">按钮的定位</span>
    </a>
  </li>
</ol>
```

只要使用了 `toc()` 函数，无论当前页面有几个标题，都会生成对应的代码。比如想当目录少于三个的时候自动隐藏，那就得靠 JavaScript 了。可以通过获取 `ol.toc` 子成员的数量，来确定其显示或隐藏，jQuery 代码如下：

```js
if($("ol.toc").children().length <= 3) {
  $(".toc").hide();
}
```

这样当目录条数少于四条时，便自动隐藏目录。

## 页面的组织

### 代码的复用

上面我们曾经提到，对于一个主题，主要有首页、存档页、标签文章列表页、分类文章列表页、文章详情页、页面详情页这几个页面。这些页面的实现中，你会发现有大量的代码是可以共享的，比如：

* HTML 的 `<head></head>` 部分
* 页面的顶部导航
* 页面的底部版权和链接
* 各个文章列表页中的单个文章的链接（一般包括文章标题、标签、分类、时间、摘要等信息）
* 第三方插件代码，如评论、统计等
* 分页按钮

所以，对于这部分的代码，一般都会设计成可复用的代码段，将这些代码段文章存放在 `includes` 文件夹中，如果在某个页面中需要使用，只需要使用模板引擎的 include 功能来包含。比如，我们来看看如何组织一个文章列表中的单个文章的链接，这个代码段会在存档页、标签和分类的文章列表页等地方用到，创建文件 `includes/post-title-item.swig`，代码如下：

```js
<div class="post-title-item">
  {# postItem 为存有一个文章的所有信息的对象 #}
  {# postItem.title 为文章标题，如果没有标题，则直接截取文章内容 #}
  {# strip_html 是将 html 代码中提取可供普通人阅读的文字部分 #}
  {# trim 是去除前后空格 #}
  {% set postTitle = postItem.title || trim(strip_html(postItem.content))  %}
  <a href="{{ config.root }}{{ postItem.path }}">
  {# 标题最多 80 个字符，超过得话，使用 truncate 来截取 #}
  {% if postTitle.length < 80 %}
    {{ postTitle }}
  {% else %}
    {{ truncate( postTitle, {length: 80}) }}
  {% endif %}
  </a>
  <p class="page-title-sub">
    {# 显示时间 #}
    <span id = "post-title-date">{{ date(postItem.date, 'M-D') }}</span>
    {% if postItem.categories.length %}
    {# 组织分类的链接列表 #}
    <span id = "post-title-categories">{{ __('category_title') }}
    {% set i = 0 %}
    {% for cat in postItem.categories %}
      {% if i !== 0 %}
        {{'/'}}
      {% endif %}
      {% set i = i + 1 %}
      <a href="{{ url_for(cat.path) }}">{{ cat.name }}</a>
    {% endfor %}
    </span>
    {% endif %}
    {# 组织标签的链接列表 #}
    {% if postItem.tags.length %}
    <span id = "post-title-tags">
    {{ __('tag_title') }}
    {% set i = 0 %}
    {% for tag in postItem.tags %}
      {% if i !== 0 %}
        {{'/'}}
      {% endif %}
      {% set i = i + 1 %}
      <a href="{{ url_for(tag.path) }}">{{ tag.name }}</a>
    {% endfor %}
    </span>
    {% endif %}
    {# 有些在文章的头部指定了照片，也显示出来 #}
    {% if postItem.photos %}
      <br>
      {% set i = 0 %}
      {% for photo in postItem.photos %}
        {% set i = i + 1 %}
        {% if i <= 3 %}
          {# 这里使用了 fancybox 的一些功能，具体后面了解 #}
          <a class="fancybox-thumb" rel="fancybox-thumb" href="{{photo}}">
            <img src="{{photo}}" />
          </a>
        {% endif %}
      {% endfor %}
    {% endif %}
  </p>
  
</div>
```

这样，在需要使用的页面中，单个文章对象的常量名设置为 `postItem` 便可以组织为相应的结构。比如，在标签文章列表页，可以这样组织：

```js
{# 遍历所有文章，注意，单个文章的对象为 `postItem` #}
{% for postItem in site.posts.toArray() %}
  {% set isShow = false %}
  {# 确定一下某一个文章，是否包含当前这个标签 #}
  {% for tag in postItem.tags %}
    {% if tag.name === page.tag %}
      {% set isShow = true %}
    {% endif %}
  {% endfor %}
  {# 包含就显示 #}
  {% if isShow %}
    {% include 'includes/post-title-item.swig' %}
  {% endif %}
{% endfor %}
```


以上代码在 `layout/tag.swig` 中，[在线代码](https://github.com/stiekel/hexo-theme-random/blob/master/layout/tag.swig)。

### 首页

首页一般会包括一些链接和最近的几篇文章，使用的模板文章为 `layout/index.swig`。链接可以固定的，比如，显示首页、存档页。也可以从配置文件中读取链接列表，再予以显示。

如果要显示最近的几篇文章的列表，可以使用 `page.posts` 中的文章列表，注意加上翻页链接。

### 分类列表页与分类文章列表页

分类列表页显示博客里的所有分类，分类文章列表页显示某个分类中的文章列表。

Hexo 并没有专门分类列表页的模板，那该如何处理呢？一般是写在页面模板中，即 `layout/page.swig` 里，然后判断页面类型变量 `page.type`，如果是 `categories`，则显示分类列表页。再在博客里创建一个页面，指定其 `type` 为 `categories` 。实现方法如下，先来看看 `layout/page.swig` 中的代码：

```js
{% extends 'includes/layout.swig' %}

{% block body %}
  <article id="page">
    {% set page_title = page.title %}
    {# 判断是否是分类列表页，如果是，显示对应内容 #}
    {% if 'categories' === page.type %}
      <h1 class="center-title">{{ page_title || __('category_title') }}</h1>
      {{ list_categories() }}
    {# 显示普通页面的内容 #}
    {% else %}
      <h1 class="">{{ page_title }}</h1>
      {% autoescape false %}{{page.content }}{% endautoescape %}
    {% endif %}
  </article>

  {% include 'includes/pagination.swig' %}
{% endblock %}

```

要显示所有的分类，这里是使用了 `list_category()` 来显示，也可以从 `site.categories` 中遍历组织显示。接着，使用如下命令创建一个页面：

```sh
hexo new page categories
```

然后在站点的 `source` 文件夹下，会多出来一个名为 `categories` 的文件夹，只包括一个名为 `index.md` 的文件，内容如下：

```md
title: categories
date: 2016-06-19 10:29:23
---
```

将其内容修改为：

```md
title: 分类
date: 2016-06-19 10:29:23
type: "categories"
comments: false
---
```

这样，Hexo 在生成页面时，判断到 `type` 为 `categories`，便会生成分类列表。页面的地址为 `/categories/`。

而对于分类文章列表页，则需要在 `layout/category.swig` 中编辑。具体的文章列表，可以从 `page.posts` 中取，也可以从 `site.posts` 中取文章，再根据文章分类筛选显示。

### 标签列表页与标签文章列表页

这个与分类的处理类似，不做重复介绍。

### 归档页

归档页使用的 `layout/archive.swig` 模板，一般是按年或按月来显示文章。Hexo 里其实有专门按年和月显示的文章列表页，从 `page.posts` 里读取文章列表，再根据上文中提到的`is_month()` / `is_year()` 来组织显示。

文章列表显示比较简单，单说一点，如何按年分隔来显示文章列表，当然，按月分隔显示的操作也一样。

操作方法其实比较简单，先遍历 `page.posts` ，判断当年文章对比前一篇文章的发表年份是否变化，如果变化，则加一个年份的显示，代码实现如下：

```js
{# 先遍历一篇文章列表，找出每年各发了多少文章，以便显示 #}
{% set howMuch = {} %}
{% for postItem in page.posts.toArray() %}
  {% set thisYear = date(postItem.date, 'YYYY') %}
  {% if !howMuch[thisYear] %}
    {% set howMuch[thisYear] = 0 %}
  {% endif %}
  {% set howMuch[thisYear] = howMuch[thisYear] + 1 %}
{% endfor %}
{# 开始显示， lastYear 为上一篇文章的发表年份 #}
{% set lastYear %}
{% for postItem in page.posts.toArray() %}
  {# 当前文章的发表年份 #}
  {% set thisYear = date(postItem.date, 'YYYY') %}
  {# 如果当前文章年份与上一篇不一样，则显示年份 #}
  {% if thisYear !== lastYear %}
    {% set lastYear = thisYear %}
    <h3 class="archive-year-title">{{ thisYear }}
    {# 年份后面，显示一下这年共发表了多少篇文章 #}
    {% if howMuch[thisYear] %}
      <span class="posts-count">
      {{ __('total_title') }}
      {{ howMuch[thisYear] }}
      {% if 1 === howMuch[thisYear] %}
        {{ __('post_title') }}
      {% else %}
        {{ __('posts_title') }}
      {% endif %}
      </span>
    {% else %}
        {{ __('not_post') }}
    {% endif %}
    </h3>
  {% endif %}
  {% include 'post-title-item.swig' %}
{% endfor %}
```

### 图片与图片库

文章的图片放在 `photos` 之中，在 `page.photos` 和 `post.photos` 中都有。Hexo 主题一般的做法是使用 [FancyBox](http://fancyapps.com/fancybox/) 来展示图片。

两个地方可能要显示图片，一个是文章或页面的详情中， 另外一个是在各个文章列表中。

### 代码的显示

代码段一般是使用 [highlight]() 的样式，直接加载它的 css 就行。另外可能需要调整一下代码段的 `padding` 和 `margin` ，另外就是字体。具体被 highlight 处理后的代码段的 HTML 结构，请通过 Chrome 调试工具查看，这里就不列了。

除了代码段，在正文中之内还有一些代码文字，会使用 `<code></code>` 标签包裹，这个需要单独针对这个标签设置样式。比如，可以给一个浅灰的背景色，再改个字体，加个斜体等等。

代码的字体，可以 [www.cssfontstack.com](http://www.cssfontstack.com/) 上找一组合适的，并且兼容 Windows / OS X 的字符，比如下面这个：

```css
code, table .line{
  font-family: Consolas, Monaco, Courier New, Lucida Console;
}
```

## 主题的发布

如果你想要更多的人看到你的主题，可以考虑发布到 Hexo 官方网站的主题列表中。需要经过几个步骤来实现。

### 主题测试

官方提供了一个站点的示例，里面包含了多种需要考虑的可能情况。克隆 [hexo-theme-unit-test](https://github.com/hexojs/hexo-theme-unit-test) ，然后在这个站点里安装你的主题。并确定主题可以成功的处理如下几种类型的文章：

* 图片文章
* 无标题的文章
* 带摘要的文章
* 带视频的文章
* 带图库的文章
* 支持常用的标签，如代码块、Gist、jsFddle和引用等
* 标签是网址的文章
* 对东亚文字的支持——必然的

### 发布

先 Fork 官方站点，[hexojs/site](https://github.com/hexojs/site) ，然后克隆到本地，再编辑站点内 `source/_data/theme.yml`，增加一段如下的数据：

```json
- name: Random
  description: A hexo theme with random fullscreen background image.
  link: https://github.com/stiekel/hexo-theme-random
  preview: http://hexo-theme-random.herokuapp.com/
  tags:
    - responsive
    - one_column
    - background_image
    - random
    - iconfont
    - modal
```

然后再在 `source/theme/screenshots/` 文件夹中放一个主题截图，尺寸为 800 * 500 ，文件名与主题名字一致。可以参考[这个图片](https://raw.githubusercontent.com/hexojs/site/master/source/themes/screenshots/Random.png)。

其实主题制作，主要是各种细节，按你想要的样子去实现吧。