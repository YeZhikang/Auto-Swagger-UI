import React from "react";
import SideBar from '../components/sidebar'
import { Link,withRouter } from "react-router-dom";
import Nav from "../components/nav";
import '../static/style/index.css'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this)
        this.state = {
            projectList: ['isc-platform-ui', 'isc-config-ui'],
            currentProject: 'isc-platform-ui',
            parentNodes:[{
                id: 1,
                title: '首页',
            },{
                id: 2,
                title: '资产类',
                items: [{
                    id: '2-1',
                    title: '增加资产类',
                },{
                    id: '2-2',
                    title: '删除资产类',
                },{
                    id: '2-3',
                    title: '修改资产类',
                }]
            }]
        }
    }

    handleClick() {
        this.props.history.push('/')
    }

    handleChangeCurrent(value){
        this.setState({
            currentProject: value
        })
        this.props.history.push(`/index/${ value }/首页`)
    }

    componentDidMount() {
        this.props.history.push(`/index/${ this.state.currentProject }/首页`)
    }

    render() {
        return (
            <div>
                <Nav projectList={ this.state.projectList } changeCurrent={(value) => this.handleChangeCurrent(value)}/>
                <div className={'container'}>
                    <SideBar parentNodes={this.state.parentNodes} currentProject={ this.state.currentProject }/>
                    <div className={'container__board'}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Index)
