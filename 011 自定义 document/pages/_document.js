import Document, { Html, Head, Main, NextScript } from 'next/document'

class myDocument extends Document {
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx)
        return { ...props }
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
