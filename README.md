# react-next-study
这是使用 react + next 实现的一个同构的项目



为什么需要使用 react + next 实现一个同构的项目呢 这是因为在传统 react 项目中 是采用前端渲染的方式进行项目的开发 这种开发的方式存在着诸多的弊端

+ 无法实现 SEO 排名优化
+ 页面加载缓慢等问题
+ 初始化数据都是通过前端实现
+ 。。。



所以通过使用 react - next 配合就可以开发服务端渲染的页面 以上存在的问题就得到解决

Koa 是一个轻量级的服务端的框架 非常容易进行扩展 符合 js 函数式编程





## 创建 next 项目

+ 手动创建

  + 初始化项目的文件目录

  + 安装 react react-dom next

  + 配置启动命令

    ```javascript
    "scripts": {
        "dev": "next",
        "start": "next start",
        "build": "next build"
      },
    ```

  + 新建 pages 文件目录【在next项目中文件的目录即路由形式】页面对应的根目录就是 pages 文件 index.js 就是跟路由页面

    ```javascript
    # 这是不需要需入 react 模块
    export default () => <span>这是最基础页面</span>
    ```

    

+ 脚手架创建

  + 首先需要安装 next 脚手架工具

    ```javascript
    yarn add create-next-app -g
    ```

  + 运行安装命令

    ```javascript
    create-next-app create-next-app
    ```

  + 运行项目

    ```javascript
    yarn dev
    ```

    

## next 作为 koa 中间件使用

为什么需要使用 koa？

next 框架只能将数据和页面的进行融合生成 新的额 html 文件 对于服务器端处理 http 路由 session 数据库 相关的东西不能使用next 负责 只能使用 koa 来服务

```javascript
const Koa = require('koa')
const next = require('next')

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.response = false
    })

    server.listen(3000, () => {
        console.log('server is running 3000 😤😤😤')
    })
})
```



## 使用 ioredis 模块连接 redis

安装 ioredis 模块 相比于之前的 redis 模块性能更高

```javascript
async function test() {
    const Redis = require('ioredis')

    const redis = new Redis({port: 6379})
    const keys =  await redis.keys('*')
    console.log(keys)
}

test()
```



## 集成 antd 模块

注意： 在 next 项目中是无法集成原生的 css 在next 中可以使用插件的机制的引入样式文件

在根目录下新建 next.config.js

安装 **@zeit/next-css** **yarn add @zeit/next-css**

```javascript
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}

module.exports = withCss({})
```

通过以上处理之后就可以在页面中引入 css 样式了 但是样式的引入不能单个引入 只能全组件引入



安装 antd babel-plugin-import

在根目录下新建 .babelrc

```javascript
{
    "presets": ["next/babel"],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd"
            }
        ]
    ]
}
```

在 pages 目录下新建 _app.js 【写这个文件的目的是为了重写默认的 app.js 】

```javascript
import App from 'next/app'
import 'antd/dist/antd.css'

export default App
```



组件中就可以正常引入的组件

```javascript
import './index.css'
import { Button } from 'antd'

export default () => (
    <div className='btn'>
        <Button type="primary">确定</Button>
    </div>
)
```



## next 的目录架构

**文件即路由**

pages 是重要的 pages 就对应着页面 下面文件就对应着一个具体的页面 如在 pages 下新建 a.js 文件 就对应 http://localhost:3000/a

但是 有两个文件除外 一个文件是 _app.js 【重写默认是 app.js 文件使用】



Component 页面上使用到的组件的有一部分是公有的 这部分的组件就需要将组件的移动到 component 目录下进行存放

lib 存放其他非组件性的代码 如一些类库形式的代码

Static 存放一些静态资源的文件 如 icon images ...

.next 这个目录是一个非常特殊的目录是有 next 默认生成的目录【启动服务之后编译出来的文件】



## 路由基础

+ 标签跳转

如何做页面的之间的路由跳转呢 这时候就需要用到 next 组件 link 组件 【进行前端的路由跳转】

注意： 内部只能适应单一组件 只能进行路由的跳转 和渲染指定的内容

```javascript
import Link  from 'next/link'

export default () => (
    <div>
        <Link href='/a'>
            跳转
        </Link>
    </div>
)
```

+ 手动 js 跳转

```javascript

```





## 动态路由

只能通过 js 做路由跳转 通过 query 对象进行跳转

标签跳转

```javascript
 <Link href='/a?pageIndex=1' title='这是什么嘛!!'>
   <Button type="primary">确定</Button>
</Link>
```

js

```javascript
router.push({
  pathname: '/a',
  query: {
    pageIndex: 2,
    name: 'xiao',
    age: 18
  }
})
```

如何获取参数

