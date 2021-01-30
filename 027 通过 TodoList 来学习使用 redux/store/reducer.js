import { message } from 'antd'

class Reducer {
    actionType = {
        // reducer 可以接受 state 但是绝对绝对不能修改 state
        // 后面将修改过后的 state 返回 store
        // store 将新数据替换老的数据即可
        'change_input_value': (state, value) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.inputValue = value
            return newState
        },
        'add_todo_item': state => {
            const newState = JSON.parse(JSON.stringify(state))
            if(!newState.inputValue.length) {
                message.warn('请输入内容')
                return
            }
            newState.todoList.push(newState.inputValue)
            newState.inputValue = ''
            return newState
        },
        'delete_todo_item': (state, value) => {
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
