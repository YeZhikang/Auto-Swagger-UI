import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Select, } from 'antd'
import Input from "antd/lib/input";
import { SearchOutlined } from '@ant-design/icons';
import APIModal from "../modal/AddAPIModal";

const { Option } = Select

function Nav(props) {
    const [visible, setVisible] = useState(false)

    function handleChangeCurrent(value) {
        props.changeCurrent(value)
    }

    function handleOpenDialog() {
        setVisible(true)
    }

    function handleCancelDialog() {
        setVisible(false)
    }

    function handleOkDialog() {
        setVisible(false)
    }
    console.log(props.parentNodes)

    return (
        <div className={ 'nav fxal fxbt' }>
            <Select
                onChange={ handleChangeCurrent }
                value={ props.currentProject }
                style={ { width: 229 } }
            >
                {
                    props.projectList.map(item => <Option value={ item }>{ item }</Option>)
                }
            </Select>

            <div className={ 'fxal ' }>
                <Button
                    onClick={ handleOpenDialog }
                    type={ 'link' }
                    style={ { marginRight: '20px' } }
                >添加新接口</Button>
                <Input
                    placeholder={ '请输入搜索内容' }
                    prefix={ <SearchOutlined/> }
                    className={ 'nav__search' }
                />
                <div className={ 'nav__logo' }>Auto Swagger</div>
            </div>
            <APIModal
                handleAddAPI={ handleOkDialog }
                handleCancel={ handleCancelDialog }
                apiMenu={ props.parentNodes }
                projectList={ props.projectList }
                visible={ visible }
                projectInfo = {props.projectInfo}
            />
        </div>
    )
}

function StatusInfo() {
    return (
        <div className={ 'nav__status' }>

        </div>
    )
}

function ProjectSelector(props) {
    return (
        <Select>

        </Select>
    )
}

export default Nav
