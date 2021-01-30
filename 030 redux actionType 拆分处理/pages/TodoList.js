import { Component ,Fragment, useEffect } from 'react'
import { Input, List } from 'antd'
import store from '../store/store'
import {
    ADD_TODO_ITEM,
    CHANG_INPUT_VALUE,
    DELETE_TODO_ITEM
} from '../store/actionType'

import './TodoList.css'

const { Search } = Input
const ListItem = List.Item

class TodoList extends Component{
    constructor(props) {
        super(props)

        // store.getState() 就可以得到 store 中的值
        this.state = store.getState()
        store.subscribe(this.handleStoreChange)
    }

    handleStoreChange = () => {
        this.setState(store.getState())
    }

    handleInputChange = event => {
        store.dispatch({
            type: CHANG_INPUT_VALUE,
            value: event.target.value
        })
    }

    handleButtonClick = () => {
        store.dispatch({
            type: ADD_TODO_ITEM,
        })
    }

    handleItemDelete = index => {
        const action = {
            type: DELETE_TODO_ITEM,
            value: index
        }
        store.dispatch(action)
    }

    render() {
        const {
            handleInputChange,
            handleButtonClick,
            handleItemDelete
        } = this
        const { todoList = [], inputValue = '' } = this.state

        return (
            <Fragment>
                <div className='contain' >
                    <Search
                        placeholder="请输入搜索内容"
                        value={inputValue}
                        allowClear
                        enterButton
                        onChange={handleInputChange}
                        onSearch={handleButtonClick}
                    />
                    <List
                        bordered
                        dataSource={todoList}
                        renderItem={(item, index) => (
                            <ListItem onClick={() => handleItemDelete(index)}>{item}</ListItem>
                        )}
                    />
                </div>
            </Fragment>
        )
    }
}

export default TodoList