```javascript
import { withRouter } from 'next/router'

const component = ({router}) => <span>这是什么嘛@@{router.query.name}</span>

// 经过 withRouter 包装过后 就可以在 组件中使用 router 得到路由信息
export default withRouter(component)
```



## 路由映射

在实际项目中为了能够将参数的信息进行隐藏 需要使用路由映射相关的技术

```javascript
#原本的参数
http://localhost:3000/a?pageIndex=2&name=xiao&age=18

# 实际参数
http://localhost:3000/a/1
```



这个时候就可以通过路由映射将信息隐藏

```javascript
# as='/a/1'
<Link href='/a?pageIndex=1' title='这是什么嘛!!' as='/a/1'>
  <Button type="primary">确定</Button>
</Link>

router.push({
  pathname: '/a',
  query: {
    pageIndex: 2,
    name: 'xiao',
    age: 18
  }
}, '/a/2/xiao/18')
```

http://localhost:3000/a/2/xiao/18 这个时候 因为路由信息已经被映射成为了这种形式 那么在此刷新 就会出现 404 页面 此时需要服务端配置路由信息



安装 **koa-router**

服务端

```javascript
const Router = require('koa-router')

router.get('/a/:id', async ctx => {
  console.log('路由进来了')
  const id = ctx.params.id
  console.log('id', id)
  await  handle(ctx.req, ctx.res, {
    pathname: '/a',
    query: { id }
  })
  ctx.response = false
})
```



## 路由变化的钩子

+ routeChangeStart 路由即将变化
+ routeChangeComplete 路由已经变化
+ routerChangeError 路由错误的API 基本不会用到 因为在路由中得到错误就会进入指定的组件
+ BeforeHistoryChange 历史路由变化
+ HashChangeStart hash 路由即将变化
+ HashChangeComplete hash 路由已经变化



通过 Router.events.on('事件名', () => {}) 就可以得到具体事件





## next 获取数据的方式

在 pages 页面中 可以通过 getInitialProps 方法获取 数据 但是 getInitialProps 指针对 pages 目录下的组件才有这个方法 component 组件下没有这个方式



在页面组件上 getInitialProps 方法 进入可以得到具体数据 在 _app.js 文件还可以得到全局性的数据

```javascript
component.getInitialProps = () => {
    // 这是返回对象 会融合进 组件 props
  	// 服务端运行之后 将数据和页面混合生成最新的返回前端
    return {
        sex: '女'
    }
}
```

getInitialProps 这是方法可以在服务端和客户端执行 但是如果在服务端执行之后 前端就不需要执行

有时候获取数据是通过 异步获取的 这是后这个方法就可以写成 异步代码 在代码块中就可以 await 阻塞

```javascript
component.getInitialProps = async () => {
    // 这是返回对象 会融合进 组件 props

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({sex: '男'})
        }, 5000)
    })

    return await promise
}
```



## 自定义 App

在 next z系统中呢 默认是有一个 app 页面组件 在实际项目的开发中我们不能使用默认的组件进行开发 那么这个时候就需要覆盖默认的 app 组件 在 pages 目录下新建 _app.js 文件

覆盖之后有什么用呢

+ 固定 layout 控制具体的布局
+ 保持共有状态信息 redux
+ 该页面传入一下具体的数据
+ 自定义错误处理



```javascript
import App, { Container } from 'next/app'
import 'antd/dist/antd.css'

// 当使用 类组件集成 app 组件的之后 子组件的 getInitialProps 方法不再执行
class myApp extends App {

    // 手动调用子组件的 getInitialProps 方法
    // 页面切换都会被执行 所以需要判断方法是否存在
    static async getInitialProps({ Component }) {
        return {
            pageProps: await Component.getInitialProps ? Component.getInitialProps() : ''
        }
    }

    render() {
        // Component 对应的就是渲染的具体的页面
        const { Component, pageProps } = this.props

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}

export default myApp
```

以上就是处理自定义的app组件 后期会有很多的东西就会融入这个组件中



## 自定义documeng

documeng 是在服务端渲染的时候才会使用到的 用来修改服务端渲染的文档的作用

常常配合第三方的 css in js 方案进行使用

在 pages 目录下新建 _document.js 文件

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document'

