import { useReducer, useEffect } from 'react'
// import stote from '../store/store'

class CountReducer {
    countReducerType = {
        'add': state => state + 1,
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
