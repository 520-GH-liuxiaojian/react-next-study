import { message } from 'antd'
import {
    ADD_TODO_ITEM,
    CHANG_INPUT_VALUE,
    DELETE_TODO_ITEM
} from './actionType'

function handleRepeatCodeFn(state, callback) {
   const newState = JSON.parse(JSON.stringify(state))
    callback && callback(newState)
   return newState
}

class Reducer {
    // actionType 的所有函数一定是纯函数
    // 有指定的输入就有指定的输出
    // 除了设置输入输出之外的其他的业务逻辑之外 不可以在有其他的业务逻辑的场景出现

    actionType = {
        [CHANG_INPUT_VALUE]: (state, value) => handleRepeatCodeFn(state, newState => {
            newState.inputValue = value
        }),
        [ADD_TODO_ITEM]: state => handleRepeatCodeFn(state, newState => {
            // 这里就是纯函数之外的其他的场景 不应该出现在这里
            // 在指定的场景需要将代码场景移除出去
            if(!newState.inputValue.length) {
                message.warn('请输入内容')
                return
            }
            newState.todoList.push(state.inputValue)
            newState.inputValue = ''
        }),
        [DELETE_TODO_ITEM]: (state, value) => handleRepeatCodeFn(state, newState => {
            newState.todoList.splice(value, 1)
        })
    }


    getReducer(state, action) {
        try {
            const { type, value } = action
            return this.actionType[type](state, value)
        } catch (error) {
            console.warn(error.message)
            return state
        }
    }
}

const defaultState = {
    todoList: ['这是神马嘛'],
    inputValue: '你猜呀'
}

const store = (state = defaultState, action) => {
    return new Reducer().getReducer(state, action)
}

export default store
