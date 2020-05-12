import React from "react";
import SideBar from '../components/sidebar'
import { Link, withRouter, useRouteMatch, useParams } from "react-router-dom";
import Nav from "../components/nav";
import '../static/style/index.css'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this)
        this.state = {
            projectList: [],
            currentProject: '',
            parentNodes: [],
            projectInfo: {},
        }
    }

    handleClick() {
        this.props.history.push('/')
    }

    handleChangeCurrent(value) {
        this.setState({
            currentProject: value
        })
        this.props.history.push(`/index/${ value }/首页`)
    }

    // 获取所有API及信息
    getAllProjectAPIs() {

    }

    async componentDidMount() {
        const { data } = await this.$server.get('/api/project/get-project')
        const { api, projectName } = this.props.match.params

        const projectInfo = data.filter(item => item.projectName === projectName)

        if (projectInfo.length < 1) {
            this.props.history.push('/notfound')
        } else {
            this.setState({
                projectList: data.map(item => item.projectName),
                currentProject: projectName,
                parentNodes: [{ title: '首页', id: 1 }, ...projectInfo[0].parentNodes],
                projectInfo: projectInfo[0]
            })
        }
        // this.props.history.push(`/index/${ this.state.currentProject }/首页`)
    }

    render() {
        return (
            <div>
                <Nav
                    { ...this.state }
                    changeCurrent={ (value) => this.handleChangeCurrent(value) }
                />
                <div className={ 'container' }>
                    <SideBar
                        { ...this.state }
                    />
                    <div className={ 'container__board' }>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Index)
