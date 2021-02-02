import {
    ADD_USERINFO
} from './actionType'

export const getAddUserInfo = userInfo => ({
    type: ADD_USERINFO,
    value: userInfo
})
