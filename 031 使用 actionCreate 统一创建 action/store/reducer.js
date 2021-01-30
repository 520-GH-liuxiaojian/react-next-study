import { message } from 'antd'
import {
    ADD_TODO_ITEM,
    CHANG_INPUT_VALUE,
    DELETE_TODO_ITEM
} from './actionType'

class Reducer {
    actionType = {
        // reducer 可以接受 state 但是绝对绝对不能修改 state
        // 后面将修改过后的 state 返回 store
        // store 将新数据替换老的数据即可
        CHANG_INPUT_VALUE: (state, value) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.inputValue = value
            return newState
        },
        ADD_TODO_ITEM: state => {
            const newState = JSON.parse(JSON.stringify(state))
            if(!newState.inputValue.length) {
                message.warn('请输入内容')
                return
            }
            newState.todoList.push(newState.inputValue)
            newState.inputValue = ''
            return newState
        },
        DELETE_TODO_ITEM: (state, value) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.todoList.splice(value, 1)
            return newState
        }
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
    todoList: [],
    inputValue: ''
}

export default (state = defaultState, action) => {
    return new Reducer().getReducer(state, action)
}
