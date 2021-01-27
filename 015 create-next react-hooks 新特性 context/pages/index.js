import { Component, createContext } from 'react'

// 虽然可以创建多个全局 context 但是随着创建的组件越多 组件之间的节藕性会降低
const BatteryContext = createContext()
const OnlineContext = createContext(false)

function Leaf() {
    return (
        <BatteryContext.Consumer>
            {
                battery => (
                    <OnlineContext.Consumer>
                        {
                            online => (
                                <h1>Battery: {battery}, Online: {String(online)}</h1>
                            )
                        }
                    </OnlineContext.Consumer>
                )
            }
        </BatteryContext.Consumer>
    )
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