class myDocument extends Document {
  	// 以下这些可以不用覆盖 但是一旦覆盖 就必须覆盖完全
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx)
        return { ...props }
    }

    render() {
        return (
          	// 以下这些可以不用覆盖 但是一旦覆盖 就必须覆盖完全
            <Html>
                <Head>
                    <title>自定义的 document</title>
                    <style>{`.bg { color: red }`}</style>
                </Head>
                <body className='bg'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default myDocument
```

以上就是重写页面生成的文件

注意事项：

+ 不推荐此页面直接修改 title 而是在页面的中进行修改 因为不同的页面的文件的都会不同
+ 自定义 app 的时候。

```javascript
static async getInitialProps({ Component, ctx }) {
  return {
    // 这里也需要传入 ctx
    pageProps: await Component.getInitialProps ? Component.getInitialProps(ctx) : ''
  }
}
```



## 组件中自定义样式文件

+ 默认样式方案

在组件中 使用 style 组件设置的单独的样式

```javascript
<Fragment>
  <div>这是a页面 {a} {sex}</div>
  <style jsx>
    {
      `
      div {
        color: green;
        font-size: 40px;
      }
    `
  }
  </style>
</Fragment>
```

加入之后 生成的样式就会使用 css module 单独设置的样式

设置全局样式

```javascript
// 组件渲染之后编译生成代码放置在 style 标签中 组件卸载之后样式删除
<style jsx global>
  {
    `
      div {
        color: green;
        font-size: 40px;
      }
    `
  }
</style>
```

[styled-jsx](https://github.com/vercel/styled-jsx)



+ 自定义样式方案

  在使用自定义的样式方案的时候 首先需要增强 App 组件的和 路由渲染组件

  ```javascript
  function withLog(Comp) {
      return props => {
          return <Comp {...props} />
      }
  }
  
  ctx.renderPage = () => originalRenderPage({
                  // App 参数是增强过后的 App 组件
                  // withLog 在此增强 App 组件
                  enhanceApp: App => withLog(App),
  
                  // 返回的是请求路径指定渲染 组件
                  // withLog 在此增强 Component 组件
                  enhanceComponent: Component => withLog(Component)
              })
  const props = await Document.getInitialProps(ctx)
  return { ...props }
  ```

  + [Styled-component](https://github.com/styled-components/styled-components)

  + ```shell
    yarn add styled-components babel-plugin-styled-components
    ```

  + 配置 bebalrc 文件

  ```javascript
  {
      "presets": ["next/babel"],
      "plugins": [
          [
              "import",
              {
                  "libraryName": "antd"
              }
          ],
          [
              "styled-components",
              {
                  "ssr": true
              }
          ]
      ]
  }
  ```

  ```javascript
  import { ServerStyleSheet } from 'styled-components'
  
  static async getInitialProps(ctx) {
          const sheet = new ServerStyleSheet()
          const originalRenderPage = ctx.renderPage
  
          try {
              ctx.renderPage = () => originalRenderPage({
                  // App 参数是增强过后的 App 组件
                  // withLog 在此增强 App 组件
                  // enhanceApp: App => withLog(App),
                  enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
  
                  // 返回的是请求路径指定渲染 组件
                  // withLog 在此增强 Component 组件
                  // enhanceComponent: Component => withLog(Component)
              })
  
              const props = await Document.getInitialProps(ctx)
              return {
                  ...props,
                  styles: (
                      <Fragment>
                          {props.styles}{sheet.getStyleElement()}
                      </Fragment>
                  )
              }
          } finally {
              sheet.seal()
          }
      }
  ```

在组件中就可以使用 styled-components 组件创建样式

```javascript
import styled from 'styled-components'

const Title = styled.h1`
    color: #ccc
`
```







## 异步模块和组件的加载 LazyLoading

在实际项目开发过程中 我们不可能只是将项目的整体打包到一个文件中 实际中都是按需加载 异步方式渲染

+ 异步加载模块

  + moment 举例 【这个模块比较大】

  ```javascript
  a.getInitialProps = async () => {
      // 这是返回对象 会融合进 组件 prop 异步加载模块
      const moment = await import('moment')
  
      const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve({
                  sex: '男',
                	// 这里需要模块的 default 
                  time: moment.default(Date.now() - 60 * 1000).fromNow()
              })
          }, 5000)
      })
  
      return await promise
  }
  ```

+ 异步加载组件

```javascript
const AutoComponent = dynamic(import('../component/AutoComponent'))

