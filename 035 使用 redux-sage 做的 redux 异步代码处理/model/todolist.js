import { takeEvery, put } from 'redux-saga/effects'
import { GET_INIT_LIST } from '../store/todoList/actionType'
import { genInitList } from '../store/todoList/actionCreate'
import axios from 'axios'
// import { initList } from '../server/todolist'

function* getInitList() {
    const result = yield axios.get('/api/todolist')
    const { data } = JSON.parse(JSON.stringify(result))
    const action = genInitList(data.data)
    yield put(action)
    console.log('abc')
}

console.log(getInitList())

function* todoListSaga() {
     // yield takeEvery(GET_INIT_LIST, getInitList)
}

export default todoListSaga
