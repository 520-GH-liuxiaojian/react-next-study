import {
    ADD_USERINFO,
} from './actionType'
import { handleRepeatCodeFn } from '../../businessLogicUtils'

class Reducer {
    actionType = {
        [ADD_USERINFO]: (state, value) => {
            return handleRepeatCodeFn(state, newState => {
                newState.userInfo = value
            })
        }
    }

    getReducer(state, action) {
        try {
            const { type, value } = action
            return this.actionType[type](state, value)
        } catch (error) {
            // console.warn(error.message)
            return state
        }
    }
}

const defaultState = {
    userInfo: {
        name: 'beijing001',
        age: 20,
        sex: '男'
    }
}

const userInfoReducer = (state = defaultState, action) => {
    return new Reducer().getReducer(state, action)
}

export default userInfoReducer