// 当组件渲染的时候才会进行异步的加载
```



## next 配置

next.config.js

```javascript
const config = {
    // 编译输出的文件目录
    distDir: 'dist',
    // 是否给每个路由生成 Etag [Etag 是用于做缓存验证的]
    generateEtags: true,
    // 页面内容缓存配置 针对开发环境
    onDemandEntries: {
        // 内容在内存中的缓存的时间 (ms)
        maxInactiveAge: 25 * 1000,
        // 同时缓存的多少个页面
        pagesBufferLength: 2,
    },
    // 在 pages 目录下那种文件的后缀会被认为是页面
    pageExtensions: ['jsx', 'js'],
    // 配置 buildId
    generateBuildId: async () => {
        if(process.env.YOUR_BUILD_ID) {
            return process.env.YOUR_BUILD_ID
        }

        // 返回 null 代表着 使用默认的 unique id
        return null
    },
    // 配置 webpack
    webpack(config, options)  {
        return config
    },
    // 修改 webpackDevMiddleWare 配置
    webpackDevMiddleware: config => {
        return config
    },
    // 可以在页面获取指定的数据
    env: {
        customKey: 'value',
    },
    // 下面两个需要通过 'next/config' 来进行读取
    //只有在服务端渲染才会获取的配置
    serverRuntimeConfig: {
        mySecret: 'Secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    // 客户端和服务端都可以使用的配置信息
    publicRuntimeConfig: {
        staticFoldr: '/static'
    }
}
```

[webpackDevMiddleware](https://github.com/David-Shi-1989/Vue-webpackDevMiddleware)



## SSR 流程

+ 页面请求 【之后的请求】

发起 => 浏览器发起/ pages 请求 => Koa 收到请求 调用 nextJs => nextJs 开始渲染 => 调用 App getInitialProps 方法 => 调用页面的 getInitialProps 方法 => 渲染页面HTML => 浏览器解析渲染



+ 点击链接按钮 => 异步加载页面的组件 => 调用页面的 getInitialProps => 数据返回 路由变化 => 渲染新的页面



## React Hooks 将来组件开发的方式

传统的 react 组件是采用的 class 模式进行开发 在 16.8 之后是可以变成函数风格 【函数式编程】

类组件的存在的缺点：

+ 难以服用的状态逻辑
+ 难以琢磨生命周期
+ 混淆的副作用 【this ...】



## React 最新特性以及 context 介绍

+ Context 提供了一种方式 能够让数据在组件书中传递而不用一级一级手动传递 【但是组件的节藕性和独立性较差】

  ```javascript
  import { Component, createContext } from 'react'
  
  // 这是创建 context 的方法
  const BatteryContext = createContext()
  // 这是创建 context 的方法写入默认值
  const OnlineContext = createContext(false)
  
  
  function Leaf() {
      return (
        	// 使用 context 值的消费者
          <BatteryContext.Consumer>
              {
                  battery => (
                      <OnlineContext.Consumer>
                          {
                              online => (
                                  <h1>Battery: {battery}, Online: {String(online)}</h1>
                              )
                          }
                      </OnlineContext.Consumer>
                  )
              }
          </BatteryContext.Consumer>
      )
  }
  
  class Middle extends Component {
      render() {
          return (
              <Leaf />
          )
      }
  }
  
  class Home extends Component {
  
      state = {
          battery: 0,
          boolean: false
      }
  
      render() {
          const { battery, boolean } = this.state
          return (
            	// 创建的 Context 创建生产者 写入执行值
              <BatteryContext.Provider value={battery}>
                  <OnlineContext.Provider value={boolean}>
                      <button onClick={() => this.setState({battery: battery + 1})}>改变</button>
                      <button onClick={() => this.setState({boolean: !boolean})}>改变</button>
                      <Middle />
                  </OnlineContext.Provider>
              </BatteryContext.Provider>
          )
      }
  }
  
  export default Home
  ```
  

  
+ ContextType  

  由于 context 属性特性 导致 context 属性不可以大规模的使用 如果有多个的 context 就会导致的大量代码产生

  这个时候就可以使用  contextType 数据进行缩减

  ```javascript
  class Leaf extends Component{
    	// contextType 只能使用一个
      static contextType = BatteryContext
  
      render() {
          const battery = this.context
  
          return (
              <h1>Battery: {battery}</h1>
          )
      }
  }
  ```

+ lazy [运行时]

传统的页面开发会将整个项目文件单独打包到一个指定的文件中 导致打包的文件过大 而用户的暂时没有使用到的资源其实是可以不用进行加载的 这个时候就可以用到延时加载的技术 => 异步渲染

webpack => code splitting 代码拆分技术

+ Suspense [运行时]

```javascript
import { Component, lazy, Suspense } from 'react'

// 使用 lazy 加载组件的就会存在一个加载的空档时间
// 这个空档时间的是需要显示执行的组件 需要指定显示组件 需要 Suspense 组件配合

// 可以使用魔法注释注释指定的内容
const About = lazy(() => import(/*·webpackChunkName: "about"·*/'../component/About'))

class Home extends Component {

    state = {
        hasError: false,
    }

    // 一旦组件的异步加载出现问题就设置一个状态标志位
    // componentDidCatch() {
    //     this.setState({
    //         hasError: true
    //     })
    // }

    // 这是解约式写法
    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }

    render() {
        const {hasError} = this.state
        return hasError ? (<div>error</div>) : (
            <div>
                {/*Suspense 将异步加载的组件的进行包裹*/}
                {/*fallback 需要传入 jsx 作为加载状态的显示内容 是组件实例*/}
                <Suspense fallback={<div>加载中...</div>}>
                    <About/>
                </Suspense>
            </div>
        )
    }
}

