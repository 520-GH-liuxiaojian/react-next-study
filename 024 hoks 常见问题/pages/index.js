import { useReducer, useEffect } from 'react'

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
    return new CountReducer().middleCountValue(state, action)
}

function Home() {
    // 如果 useReducer 写入默认复杂对象 这个时候 dispatchCount 进行更新是非常困难的
    // dispatchCount 传入的是一个的新的对象 而不是一个老的对象 也不能直接在老的对象上进行修改
    // 内部数据处理返回的时候 需要使用 Object.assign 处理 返回一个新的对象
    // 只有对象改变了本身 我们才能认为这个对象是经过修改的 如果只是修改了老对象上的属性及其属性值我们不认为是老对象是通过修改的
    // 如果将没有经过修改处理过后的对象传递给组件 组件一旦认为对象没有经过修改 则不会出发组件渲染行为
    // 导致页面的处理 bug
    const [count, dispatchCount] = useReducer(countReducer, 0)

    useEffect(() => {
        const interval = setInterval(() => {
            dispatchCount({type: 'minus'})
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <button>click({count})</button>
    )
}

export default Home
