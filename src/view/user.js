import React from "react";
import '../static/style/user.scss'
import {withRouter} from 'react-router-dom'
import { CodepenOutlined, FileAddOutlined, InstagramOutlined, SettingOutlined } from "@ant-design/icons";
import UserBar from "../components/user/nav-bar";
class UserIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            projectArr: [],
            menuArr: [
                {
                    title: '往期项目',
                    icon: <CodepenOutlined/>,
                    url: '/index'
                },
                {
                    title: '用户设置',
                    icon: <SettingOutlined/>,
                    url: '/setting'
                },
                {
                    title: '创建一个新项目',
                    icon: <InstagramOutlined/>,
                    url: 'create'
                }
            ]
        }
    }

    render() {
        return (
            <div className={'user-index'}>
                <UserBar/>
                <div className={'fxal user-index__main'}>
                    {
                        this.state.menuArr.map(item => (
                            <UserCard route={item.url} title={item.title} icon={item.icon}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

function UserCard(props) {
    function handleClick() {
        props.history.push(props.route)
    }
    return(
        <div onClick={handleClick} className={'user-card'}>
            <div className={'user-card-logo'}>{props.icon}</div>
            <div className={'user-card-title'}>{ props.title }</div>
        </div>
    )
}

UserCard = withRouter(UserCard)

export default withRouter(UserIndex)
