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
