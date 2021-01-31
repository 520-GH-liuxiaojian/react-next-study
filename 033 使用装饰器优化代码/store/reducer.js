import { message } from 'antd'
import {
    ADD_TODO_ITEM,
    CHANG_INPUT_VALUE,
    DELETE_TODO_ITEM
} from './actionType'

// function nameDecorator(target, key, descriptor) {
//     const temp = descriptor.initializer()
//     const fnObject = {}
//     Object.keys(temp).forEach((fn, index) => {
//         try {
//             const fnString = temp[fn].toString()
//             const fnStringReplace = fnString.replace('state', 'oldState')
//             const fnStringSplit = fnStringReplace.split('\n')
//             fnStringSplit[0] = fnStringSplit[0] + `const newState = JSON.parse(JSON.stringify(oldState));`
//             fnStringSplit[fnStringSplit.length - 2] = fnStringSplit[fnStringSplit.length - 2] + `return newState`
//             const fnStringJoin = fnStringSplit.join('')
//             const tempFnString = fnStringJoin.replaceAll('      ', '')
//             const fnStringNewState = tempFnString.replaceAll('state', 'newState')
//             const addFnName = fnStringNewState.replace('function', 'function ' + fn)
//             fnObject[fn] = new Function('return ' + addFnName)
//         } catch (error) {
//             console.error(error)
//         }
//     })

//     console.log(fnObject)
// }

class Reducer {
    actionType = {
        [CHANG_INPUT_VALUE]: (state, value) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.inputValue = value
            return newState
        },
        [ADD_TODO_ITEM]: state => {
            const newState = JSON.parse(JSON.stringify(state))
            if(!newState.inputValue.length) {
                message.warn('请输入内容')
                return
            }
            newState.todoList.push(state.inputValue)
            newState.inputValue = ''
            return newState
        },
        [DELETE_TODO_ITEM]: (state, value) => {
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
    todoList: ['这是神马嘛'],
    inputValue: '你猜呀'
}

export default (state = defaultState, action) => {
    return new Reducer().getReducer(state, action)
}
