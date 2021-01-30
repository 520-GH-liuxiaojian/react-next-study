class Counter extends Comment {
    state = {
        overflow: true,
    }

    static getDerivedStateFromProps(props, state) {
        if(props.count > 10) {
            return {
                overflow: true
            }
        }
    }
}

function Counter(props) {
    const [overflow, setOverflow] = useState(false)
    if(props.count > 10) {
        // 这里直接 setState 不会导致死循环嘛
        // 会 逻辑出现问题就会导致死循环

        // 直接 setState 会出现性能问题嘛
        // 不会 setstate 是在组件的渲染之前就完成 不会有性能问题
        setOverflow(true)
    }
}

function App() {
    // 只调用一次
    useEffect(() => {
        // componentDidMount
        return () => {
            // componentWillUnmount
        }
    }, [])

    let renderCounter = useRef(0)
    renderCounter.count ++

    // 可以调用多次
    useEffect(() => {
        if(renderCounter > 1) {
            // componentDidUpdate
        }
    })
}
