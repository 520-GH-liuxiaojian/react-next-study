import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import todoListReducer from './todoList/reducer'
import useReducer from './use/reducer'

// const composeEnhancers =
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     }) : compose;

// const enhancer = composeEnhancers(
//     composeWithDevTools(applyMiddleware(thunk)),
// );

const allReducer = combineReducers({
    todoList: todoListReducer,
    use: useReducer,
})

const store = createStore( allReducer, composeWithDevTools(applyMiddleware(thunk)) )

export default store
