import { Component ,Fragment, useEffect } from 'react'
import { Input, List } from 'antd'
import store from '../store/store'

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
            type: 'change_input_value',
            value: event.target.value
        })
    }

    handleButtonClick = () => {
        store.dispatch({
            type: 'add_todo_item',
        })
    }

    handleItemDelete = index => {
        const action = {
            type: 'delete_todo_item',
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
