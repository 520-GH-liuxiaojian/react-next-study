const withCss = require('@zeit/next-css')

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

if(typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}

module.exports = withCss({})
