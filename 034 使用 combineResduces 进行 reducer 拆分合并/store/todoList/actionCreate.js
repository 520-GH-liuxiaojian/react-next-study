import axios from 'axios'
import {
    CHANG_INPUT_VALUE,
    ADD_TODO_ITEM,
    DELETE_TODO_ITEM,
    INIT_LIST_ACTION,
} from './actionType'

export const getInputChangeAction = value => ({
    type: CHANG_INPUT_VALUE,
    value
})

export const getAddItemAction = () => ({
    type: ADD_TODO_ITEM,
})

export const getDeleteItemAction = value => ({
    type: DELETE_TODO_ITEM,
    value
})

const initListAction = value => ({
    type: INIT_LIST_ACTION,
    value
})

export const getTodoList = () => {
    return async dispatch => {
        const data = await axios.get('/api/todolist')
        const temp = JSON.parse(JSON.stringify(data))
        dispatch(initListAction(temp.data.data))
    }
}