/**
 * 在使用的 lazy 进行组件的加载时 如果组件出现加载的错误的情况 就会产生组件的无法正常的渲染而报错的问题
 * 针对这个问题 在 React 中有一个的错误的边界概念 ErrorBoundary
 * 这个 ErrorBoundary 其实意义不大 实际使用的 componentDidCatch 的生命的周期
 * 在 componentDidCatch 生命周期中设置的一个标志位 hasError
 * 如果为镇 则渲染指定指定的错误的组件 如果为假渲染 指定的组件
 */

export default Home
```



+ Memo

 当父组件 state 改变的时候 就会连子组件的也会随着渲染   [但是这里的子组件其实没有必要渲染的] 如何优化

早期可以使用 shouldComponentUpdate 生命周期进行优化 判断传入的值和现在的值是否发生相等进行判定渲染

```javascript
shouldComponentUpdate(nextProps, nextState) {
  if(nextProps.name === this.props.name) {
    return false
  }
  return true
}
```

后来可以通过继承 PureComponent 组件的 从而减少编写 shouldComponentUpdate 代码

```javascript
// 使用 PureComponent 组件之后 就不需要使用 shouldComponentUpdate 进行性能优化
class Foo extends PureComponent {
    render() {
        console.log('Foo render')
        return (
            <div>{this.props.person.age}</div>
        )
    }
}
```

对于无状态组件组件可以使用 memo 进行优化渲染

```javascript
// 对于无状态的函数的组件 可以使用的 memo 进行优化 达到类组件 PureComponent 效果
const Foo = memo(function Foo(props) {
    return (
        <div>{props.person.age}</div>
    )
})
```

```javascript
import { Component, PureComponent, memo } from 'react'

class Home extends Component {

    state = {
        count: 0,
        person: {
            age: 1
        }
    }

    render() {
        const { coun, person } = this.state
        return (
            <div>
                <button onClick={() => {
                    person.age++
                    this.setState({person})
                }}>Add</button>
                {/*注意只有传入属性的第一级发生变化才能促使子组件渲染 大于第一层的属性改变 不会触发渲染*/}
                {/*如果传入一个什么都不做的回调函数 就会当成是一个全新的属性 就会触发子组件渲染*/}
                <Foo name='mike' person={person} cb={() => {}} />
            </div>
        )
    }
}

export default Home
```

思考: PureComponent 和 memo 是通过传入属性的变化比较判定是否渲染 是如何判定的



## React hooks 意义

传统的类组件的存在的不足

+ 难以复用的状态逻辑
  + 缺少复用机制
  + 渲染属性和高阶组件导致层级冗余
+ 趋向于复杂难以维护
  + 生命周期函数混杂不相干的逻辑
  + 想干的逻辑分散在不同的生命周期 【定时器】
  + 到处都是对状态的处理
+ this 指向问题
  +  内联函数过度创建新的句柄
  + 类成员函数不能保证 this 指向



**Hooks 就是让函数组件具有类组件的能力**



## hooks 组件优化点

+ 函数组件无 this 指向问题
+ 自定义的 hooks 方便复用代码状态逻辑
+ 副作用的关注点分离



## 使用 state hooks

使用 hooks 组件的约定 所有的相关的组件都应该以 use 开头

传统组件编写方式

```javascript
class Home1 extends Component{
    state = {
        count: 0
    }
    render() {
        const {count} = this.state
        return (
            <button
                onClick={() => {
                    this.setState({count: count+1})
                }}
            >click({count})</button>
        )
    }
}
```

 Hooks 组件的编写方式

```javascript
function Home() {
    const [count, setCount] = useState(0)
    return (
        <button
            onClick={() => {
                setCount(count + 1)
            }}
        >click({count})</button>
    )
}
```

思考：
	useState 是如何知道 返回的就是 count?
	useState 是如何知道是当前组件的 count 不是其他的组件的 count
		因为 js 是单线程的 在 useState 被调用的时候只有一个唯一的全局上下文 从而就可以确定 this
		都是利用 全局唯一性来推断内容

    /**
     * useState 务必要以稳定的顺序和状态来进行[第一次顺序决定]
     * useState 不能动态的增加和减少使用次数 不能多也不能少
     * 约定: useState 不能在 判断语句和循环语句中进行调用
     */
为了在开发中提示开发者 通常会使用 eslint 工具进行提示zai

安装 eslint-plugin-react-hooks

```shell
yarn add eslint-plugin-react-hooks -D
```

配置 package.json

```javascript
"eslintConfig": {
  "extends": "react-app",
    "plugins": ["react-hooks"],
      "rules": {
        "react-hooks/rules-of-hooks": "error"
      }
}
```



useState 复杂度较高的情况

```javascript
// 这里可以通过传入回调函数的来延迟初始化默认值
const [count, setCount] = useState(() => {
  return props.defaultCount ?? 0
})
```



setCount 使用情况

+ setCount()  根据指定的值来更新 state
+ setCount(c => c +1 ) 根据当前 state 最新的值来更新 通过回调就可以规避值不更新的情况

## 使用 Effect hooks 

在组件的使用中 不能仅仅只是使用 useState 来创建组件状态值 还有额外的业务逻辑

+ 绑定时间
+ 异步请求
+ 访问 DOM 元素

useEffect 常常的组件的渲染之后 

一个 API 就相当于

componentDidMount

componentDidUpdate

Clean Callback



传统组件的写法

```javascript
class Home extends Component {
    state = {
        count: 0,
        size: {
            width: window.document.documentElement.clientWidth,
            height: window.document.documentElement.clientHeight
        }
    }

