import { Component ,Fragment } from 'react'
import { Input, List } from 'antd'
import store from '../store'
import {
    getAddItemAction,
    getDeleteItemAction,
    getInputChangeAction,
    getTodoList
} from '../store/todoList/actionCreate'
import { connect } from 'react-redux'

import './TodoList.css'

const { Search } = Input
const ListItem = List.Item

class TodoList extends Component{
    componentDidMount() {
        const action = getTodoList()
        store.dispatch(action)
    }

    render() {
        const {
            handleInputChange,
            handleButtonClick,
            handleItemDelete
        } = this.props
        const { todoList = [], inputValue = '' } = this.props

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

const mapStateToProps = state => ({
    inputValue: state.inputValue
})

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange = event => {
            const action = getInputChangeAction(event.target.value)
            dispatch(action)
        },
        handleButtonClick = () => {
            const action = getAddItemAction()
            store.dispatch(action)
        },
        handleItemDelete = index => {
            const action = getDeleteItemAction(index)
            store.dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
