import { message } from 'antd'
import {
    ADD_TODO_ITEM,
    CHANG_INPUT_VALUE,
    DELETE_TODO_ITEM
} from './actionType'

function nameDecorator(target, key) {
    console.log(target, key)
}

class Reducer {
    // @nameDecorator
    actionType = {
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
            console.log(type)
            // return this.actionType[type](state, value)
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
