import { Fragment } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import App from "next/app";

function withLog(Comp) {
    return props => {
        console.log(props)
        return <Comp {...props} />
    }
}

class myDocument extends Document {
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

    render() {
        return (
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
