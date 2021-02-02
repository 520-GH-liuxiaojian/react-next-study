import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import todoListReducer from './todoList/reducer'
import useReducer from './use/reducer'
import todoListSaga from '../model/todolist'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const allReducer = combineReducers({
    todoList: todoListReducer,
    use: useReducer
})

const store = createStore( allReducer, enhancer )
sagaMiddleware.run(todoListSaga)

export default store
