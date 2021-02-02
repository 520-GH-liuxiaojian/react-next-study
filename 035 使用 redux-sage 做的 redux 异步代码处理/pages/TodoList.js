import { Component ,Fragment } from 'react'
import { Input, List } from 'antd'
import store from '../store'
import {
    getAddItemAction,
    getDeleteItemAction,
    getInputChangeAction,
    genInitList
} from '../store/todoList/actionCreate'

import './TodoList.css'

const { Search } = Input
const ListItem = List.Item

class TodoList extends Component{
    constructor(props) {
        super(props)

        // store.getState() 就可以得到 store 中的值
        this.state = store.getState().todoList

        // 当 store 内容发生改变 就会自动触发指定的方法
        // 这个方法就会将组件的状态进行覆盖式更新
        store.subscribe(this.handleStoreChange)
    }

    componentDidMount() {
        const action = genInitList()
        store.dispatch(action)
    }

    handleStoreChange = () => {
        this.setState(store.getState().todoList)
    }

    handleInputChange = event => {
        const action = getInputChangeAction(event.target.value)
        store.dispatch(action)
    }

    handleButtonClick = () => {
        const action = getAddItemAction()
        store.dispatch(action)
    }

    handleItemDelete = index => {
        const action = getDeleteItemAction(index)
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
                <div className='contain'>
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