    onResize = () => {
        this.setState({
            size: {
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            }
        })
    }

    componentDidMount() {
        document.title = this.state.count
        window.addEventListener('resize', this.onResize, false)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false)
    }

    componentDidUpdate() {
        document.title = this.state.count
    }

    render() {
        const { count, size } = this.state
        return (
            <button
                type='button'
                onClick={() => {this.setState({count: count + 1})}}
            >
                Click({count})
                size: {size.width} * {size.height}
            </button>
        )
    }
}
```



useEffect 改造写法

```javascript
function Home() {
    const [count, setCount] = useState(0)
    const [size, setSize] = useState({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight
    })

    const onResize = () => {
        this.setState({
            size: {
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            }
        })
    }
	
    // 组件渲染之后 之后 count 值改变 就会重新执行
    useEffect(() => {
        document.title = count
    })

    // useEffect 第二个参数是一个可选的数组 在数组中的每一项不变的情况下才不会出发 useEffect 重新执行
    // 如果是一个空数组 就会执行一次[刚开始那一次]
    // 如果不传 则每一次都会执行
    // 如果数组中的数据不变 则不会渲染 如何理解这个不变
    useEffect(() => {
        window.addEventListener('resize', onResize, false)

        // 组件重新渲染 或者销毁就会执行 return 语句
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
        // 这里可以依赖变量 也可以是一个布尔值 如果是一个布尔值 布尔值为false 不会触发执行
    }, [])

    return (
        <button
            onClick={() => {setCount(count + 1)}}
        >
            Click({count})
            size: {size.width} * {size.height}
        </button>
    )
}
```

使用 useEffect 之后 只要值发生改变 逻辑就会重新执行

```javascript
useEffect(() => {
  document.title = count
})
```

第二个参数是一个可选的数组

+ 如果不传 每一次指定的职改变之后就会重新执行

  ```javascript
  useEffect(() => {
    document.title = count
  })
  ```

+ 如果传入的是一个空数组 则 只会执行一次

  ```javascript
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
  }, [])
  ```

+ 如果传入有值的数组 数组中的每一个值发生改变 就会出发执行

  ```javascript
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    
    // count 发生改变 就会重新执行
  }, [count])
  ```

+ 在 useEffect 函数的回调函数中如果返回一个函数体 那么在组件的重新渲染或则销毁的时候就会执行

  这里可以依赖变量 也可以是一个布尔值 如果是一个布尔值 布尔值为false 不会触发执行

  ```javascript
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
  
    // 组件重新渲染 或者销毁就会执行 return 语句
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
  
    // 组件重新渲染 或者销毁就会执行 return 语句
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
    // 这里可以依赖变量 也可以是一个布尔值 如果是一个布尔值 布尔值为false 不会触发执行
  }, [count === 3])
  ```

  思考： 如何理解数据依赖项的不变 



## 使用 context hooks API

和类组件中的context 一样 在顶层组件中声明变量一次 就可以在子组件中多次使用声明的值 而不用一层层传递执行值

顶层组件

```javascript
import { useContext, useState } from 'react'

const CountContext = createContext()

