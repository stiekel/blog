title: 2025 年的 React 最佳实践
date: 2025-01-17 05:48:14
tags:
  - 前端
categories:
  - 编程杂记
---

## 将逻辑代码从组件中抽象到自定义的 hooks 中

React 的 Hooks 是近几年中一个非常重要的新功能，在 Vue 3 中也引入了这个概念，目的是为了解决函数式组件中没有生命周期，没有数据管理状态的问题。日常在开发过程中，一定要站在 Hooks 的角度来思考代码的组织，先考虑一个组件中的哪些功能可以抽象出来。利用好 Hooks 可以帮忙我们提升代码的模块化与解耦，它有这两个优点：

- 方便进行逻辑的复用
- 关注逻辑与UI的分离

Hooks 的自定义也非常简单，本质上它也是一个函数，满足以下两点，就是一个 Hooks：

- 使用 use 作为名字前缀
- 在代码中使用了其它 Hooks，包括 React 自带的 Hooks，或者各种自定义的 Hooks

在以下几个场景中，都可以应用 Hooks 理念来实现：
- 抽离业务与逻辑
- 封闭通用的逻辑
- 拆分复杂组件

## 尽量少用 useEffect

`useEffect` 一般用在以下几种场景：

- 请求数据
- 设置 `setInterval` / `setTimeout` 等
- 操作 DOM
- 注册事件监听器, 事件绑定，在 React Native 中可以注册 NativeEventEmitter
- 任何其他不属于简单地基于 `props` 或 `state` 计算的行为

`useEffect` 是一个功能非常强大，但实际并不很好用或者说有一定使用门槛的功能，比如，经常会碰到这些情况：

- 无限循环：由于在勾子里直接或间接修改了依赖，导致不停的执行
- 不能使用 `async` / `await`
- 严格模式在开发阶段中导致执行两次的“问题”
- 带来的性能问题：由于频繁的执行，副作用操作导致过多耗时，影响用户的体验
- 大量的 `useEffect` 导致代码可读性降低

实际工作中，如果可以借助其它方法或者第三方 Hooks 处理的事情，尽量不要使用 `useEffect` 。

## 使用 TypeScript

使用 TS 的好处：
- 类型安全：在编译时就发现问题，减少潜在的问题
- IDE 友好：使得编译器可以更好的自动补全、代码跳转，提升开发效率
- 大型项目和大型团队友好：提高可维护性，更好的方便多人协作
- 比普通 JS 更先体验一些语言新特性

## 注意 debounce

在前端页面中，很多事件都会快速的重复触发，比如：

- 浏览器的 resize / scroll 等事件
- 用户的输入

如果组件中依赖上述的变化来做出各种不同的操作和响应，则很有可能带来性能问题，此时就可以通过防抖和节流来忽略部分事件，减少耗时操作的执行次数。

## 使用 `useQuery` 处理请求

我们通常发出一个 API 请求，通常需要做这些事情：

- 保证请求的返回值
- 处理出错
- 记录错误有关信息，如错误原因、出错次数、出错时间等
- 处理 loading
- 当某些值发生变化时，重新发出请求
- 记录上次请求完成的时间
- 是否已经发出过请求
- 是否已经成功收到过返回
- 出错后重新尝试若干次
- 设置定时重复发出请求

可见，要完整的处理一个 API 请求，需要记录很多状态，好在已经有很多第三方的 Hooks 可以帮我们处理这些，比如 [@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) 的 `useQuery` 。

## React.Fragments

对于一个组件来讲，它本质上就是一个函数，只不过返回的是一个 JSX。由于 JS 函数只能返回一个值，所以 React 组件返回的 JSX 只能有一个根节点。如果非要返回多个 JSX 元素该怎么办呢？使用 `Fragments` 将它们包起来即可。相对于使用一个 `div` 来包裹，它有以下几个好处：

- 不会创建一个多余的父子组件关系
- 不会增加一个 DOM
- 无论是 JSX 源代码，还是生成的 HTML，可读性都更好

## useCallback & useMemo

它们的目的都是用来缓存，useCallback 用来缓存函数，useMemo 用来缓存一个值，当然，函数也作为作为一个特殊的值。它们用来提升 React 渲染组件时的性能，可以实现以下两个效果：

