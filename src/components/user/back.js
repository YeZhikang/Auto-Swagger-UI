import { LeftOutlined } from "@ant-design/icons";
import React from "react";
import {withRouter} from 'react-router-dom'

function BackButton(props) {
    function handleBack() {
        props.history.push('/')
    }
    return(
        <div onClick={handleBack} className={'create-board__back'}>
            <LeftOutlined />
        </div>
    )
}

export default withRouter(BackButton)
