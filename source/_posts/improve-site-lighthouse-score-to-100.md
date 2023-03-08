title: 将站点的 Lighthouse 打分提升到100
date: 2023-02-11 08:55:40
tags:
    - 前端
    - Blog
categories:
    - 建站相关
---

Blog 一直在 [Vercel](https://vercel.com/)、[Heroku](https://www.heroku.com/)、[Netlify](https://www.netlify.com/) 几个免费托管平台中流浪，最近正好弄了一个香港的轻量服务器，配置不高，但网络和带宽还不错，于是想着把 Blog 迁移一下，迁完发现站点打开的速度简直是飞升，于是一时兴起决定用 Lighthouse 给首页打打分，结果四个关键分只有一个 SEO 是 90 的，可访问性甚至只有 76 分。天天工作中这优化那优化，要不就试试优化一下它。

<div style="text-align:center">
    <img src="/upfile/2023/02/lighthouse-initial-score.png" alt="初始打分"  />
</div>

## 首页的基本结构

Blog 是使用 Hexo 搭建的纯静态站点。首页正文内容为一个图片，若干个字体图标，几个超链接，内容页面非常简单。背景是使用 [Vegas](https://vegas.jaysalvat.com/) 显示的全屏轮播图，图片来自于 [Unsplash](https://unsplash.com/s/photos/random) 的随机大图，由于随机大图加载较慢，所以站点完全显示是并不快的。

## Performance 性能指标

一共有六个关键的指标来决定性能指标的最终得分，主要是衡量页面的加载速度、可交互性、稳定性和流畅程度。

### 得分情况

<div style="text-align:center">
    <img src="/upfile/2023/02/lighthouse-metrics.png" width="75%" alt="关键指标得分占比详情"  />
    <img src="/upfile/2023/02/lighthouse-performance.png" width="75%" alt="Performance 面板"  />
</div>

- [First Contentful Paint](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/) `585ms` __首次内容绘制用时__ ：页面打开后，首次有可视元素成功显示的时间。对于复杂的页面 FCP 是可以通过一些手段来降低的，比如用一个 Loading 占位。推荐值在 1800ms 以下；；
- [Largest Contentful Paint](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/) `1280ms` __最大内容绘制时间__ ：页面打开后到最大内容绘制所需的时间。比如这里的 LCP 就是 Vegas 组件成功绘制 Dom 的时间，但不包括成功加载背景图片的时间。推荐值在 2500ms 以下；
- [Speed Index](https://developer.chrome.com/en/docs/lighthouse/performance/speed-index/) `6098ms` __速度指数__ ：加载时的视觉显示速度，是 Lighthouse 通过录制视频，计算各桢之间的视觉进度，再由 [speedline](https://www.npmjs.com/package/speedline) 计算得出的，比如 Vegas 加载图片的速度就会反应到这一指标中。推荐值在 `3400ms` 以下。不过奇怪的是，直接将 Performance 面板的导出 json 传给 `speedline` 计算，得出的结果却是 `15512.2` （结果中没有给出这一数据的单位），与 Lighthouse 给出的结果并不一致。

<div style="text-align:center">
    <img src="/upfile/2023/02/speedline-result.png" width="50%" alt="speedline 计算结果"  />
</div>

- [Time to interative](https://developer.chrome.com/docs/lighthouse/performance/interactive/) `585ms` __可交互时间__ ：页面打开到可完全交互的时间，当页面内可见元素完成全部的事件注册，且交互可以在 50ms 内响应时，就进入可交互状态。由于事件注册大部分都是在 JavaScript 中进行的，所以 JS 的数量和大小直接影响到这一指标。推荐值在 `3800ms` 以下；；
- [Total Blocking Time](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/) `0ms` __总阻塞时间__ ：具体计算从 FCP 结束到可完全交互这一段时间内，所有 JS 加载和执行超过 `50ms` 部分的累加值，比如 FCP 后一共三个 JS 加载和事件注册，分别耗时为 `70ms / 40ms / 100ms` ，则 TTI 为 `20ms + 0ms + 50ms`。推荐值在 `200ms` 以下；
- [Cumulative Layout Shift](https://web.dev/cls/) `0ms` __累计布局位移__ ：对页面上可见元素发生布局偏移的的评价分。推荐值在 0.1 以下；

### 改进措施

通过上面六个指标的解读可以发现，Performance 主要通过以下两个方面来打分：

- 静态分析 HTML 页面中的资源加载和 DOM 结构
- 录制页面加载过程，站在访客的角度分析视频桢

<div style="text-align:center">
    <img src="/upfile/2023/02/lighthouse-performance-diagnostics.png" width="50%" alt="Performance 诊断报告"  />
</div>

它给出的改进建议为：

- [Ensure text remains visible during webfont load](https://web.dev/optimize-cls/)：首页中的图标是使用 iconfont 展示的，在字体加载期间会显示为柜形方框，这个可以通过给字体设置 `font-display: swap;` 解决，即在字体加载期间先使用系统字体显示，对于 iconfont 来讲，这个属性无法解决图标不可见的问题，但却可以满足这个诊断建议；
- [Registers an unload listener](https://web.dev/bfcache/)：百度统计中使用了 `unload` ，而不是浏览器推荐的 `pagehide` 或 `visibilitychange` 事件，这个没办法解决了；
- [Serve static assets with an efficient cache policy](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/)：对于静态资源文件，只要状态码是 200 / 203 / 206，且没有设置 `no-cache`，那就必须设置一个合理的缓存时间，推荐的时间是一年以上，不过实际上经过多次测试发现，`max-age` 设置到 `8337601` 秒（96天12小时1秒）就不再有这个提示，少一秒都不行。可以在 nginx 中添加如下的配置：

```conf
    location ~* .(?:css|js|png|jpeg|jpg|woff)$ {
      root   html/blog; # your path
      add_header Cache-Control "public, max-age=8337601";
    }
```

其它还有些不太重要的建议，比如[改进关键请求链](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains/)，[降低传输文件的大小](https://web.dev/use-lighthouse-for-performance-budgets/)、避免字体图标布局位移，[不使用非合成动画](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations/)——Vages 的进度条使用了一些绝对定位属性等。

在改进上述建议后再跑测试时，还陆续给出了如下几个建议：

- 文本类资源（js / css）使用 gzip 压缩
- 减少引用未使用的 JavaScript / CSS 文件
- 非关键 JavaScript / CSS 文件在加载时使用 `defer` 属性——这块的判断并不准确，多个关键资源也给出了这个提示
- 使用 Webp / avif 文件格式替代 png / jpeg 文件

在对页面分析时，Lighthouse 并没有排除 Chrome 插件的注入，需要测试者手动关闭插件使用。

#### Vegas 背景图加载过慢问题

Lighthouse 给出的建议主要是围绕字体文件、`unload` 事件注册、静态资源缓存配置等几个方面，但实际上影响最大的 Vegas 图片加载过慢问题并没有诊断出来，可能是 Performance 对 JavaScript 中触发的异步资源加载识别有问题，由于 Vegas 是在页面加载完成后才修改背景图，所以对 FCP 和 LCP 没有除了资源加载之外的影响，但的确会导致页面内容的变化，所以对逐帧分析得出的 Speed Index 指标是有非常大的影响的。

Vegas 使用了 Unsplash 的随机大图来作为背景图片，Unsplash 在高峰期的响应时间非常长，在测试时的图霸加载时间超过了 9s ，

<div style="text-align:center">
    <img src="/upfile/2023/02/lighthouse-unsplash-bg-load.png" width="50%" alt="Unsplash 图片资源加载影响了 Speed Index 指标"  />
</div>

当然，这个解决的办法也比较简单，下载几十张图片，放到自有服务器或者 CDN 中作为 Vegas 的背景图。

另外，Vegas 默认会在底部显示一个图片播放的进度条，在显示背景图时会使用动画过渡，而且由于选择的动画特效不同，持续时间也会有所不同。这两点都会导致帧内容的变化，从而影响 Speed Index。

<div style="text-align:center">
    <img src="/upfile/2023/02/lighthouse-metrics-100.png" width="75%" alt="关键指标100分"  />
</div>

虽然还有像字体加载显示、`unload` 事件等多个优化没有做，但影响打分最主要的几个方面已经解决，多测几次，总是可以打到 100 分的。

## 可访问性
<div style="text-align:center">
    <img src="/upfile/2023/02/lighthouse-accessibility-initial.png" width="50%" alt="关键指标100分"  />
</div>

可访问性虽然分数很低，但给出的修复建议也相对简单：

- 图片都需要对应的 `alt` 属性，这个是影响可访问性得分权重最高的项目，修改这一点，即可将得分从 76 分上升到 95 分
- 页面的前景色和背景色之间的对比度：经多番测试发现，是由于左下角的 Hide 按钮的背景色、前景色对比度过低，且设置了较高的透明度导致的。将背景色从 `#1E824C` 调整为 `#0b2d1b`，普通状态下的 `opacity` 从 `0.25` 调整为 `0.65`，`hover` 状态下的 `opacity` 从 `0.95` 调整为 `1`，即可满足该建议的要求


## 最佳实践

主要的改进建议如下：

- 支持 https 协议：这个好说，目前有很多免费签发的证书，大部分域名注册机构也提供证书
- 正确设置 HTML 的 `doctype`
- 组件库的安全漏洞问题，这里使用了 jQuery@2.2.3 ，升级至 3.6.4 解决

另外还有建议[添加 CSP 配置](https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/?utm_source=lighthouse&utm_medium=devtools)，不过这项并不影响得分。改掉上述几项，就可以在最佳实践中获得满分。

## 搜索引擎优化 SEO

SEO 主要是提升搜索引擎抓取时的体验，所以建议几乎都是关于文档本身的，比如对 meta 部分的要求，对文档、链接、图片的描述信息，页面内链接的可访问性等等。

SEO 的分数原本是 90 分，在给图片添加上 alt 属性之后，SEO 也来到了 100 分。

## 总结

Lighthouse 的打分并不是很稳定，尤其是 Performance 部分，当然，对站点整体体验最重要的也是这部分。改造的时候也不能拘泥于建议，比如这次建议就没有包含对 Speed Index 影响最重要的 Vegas 改造部分。另外还有个小采收，当你的打分全部是 100 的时候，Lighthouse 还会为你放烟花。

<div style="text-align:center">
    <img src="/upfile/2023/02/lighthouse-all-100.png" width="50%" alt="关键指标100分"  />
</div>

单纯为了追求分数，并不一定能让页面的体验达到最优，最直接的就是取消 Vegas 的图片显示、过渡特效后，页面给人的设计感至少降低了一半。打完分还是直接开启了动画。