function Home() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <button
                onClick={() => {setCount(count + 1)}}
            >
                Click({count})
            </button>
						// 这里的写法与类组件是相似的
            <CountContext.Provider value={count}>
                <Counter />
            </CountContext.Provider>
        </div>
    )
}
```

原本的写法

```javascript
// 最基础的 context 的写法
class Foo extends Component {
    render() {
        return (
            <CountContext.Consumer>
                {
                    count => <h1>什么 这是什么嘛{count}</h1>
                }
            </CountContext.Consumer>
        )
    }
}
```

使用 contextType 进行简写

```javascript
// 使用 contextType 简化代码编写
class Bar extends Component {
    static contextType = CountContext
    render() {
        const count = createContext
        return (
            <CountContext.Consumer>
                {
                    count => <h1>什么 这是什么嘛{count}</h1>
                }
            </CountContext.Consumer>
        )
    }
}
```

Hooks 组件的写法

```javascript
function Counter() {
    // 函数组件中可以多个
    const count = useContext(CountContext)
    return (
        <h1>hooks 组件{count}</h1>
    )
}
```

通过观察 在hooks 组件中语法解释 在 hooks 组件的 context 可以存在多个 这是和类组件的最大的区别点

和类组件一样 不要试图在组件中使用多个 context 会破坏组件独立性



## memo callback 优化组件的渲染行为

在类组件中可知 memo 可以优化组件的重新渲染行为 从而优化网页的渲染 可以通过 memo 优化组件的指定的渲染

memo 针对组件的渲染是否重新执行

usemome 是定义了一段函数是否重新执行

本质都是都过判断条件来判断指定的业务逻辑是否到执行



注意：useMemo 和 useEffect 之间的区别

+ useMemo 有返回值 返回值直接就可以参与渲染 所以是在渲染期间完成的
+ useEffect 是渲染过后运行

```javascript
// 组件可以通过之间的讲解的 memo 进行优化
// count 不发生改变是无法直接渲染该组件 只有改变过后才能将该组件重新进行渲染
const Counter = memo(function Counter(props) {
    console.log('我渲染了')
    return (
        <h1>hooks 组件{props.count}</h1>
    )
})

function Home() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <button
                onClick={() => {setCount(count + 1)}}
            >
                Click({count}), double: ({double}), half: ({half})
            </button>
            <Counter count={double} />
        </div>
    )
}
```

如果传入一个可以执行的函数 那么每次父组件渲染之后 都会导致的重新渲染 即使 count 不改变 【函数每次都是一个新值】

```javascript
const Counter = memo(function Counter(props) {
    console.log('我渲染了')
    return (
        <h1 onClick={props.onClick}>hooks 组件{props.count}</h1>
    )
})

function Home() {
    const [count, setCount] = useState(0)

    const onClick = useMemo(() => {
        return () => {
            console.log('点击了')
        }
    }, [])
    
    return (
        <div>
            <button
                onClick={() => {setCount(count + 1)}}
            >
                Click({count}), double: ({double}), half: ({half})
            </button>
						// 每次都会重新渲染子组件 就是因为 onClick 每次执行都会以新值传入
            <Counter count={double} onClick={onClick} />
        </div>
    )
}
```

这个时候就可以通过 useMemo 优化 onClick 函数减少子组件的优化

```javascript
// 这里传入之后 会导致子组件每次渲染得到一个全新的函数而重新渲染
// 这个时候 就可以使用 useMemo 优化
// 使用 useMemo 之后 导致回调嵌套过多 可以使用的 useCallback 优化

const onClick = useMemo(() => {
  return () => {
    console.log('点击了')
  }
}, [])
```

以上的写法可以通过 useCallBack 来减少代码编写量 <=> useMemo

```javascript
const [clickCount, setClickCount] = useState(0)

// useMemo(() => fn) === useCallback(fn)
// useCallback 如何优化性能了呢
// useCallback 解决的是传入子组件的函数参数过度变化导致的过度的渲染问题

const onClick = useCallback(() => {
  console.log('点击了')
  // 如果依赖 useState 过多 就需要写入数组依赖项
  setClickCount(clickCount + 1)
}, [clickCount, setClickCount])
```

react 官方团队优化后 set... 可以不不用在 依赖项中写入

```javascript
const [clickCount, setClickCount] = useState(0)

const onClick = useCallback(() => {
  console.log('点击了')
  setClickCount(clickCount + 1)
  // setClickCount 可以不用写入
}, [clickCount])
```

还可以极度优化 如果是在 set.. 中更改值是通过回调函数更改那么 依赖数组中的 clickCount 也可以不写

```javascript
const onClick = useCallback(() => {
  console.log('点击了')
  // 如果是在 set.. 中更改值是通过回调函数更改那么 依赖数组中的 clickCount 也可以不写
  setClickCount(clickCount => clickCount + 1)
}, [])
```

useMemo 的返回值是可以参与组件的渲染

```javascript
const double = useMemo(() => {
  console.log('这是神马嘛')
  return count * 2
}, [count === 3])
```

useMemo 也可以依赖多个 useMemo

```javascript
// 可以多个 useMemo 依赖
// 但是不要循环依赖 会把浏览器搞崩溃掉
const half = useMemo(() => {
  return double / 4
}, [double])


<button
	onClick={() => {setCount(count + 1)}}
>
    Click({count}), double: ({double}), half: ({half})
