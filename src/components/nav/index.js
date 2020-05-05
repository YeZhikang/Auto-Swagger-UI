import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Select, } from 'antd'
import Input from "antd/lib/input";
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select

function Nav(props) {
    function handleChangeCurrent(value) {
        props.changeCurrent(value)
    }

    return (
        <div className={ 'nav fxal fxbt' }>

            <Select
                onChange={ handleChangeCurrent }
                defaultValue={ props.projectList.length > 0 ? props.projectList[0] : '' }
                style={ { width: 229 } }
            >
                {
                    props.projectList.map(item => <Option value={ item }>{ item }</Option>)
                }
            </Select>

            <div className={ 'fxal ' }>
                <Button  type={'link'} style={{marginRight: '20px'}}>添加新接口</Button>
                <Input
                    placeholder={ '请输入搜索内容' }
                    prefix={ <SearchOutlined/> }
                    className={ 'nav__search' }
                />
                <div className={ 'nav__logo' }>Auto Swagger</div>
            </div>
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
