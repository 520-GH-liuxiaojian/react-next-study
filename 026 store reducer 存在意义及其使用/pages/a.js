import React, { Component, createRef, useRef, useEffect } from 'react'

class App extends Component {
    constructor() {
        super()
        this.ref = createRef()
    }

    componentDidMount() {
        console.log(this.ref)
    }

    render() {
        return (
            <div>
                <div ref={this.ref}>这是什么嘛1</div>
                <div>这是什么嘛2</div>
            </div>
        )
    }
}

function App2() {

    const divRef = useRef()

    useEffect(() => {
        console.log(divRef)
    })

    return (
        <div>
            <div ref={divRef}>这是什么嘛1</div>
            <div>这是什么嘛2</div>
        </div>
    )
}

export default App2