</button>
```



## hooks 使用法则

1. 只在顶层调用组件  【不能判断语句 和循环语句中调用 hooks API】 只在顶层调用组件 API 组件才会以指定的顺序渲染组件 否则可能造成组件的渲染出现问题
2. 只在函数组件和自定义hooks函数中调用hooks API 

以上两项规则 可以通过 eslint tslint 进行规避



## hooks 常见问题

+ 生命周期函数如何映射到 Hooks 组件中

```javascript
function App() {
    // 只调用一次
    useEffect(() => {
        // componentDidMount
        return () => {
            // componentWillUnmount
        }
    }, [])

    let renderCounter = useRef(0)
    renderCounter.count ++

    // 可以调用多次
    useEffect(() => {
        if(renderCounter > 1) {
            // componentDidUpdate
        }
    })
}
```



```javascript
class Counter extends Comment {
    state = {
        overflow: true,
    }

    static getDerivedStateFromProps(props, state) {
        if(props.count > 10) {
            return {
                overflow: true
            }
        }
    }
}

function Counter(props) {
  const [overflow, setOverflow] = useState(false)
  if(props.count > 10) {
    // 这里直接 setState 不会导致死循环嘛
    // 会 逻辑出现问题就会导致死循环

    // 直接 setState 会出现性能问题嘛
    // 不会 setstate 是在组件的渲染之前就完成 不会有性能问题
    setOverflow(true)
  }
```

​	并不是所有的类组件的生命周期都可以在 hooks 组件很好的替代

+ 类实例成员变量如何映射到 Hooks
+ Hooks 中如何获取历史 props 和 state
+ 如何强制更新一个组件



## useReducer 可以根据不同类型来更新 state 的值

```javascript
class CountReducer {
    countReducerType = {
        'add': state => state + 1,
        // 如果这里 state 是一个非常复杂的对象 则通过 Object.assign 处理才能返回
        'minus': state => state - 1,
    }

    middleCountValue(state, action) {
        try {
            return this.countReducerType[action.type](state)
        } catch (e) {
            console.error(e.message)
            window.alert(e.message)
        }
    }
}

function countReducer(state, action) {
  	// 这里的 state 就是最新状态
  	// action 根据 action.type 的不同的执行不同的更新
    return new CountReducer().middleCountValue(state, action)
}

    // 如果 useReducer 写入默认复杂对象 这个时候 dispatchCount 进行更新是非常困难的
    // dispatchCount 传入的是一个的新的对象 而不是一个老的对象 也不能直接在老的对象上进行修改
    // 内部数据处理返回的时候 需要使用 Object.assign 处理 返回一个新的对象
    // 只有对象改变了本身 我们才能认为这个对象是经过修改的 如果只是修改了老对象上的属性及其属性值我们不认为是老对象是通过修改的
    // 如果将没有经过修改处理过后的对象传递给组件 组件一旦认为对象没有经过修改 则不会出发组件渲染行为
    // 导致页面的处理 bug

		// useReducer 需要传入默认值
    const [count, dispatchCount] = useReducer(countReducer, 0)

dispatchCount({type: 'minus'})
```

在 dispatchCount 中就可以根据 类型来做的值的增加和修改 相较于useEffect 更加灵活



## ref hooks

类传统 ref 是用来获取 dom 对象的

```javascript
return <span ref='abc' />
  
// 通过 API 就可以得到具体的 DOM
this.refs.abc  // 17 版本就会移除
```

类推荐的写法

```javascript
class App extends Component {
    constructor() {
        super()
        this.ref = createRef()
    }

    componentDidMount() {
      	// 就可以得到指定的 DOM 元素
        console.log(this.ref)
    }

    render() {
        return (
            <div>
                <div ref={this.ref}>这是什么嘛1</div>
                <div>这是什么嘛2</div>
            </div>
        )
    }
}
```

Hooks 组件的写法

```javascript
import React, { Component, createRef, useRef, useEffect } from 'react'

function App2() {
    const divRef = useRef()

    useEffect(() => {
      	// 和传统的 ref 一样
        console.log(divRef)
    })

    return (
        <div>
            <div ref={divRef}>这是什么嘛1</div>
            <div>这是什么嘛2</div>
        </div>
    )
}
```



## 闭包陷阱 【后期补上】



## redux 创建以及组件连接



## store 创建

安装 redux 

```javascript
yarn add reduxc
```

创建 store

```javascript
import { createStore } from 'redux'

const ADD = 'ADD'

class Reducer {
    actionType = {
        // 这里是需要返回一个新的对象
        ADD: state => ({count: state.count + 1}),
    }

    getReducer(state, action) {
        try {
            return this.actionType[action.type](state)
        } catch (e) {
            console.error(e.message)
            return state
        }
    }
}

function reducer(state = initialState, action) {
    return new Reducer().getReducer(state, action)
}

const store = createStore(reducer, initialState)

export default store
```



组件更改 store 值

```javascript
store.dispatch({type: ADD})
```



