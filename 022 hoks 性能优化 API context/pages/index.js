import { Component ,useState, useContext, createContext } from 'react'

const CountContext = createContext()

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

function Counter() {
    // 函数组件中可以多个
    const count = useContext(CountContext)
    return (
        <h1>hooks 组件{count}</h1>
    )
}

function Home() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <button
                onClick={() => {setCount(count + 1)}}
            >
                Click({count})
            </button>
            <CountContext.Provider value={count}>
                <Counter />
            </CountContext.Provider>
        </div>
    )
}

export default Home
