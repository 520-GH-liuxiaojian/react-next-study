import { withRouter } from 'next/router'

const a = ({router, sex}) => {
    const { a } = router.query

    return (
        <div>这是a页面 {a} {sex}</div>
    )
}

// 这是同步的情况
// a.getInitialProps = () => {
//     // 这是返回对象 会融合进 组件 props
//     // 服务端运行之后 将数据和页面混合生成最新的返回前端
//     return {
//         sex: '女'
//     }
// }

// 这是异步情况
a.getInitialProps = async () => {
    // 这是返回对象 会融合进 组件 props

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({sex: '男'})
        }, 5000)
    })

    return await promise
}

export default withRouter(a)
