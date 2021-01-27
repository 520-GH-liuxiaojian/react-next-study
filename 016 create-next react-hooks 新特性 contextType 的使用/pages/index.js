import { Component, createContext } from 'react'

// 虽然可以创建多个全局 context 但是随着创建的组件越多 组件之间的节藕性会降低
const BatteryContext = createContext()
const OnlineContext = createContext(false)

class Leaf extends Component{
    static contextType = BatteryContext

    render() {
        const battery = this.context

        return (
            <h1>Battery: {battery}</h1>
        )
    }
}

class Middle extends Component {
    render() {
        return (
            <Leaf />
        )
    }
}

class Home extends Component {

    state = {
        battery: 0,
        boolean: false
    }

    render() {
        const { battery, boolean } = this.state
        return (
            <BatteryContext.Provider value={battery}>
                <OnlineContext.Provider value={boolean}>
                    <button onClick={() => this.setState({battery: battery + 1})}>改变</button>
                    <button onClick={() => this.setState({boolean: !boolean})}>改变</button>
                    <Middle />
                </OnlineContext.Provider>
            </BatteryContext.Provider>
        )
    }
}

export default Home
