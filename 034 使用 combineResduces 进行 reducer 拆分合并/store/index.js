import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import todoListReducer from './todoList/reducer'
import useReducer from './use/reducer'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const allReducer = combineReducers({
    todoList: todoListReducer,
    use: useReducer,
})

const store = createStore( allReducer, enhancer )

export default store
