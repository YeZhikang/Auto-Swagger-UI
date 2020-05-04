import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Tabs } from "antd";
import { CopyOutlined, NodeIndexOutlined } from '@ant-design/icons'

const { TabPane } = Tabs


// 主页面区域，标签栏
function BoardTab(props) {
    const [historyTab, setHistoryTab] = useState([])
    const match = useRouteMatch()

    if (!historyTab.includes(match.params.api)) {
        setHistoryTab([...historyTab, match.params.api])
    }

    useEffect(() => {
        props.tabChange(historyTab)
    }, [match])

    function changeCurrent(index) {
        props.changeCurrent(index)
    }

    return (
        <div className={ 'board-tab' }>
            { match.params.api !== '首页' ?
                <>
                    <SingleTabs changeCurrent={ changeCurrent }/>

                </> : '' }
            { props.children }
        </div>
    )
}

function SingleTabs(props) {

    function changeCurrent(val) {
        const singleTabs = document.querySelectorAll('.single-tabs__tab')
        singleTabs[val].classList.add('single-tabs__tab--active')
        singleTabs[1 - val].classList.remove('single-tabs__tab--active')
        props.changeCurrent(val)
    }

    return (
        <div className={ 'single-tabs' }>
            <div
                onClick={ () => changeCurrent(0) }
                className={ 'single-tabs__tab' }
            >
                <CopyOutlined/> 文档
            </div>
            <div
                onClick={ () => changeCurrent(1) }
                className={ 'single-tabs__tab' }
            >
                <NodeIndexOutlined/> 调试
            </div>
        </div>
    )
}

export default BoardTab
