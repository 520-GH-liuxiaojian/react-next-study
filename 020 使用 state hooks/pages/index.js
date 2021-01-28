import { useState } from 'react'

function Home(props) {
    // 思考：
    //     useState 是如何知道 返回的就是 count?
    //     useState 是如何知道是当前组件的 count 不是其他的组件的 count
    //  因为 js 是单线程的 在 useState 被调用的时候只有一个唯一的全局上下文 从而就可以确定 this
    // 都是利用 全局唯一性来推断内容

    /**
     * useState 务必要以稳定的顺序和状态来进行[第一次顺序决定]
     * useState 不能动态的增加和减少使用次数 不能多也不能少
     * 约定: useState 不能在 判断语句和循环语句中进行调用
     */


    // 这里可以通过传入回调函数的来延迟初始化默认值
    const [count, setCount] = useState(() => {
        return props.defaultCount ?? 0
    })
    return (
        <button
            onClick={() => {
                setCount(count + 1)
            }}
        >click({count})</button>
    )
}

export default Home
