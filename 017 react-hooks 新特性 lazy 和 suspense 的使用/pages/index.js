import { Component, lazy, Suspense } from 'react'

// 使用 lazy 加载组件的就会存在一个加载的空档时间
// 这个空档时间的是需要现实执行的组件 需要指定现实的组件 需要 Suspense 组件配合

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
