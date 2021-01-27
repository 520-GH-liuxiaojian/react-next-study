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

+ lazy

+ Suspense

+ Memo

