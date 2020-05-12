import React from "react";
import UserBar from "../components/user/nav-bar";
import '../static/style/create.scss'
import {LeftOutlined} from "@ant-design/icons";
import {withRouter} from 'react-router-dom'
import CreateForm from "../components/create/create-form";
import BackButton from '../components/user/back'

class CreateBoard extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'create-index'}>
                <UserBar/>
                <div className={'fxal create-board'}>
                    <BackButton/>
                    <div className={'create-board__card'}>
                        <CreateForm/>
                    </div>
                </div>
            </div>
        );
    }
}



export default withRouter(CreateBoard)
