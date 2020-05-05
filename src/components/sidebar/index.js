import React, { useState, useEffect } from "react";
import { Link,withRouter } from "react-router-dom";
import { Menu } from "antd";

const { SubMenu } = Menu



function Sidebar(props) {

    function handleClick({ item, key, keyPath, domEvent }) {
        // item.props.children
        console.log(item)
        props.history.push(`/index/${props.currentProject}/${item.props.children[1]}`)
    }

    return (
        <Menu mode="inline" className={'menu mt15'} onClick={ handleClick } style={{ width: 256, position: 'fixed', }}>
            {
                props.parentNodes.map(item =>{
                    if(item.items){
                        return (
                            <SubMenu
                                key={ item.id }
                                title={ item.title }
                            >
                                { item.items.map(subItem => <Menu.Item key={ subItem.id }>{ subItem.title }</Menu.Item>) }
                            </SubMenu>
                        )
                    }else{
                        return (
                            <Menu.Item key={ item.id }>{ item.title }</Menu.Item>
                        )
                    }
                })
            }
        </Menu>
    )
}



export default withRouter(Sidebar)
