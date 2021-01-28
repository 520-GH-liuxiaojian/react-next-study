import { Component ,useState, useEffect } from 'react'

// class Home extends Component {
//     state = {
//         count: 0,
//         size: {
//             width: window.document.documentElement.clientWidth,
//             height: window.document.documentElement.clientHeight
//         }
//     }
//
//     onResize = () => {
//         this.setState({
//             size: {
//                 width: window.document.documentElement.clientWidth,
//                 height: window.document.documentElement.clientHeight
//             }
//         })
//     }
//
//     componentDidMount() {
//         document.title = this.state.count
//         window.addEventListener('resize', this.onResize, false)
//     }
//
//     componentWillUnmount() {
//         window.removeEventListener('resize', this.onResize, false)
//     }
//
//     componentDidUpdate() {
//         document.title = this.state.count
//     }
//
//     render() {
//         const { count, size } = this.state
//         return (
//             <button
//                 type='button'
//                 onClick={() => {this.setState({count: count + 1})}}
//             >
//                 Click({count})
//                 size: {size.width} * {size.height}
//             </button>
//         )
//     }
// }

function Home() {
    const [count, setCount] = useState(0)
    const [size, setSize] = useState({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight
    })

    const onResize = () => {
        this.setState({
            size: {
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            }
        })
    }

    useEffect(() => {
        document.title = count
    })

    // useEffect 第二个参数是一个可选的数组 在数组中的每一项不变的情况下才不会出发 useEffect 重新执行
    // 如果是一个空数组 就会执行一次[刚开始那一次]
    // 如果不传 则每一次都会执行
    // 如果数组中的数据不变 则不会渲染 如何理解这个不变
    useEffect(() => {
        window.addEventListener('resize', onResize, false)

        // 组件重新渲染 或者销毁就会执行 return 语句
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [])

    return (
        <button
            onClick={() => {setCount(count + 1)}}
        >
            Click({count})
            size: {size.width} * {size.height}
        </button>
    )
}

export default Home
