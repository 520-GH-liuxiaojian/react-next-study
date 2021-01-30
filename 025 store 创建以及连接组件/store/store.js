import { createStore } from 'redux'

const initialState = {
    count: 0
}

const ADD = 'ADD'

class Reducer {
    actionType = {
        // 这里是需要返回一个新的对象
        ADD: state => ({count: state.count + 1}),
    }

    getReducer(state, action) {
        try {
            return this.actionType[action.type](state)
        } catch (e) {
            console.error(e.message)
            return state
        }
    }
}

function reducer(state = initialState, action) {
    return new Reducer().getReducer(state, action)
}

const store = createStore(reducer, initialState)

store.dispatch({type: ADD})
console.log(store.getState())

export default store
