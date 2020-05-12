import React from "react";
import UserBar from "../components/user/nav-bar";
import '../static/style/ownedIndex.scss'
import {withRouter} from 'react-router-dom'
import { ApiOutlined, UserOutlined } from "@ant-design/icons";
import BackButton from '../components/user/back'
class UserOwnedIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            projectArr: []
        }
    }

    async componentDidMount() {
        const {data} = await this.$server.get('/api/project/get-project')
        this.setState({
            projectArr: data
        })
    }

    render() {
        return (
            <>
                <UserBar/>
                <div className={'index-project-container'}>
                    <BackButton/>
                    {
                        this.state.projectArr.map(item => <ProjectCard { ...item }/>)
                    }
                </div>
            </>
        );
    }
}

function ProjectCard(props) {
    function getApiNum() {
        let num = 0
        props.parentNodes.forEach(item => {
            if(item.items){
                item.items.forEach(api => {
                    num ++
                })
            }
        })
        return num
    }

    function handleClick() {
        props.history.push(`/index/${props.projectName}/首页`)
    }

    return(
        <div onClick={handleClick} className={'project-card hover-button'}>
            <div className={'project-card__title'}>{ props.projectName }</div>
            <div className={'project-card__time'}>{ props.createdAt }</div>
            <div className={'project-card__info'}>
                <div className={'ib'}>
                    <ApiOutlined/> { getApiNum() }
                </div>
                <div className={'ib'}>
                    <UserOutlined /> { props.group.length }
                </div>
            </div>
        </div>
    )
}

ProjectCard = withRouter(ProjectCard)

export default UserOwnedIndex
