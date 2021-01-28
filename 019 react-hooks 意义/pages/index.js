import { Component, PureComponent, memo } from 'react'

// class Foo extends Component {
//
//     shouldComponentUpdate(nextProps, nextState) {
//         if(nextProps.name === this.props.name) {
//             return false
//         }
//         return true
//     }
//
//     render() {
//         console.log('Foo render')
//         return null
//     }
// }


// 使用 PureComponent 组件之后 就不需要使用 shouldComponentUpdate 进行性能优化
class Foo extends PureComponent {

    render() {
        console.log('Foo render')
        return (
            <div>{this.props.person.age}</div>
        )
    }

}

// 对于无状态的函数的组件 可以使用的 memo 进行优化 达到类组件 PureComponent 效果
const Foo = memo(function Foo(props) {
    return (
        <div>{props.person.age}</div>
    )
})

class Home extends Component {

    state = {
        count: 0,
        person: {
            age: 1
        }
    }

    render() {
        const { coun, person } = this.state
        return (
            <div>
                <button onClick={() => {
                    person.age++
                    this.setState({person})
                }}>Add</button>
                {/*注意只有传入属性的第一级发生变化才能促使子组件渲染*/}
                {/*如果传入一个什么都不做的回调函数 就会当成是一个全新的属性 就会触发子组件渲染*/}
                <Foo name='mike' person={person} cb={() => {}} />
            </div>
        )

        /**
         * 当父组件 state 改变的时候 就会连子组件的也会随着渲染
         * [但是这里的子组件其实没有必要渲染的] 如何优化
         */

        // 思考: PureComponent 和 memo 是通过传入属性的变化比较判定是否渲染 是如何判定的
    }
}

export default Home
