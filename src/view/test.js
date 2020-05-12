import React from "react";

class TestSub extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOk: true
        }
    }

    componentDidMount() {
        console.log('did mount')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('did update')
        console.log(prevProps, prevState, snapshot)
        console.log('------')
    }

    static getDerivedStateFromProps(prevProps,prevStates) {
        return {
            ...prevProps
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return 'yes'
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps)
        return nextProps.name % 2 !== 0;

    }

    render() {
        return (
            <div>
                <p>{ this.props.name }</p>
            </div>
        );
    }

}

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 1
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({
            name: this.state.name + 1
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Add</button>
                <TestSub name={this.state.name}/>
            </div>
        );
    }
}

