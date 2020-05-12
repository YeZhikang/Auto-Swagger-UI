import React from "react";
import Store from '../../store/index'
import {withRouter} from 'react-router-dom'
class UserBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            name: '',
        }

        Store.subscribe(() => {
            const {name, phone} = Store.getState()
            this.setState({
                phone,
                name
            })
        })
    }

    componentDidMount() {
        this.setState(Store.getState())
    }

    render() {
        return (
            <div onClick={() => this.handleClick()} className={'user-bar fxal fxbt'}>
                <div className={'fxal'}>
                    <span>欢迎你：</span><span className={'user-bar__user-name hoverable'}>{ this.state.name }</span>
                </div>
                <div className={'fxal nav__logo'}>
                    Auto Swagger
                </div>
            </div>
        );
    }
}

export default withRouter(UserBar)
