import {
    CHANG_INPUT_VALUE,
    ADD_TODO_ITEM,
    DELETE_TODO_ITEM,
    INIT_LIST_ACTION,
    GET_INIT_LIST
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

export const initListAction = value => ({
    type: INIT_LIST_ACTION,
    value
})

export const genInitList = value => ({
    type: GET_INIT_LIST,
    value
})
