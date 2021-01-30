import { createStore } from 'redux'

const initialState = {
    count: 0
}

const ADD = 'ADD'

class Reducer {
    actionType = {
        ADD: state => ({count: state.count + 1}),
    }

    getReducer(state, action) {
        try {
            return this.actionType[action.type](state)
        } catch (e) {
            console.error(`${action.type} 在 actionType 中没有对应的属性及其方法`)
            window.alert(`${action.type} 在 actionType 中没有对应的属性及其方法`)
            return state
        }
    }
}

function reducer(state = initialState, action) {
    return new Reducer().getReducer(state, action)
}

const store = createStore(reducer, initialState)

store.dispatch({type: 'minus'})
console.log(store.getState())

export default store