- 减少一次渲染中的工作量
- 减少一个组件重新渲染的次数

但随着 React 19 的发布，优化了很多重新渲染时的逻辑，大大的降低了使用这两个钩子的好处。

## 减少在 JSX 中使用匿名函数

我们一般会这样在 JSX 中处理一些简单的事件：

```jsx
<Drawer
  visible={visible}
  title={<>标签</>}
  afterClose={() => onVisibleChange?.(false)}
/>
```

这样虽然写起来方便，但实际上相当于每次渲染都重新生成一个 `afterClose` 事件的处理函数，更好的做法是这样：

```jsx
const handleAfterClose = useCallback(() => {
  onVisibleChange?.(false);
}, []);

<Drawer
  visible={visible}
  title={<>标签</>}
  afterClose={handleAfterClose}
/>
```

## ErrorBoundary

使用 try catch 可以处理同步代码中的错误，使用 Promise.catch 可以处理异步操作中的错误，那如果 React 组件在渲染中出错了呢？那此时就可以使用 ErrorBoundary。

ErrorBoundary 的作用如下：

- 捕获组件渲染中的同步错误
- 出错后降级渲染其它内容
- 上报错误信息，便于问题的分析与处理

但 ErrorBoundary 不能处理以下几种错误：

- 只能处理子组件的错误，不能处理自身的错误
- 异步错误
- 事件中的错误

一个组件，只要包含`static getDerivedStateFromError()` 或 `componentDidCatch()`，就是一个ErrorBoundary，可见，ErrorBoundary 都是类组件。

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(`[ErrorBoundary][componentDidCatch] error: ${error}, errorInfo: ${errorInfo}`);
    this.setState({
      error,
      errorInfo
    });
    // Report error ...
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div>
          <h2>Error Catch</h2>
          <p>{error && error.toString()}</p>
          <p>{errorInfo && errorInfo.componentStack}</p>
        </div>
      );
    }
    return children;
  }
}

// 编写一个组件，让它在特定的时机时触发致命错误
function Demo() {
  const [num, setNum] = useState(0);
  // 触发渲染错误
  if (num > 0) {
    throw new Error('num > 0');
  }
  return (
    <div>
      Demo
      <button onClick={() => {C
        setNum(num + 1);
      }}>
        trigger Error
      </button>
    </div>
  );
}

function App() {
  return (
    // 用 ErrorBoundary 来包裹需要处理的子组件
    <ErrorBoundary>
      <Demo name="test demo" isShow={false} />
    </ErrorBoundary>
  );
}
```

## 中大型项目的工程实践

- 基于 monorepo 的全生命周期解决方案，解决从项目创建、依赖管理、开发调试、公共库、代码风格、代码提交、打包构建等一站式解决方案。使用 monorepo 有如下几个方面的优势：
  - 单一仓库，可以统一工程配置、代码风格，规范 Git 提交
  - 方便代码复用，尤其是与业务相关的代码复用
  - npm 包本地调试更加便捷
  - 可以统一构建和部署流程
- UI 组件库：为什么每个到一定规模的公司都会推出自己的Design：
  - 提升内部的开发效率和代码质量
  - 统一自己的设计语言和设计风格
  - 向开源社区展示公司形象
  - 在公司内创造一个好的技术氛围
- 业务组件库：一般在命名中有 Market / Material / Pro 之类。它是在普通 UI 组件库的基础上，对多个 UI 组件进行组合，或者加入一些业务场景和特有的逻辑而实现的更复杂的组件库。
- 微前端解决方案：一种功能分治方案，将多个项目组合在一个页面中显示，这些项目是完全独立的，有不同的开发团队，不同的开发、测试、发布节奏，甚至连使用的前端开发框架都是不同的。
- 微组件解决方案：是另外一种功能分治的方案，相对微前端来讲，每个微组件也是完全独立的，有完全独立的开发、测试和发布。但一般都是某一种框架的组件，使用时与普通其它组件无异，可以传入 `props`，接受事件，甚至直接共享状态管理，但一般都会像微前端方案一样进行样式隔离，JS执行环境的隔离，防止出现安全风险。
