import React from "react";
import SideBar from '../components/sidebar'
import { Link, withRouter, useRouteMatch, useParams } from "react-router-dom";
import Nav from "../components/nav";
import '../static/style/index.css'
import Store from '../store'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this)
        this.state = {
            projectList: [],
            currentProject: '',
            parentNodes: [],
            projectInfo: {},
            allProject: []
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Store.dispatch({type: 'SETAPIPROJECT', value: {  }})
        const { api } = this.props.match.params
        if(api !== Store.getState().projectInfoReducer.api){
            this.handleChangeProjectAndApi(this.state.allProject)
            console.log(Store.getState())
        }
        // this.handleChangeProjectAndApi(this.state.allProject)
        // console.log(Store.getState())
    }

    async componentDidMount() {
        const { data } = await this.$server.get('/api/project/get-project')
        this.handleChangeProjectAndApi(data)
        // this.props.history.push(`/index/${ this.state.currentProject }/首页`)
    }

    handleChangeProjectAndApi(projectArr){
        const { api, projectName } = this.props.match.params
        const projectInfo = projectArr.filter(item => item.projectName === projectName)

        if(!projectInfo.length) {
            this.props.history.push('/notfound')
        }else{
            this.setState({
                projectList: projectArr.map(item => item.projectName),
                currentProject: projectName,
                parentNodes: [{ title: '首页', id: 1 }, ...projectInfo[0].parentNodes],
                projectInfo: projectInfo[0],
                allProject: projectArr
            })
            Store.dispatch({ type: 'PROJECTSET',value: projectInfo[0] })
            Store.dispatch( { type: 'SETAPIPROJECT', value: {api, projectName} })
            console.log(Store.getState())
        }
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
