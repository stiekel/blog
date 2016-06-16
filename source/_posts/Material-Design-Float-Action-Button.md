title: CSS 模拟实现 Material Design 样式的悬浮操作按钮
date: 2016-06-05 08:08:19
tags:
  - 前端
categories:
  - 随手记
---
Material Design 的悬浮操作按钮虽然会挡住一部分页面内容，但的确提供了一种不错的表现操作按钮的思路。手里一个微信的项目正好准备试试用这种风格来表现创建一类的操作。关于 Material Design 的按钮介绍，可以看[这里](https://www.google.com/design/spec/components/buttons.html#buttons-button-types)。

这里实现一个类似于 Gmail App 中的新建邮件按钮风格类似的样式，为了简便，就直接使用一个样式来完成，元素的 HTML 如下：

```html
<div class="float-action-button"></div>
```
### 按钮的定位

悬浮操作按钮一般是位于屏幕的右下方，并且位置不随网页的滚动而变化。这可以通过设置 `position` 为 `fixed` 来实现，位置则通过 `bottom` 和 `right` 来指定。另外还修改一下光标的指针样式：

```css
.float-action-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}
```

### 按钮的颜色与形状

这里的颜色包括四个，分别是：

* 按钮的主体背景色
* 按钮的边框颜色
* 按钮中铅笔图标的铅笔颜色
* 按钮的阴影色

其中前两个颜色类似，而主体色要比边框色稍微浅一点。如果你有颜色选择困难症，可以直接使用 [Material Design 颜色推荐表](https://www.google.com/design/spec/style/color.html#)，或者试试这两个扁平化设计颜色推荐网站：[flatuicolorpicker.com](http://www.flatuicolorpicker.com/)、[flatuicolors.com](https://flatuicolors.com/)。我用的是 flatuicolorpicker 上的颜色。

圆形通过设置 `border-radius` 可以实现，其值大于 `50%` 时可以表现为圆形。这里借助 `padding` 来设置按钮的大小。

设置颜色和形状如下：
```css
.float-action-button {
  background-color: #D91E18;
  color: #F2F1EF;
  border-radius: 50%;
  padding: 30px;
}
```

### 按钮的图标

按钮中有一个铅笔的图标，这里为了简单，直接使用一个图片来实现。目前发现的最丰富的图标资源站，当然是 [iconfont](http://iconfont.cn/) ，搜索 `pencil` 可以找到 258 个图标，挑一个就行。但要注意，因为背景色为深色，为了使铅笔看起来相对明显一点，最好选择图标中着色面积大的。鼠标指向图标可以显示下载按钮，着色要与背景色形成对象，使用白色，或者浅灰，这里直接使用 iconfont 推荐的 `#ecf0f1` 。

背景图要设置为居中，不重复。大小为整个按钮大小的一半——将 `background-size` 设置为 `padding` 值即可。

```css
.float-action-button {
  background-image: url('./pencil.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30px;
}
```

### 按钮的边框

按钮有一个很细的边框，颜色相对背景色要稍深一点，通过 `border` 来设置：

```css
.float-action-button {
  border: 1px solid #CF000F;
}
```

### 按钮的阴影

CSS 的阴影有两种， `text-shadow` 和 `box-shadow` ，前者用于指定文字阴影，这里要使用 `box-shadow`，它典型的值有五个，分别是x轴偏移、y轴偏移、blur 模糊的半径、发散半径、阴影颜色。悬浮操作按钮只有 y 轴偏移。而且颜色很浅。

```css
.float-action-button {
  box-shadow: 0px 3px 9px 2px #BFBFBF;
}
```

### 悬停样式

当鼠标经过和点击之后，要模板一个按钮按下的效果，直接通过修改背景色和加大阴影 y 轴偏移即可，如下：

```css
.float-action-button:hover {
  background-color: #F22613;
  box-shadow: 0px 6px 9px 2px #BFBFBF;
}
```

### 最终效果

请参见 [Demo](/code/floatActionButton.html)。

