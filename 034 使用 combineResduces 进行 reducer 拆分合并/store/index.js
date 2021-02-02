import { combineReducers, createStore } from 'redux'

import todoListReducer from './todoList/reducer'
import useReducer from './use/reducer'

const allReducer = combineReducers({
    todoList: todoListReducer,
    use: useReducer,
})

const store = createStore(
    allReducer,
)

export default store
