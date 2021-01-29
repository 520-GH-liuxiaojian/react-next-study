import { useState, useMemo, useCallback, memo } from 'react'

const Counter = memo(function Counter(props) {
    // 当传入一个函数之后 每次操作父组件都会导致的子组件的变化
    // 之间的优化就失效了
    console.log('我渲染了')
    return (
        <h1 onClick={props.onClick}>hooks 组件{props.count}</h1>
    )
})

function Home() {
    const [count, setCount] = useState(0)
    const [clickCount, setClickCount] = useState(0)

    // useEffect 是渲染过后运行
    // useMemo 是有返回值的 返回值直接就可以参与渲染 所以是在渲染期间完成的
    const double = useMemo(() => {
        console.log('这是神马嘛')
        return count * 2
    }, [count === 3])

    // 可以多个 useMemo 依赖
    // 但是不要循环依赖 会把浏览器搞崩溃掉
    const half = useMemo(() => {
        return double / 4
    }, [double])

    // 这里传入之后 会导致子组件每次渲染得到一个全新的函数而重新渲染
    // 这个时候 就可以使用 useMemo 优化
    // 使用 useMemo 之后 导致回调嵌套过多 可以使用的 useCallback 优化

    // const onClick = useMemo(() => {
    //     return () => {
    //         console.log('点击了')
    //     }
    // }, [])

    // useMemo(() => fn) === useCallback(fn)
    // useCallback 如何优化性能了呢
    // useCallback 解决的是传入子组件的函数参数过度变化导致的过度的渲染问题

    // const onClick = useCallback(() => {
    //     console.log('点击了')
    //     setClickCount(clickCount + 1)
    // }, [clickCount, setClickCount])

    // const onClick = useCallback(() => {
    //     console.log('点击了')
    //     setClickCount(clickCount + 1)
    //     // 这里的 set.. 是不用放置在依赖数组中
    // }, [clickCount])

    const onClick = useCallback(() => {
        console.log('点击了')
        // 如果是在 set.. 中更改值是通过回调函数更改那么 依赖数组中的 clickCount 也可以不写
        setClickCount(clickCount => clickCount + 1)
    }, [])

    return (
        <div>
            <button
                onClick={() => {setCount(count + 1)}}
            >
                Click({count}), double: ({double}), half: ({half})
            </button>
            <Counter count={double} onClick={onClick} />
        </div>
    )
}

export default Home
