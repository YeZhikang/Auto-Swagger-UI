import React, { useEffect, useState } from "react";
import {Tabs} from 'antd'
import BoardTab from "./BoardTab";
import {Link, useRouteMatch,withRouter} from "react-router-dom";
import BoardMain from "./BoardMain";

const {TabPane} = Tabs


export default withRouter(function Board(props) {
    const [tabArr, setTabArr] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [subCurrentIndex, setSubCurrentIndex] = useState(0)
    const route = useRouteMatch()

    function handleTabChange(tabs) {
        setTabArr(tabs)
        setCurrentIndex(route.params.api)
    }

    function callBack(val) {
        setCurrentIndex(val)
        props.history.push(`/index/${route.params.projectName}/${val}`)
    }

    // 选择是调试或者是文档
    function changeCurrent(index) {
        setSubCurrentIndex(index)
    }


    return(
        <div className={'board'}>
            <Tabs activeKey={currentIndex} defaultActiveKey={currentIndex} onChange={callBack}>
                {
                    tabArr.map(item => <TabPane tab={item} key={item}/>)
                }
            </Tabs>
            <BoardTab changeCurrent={changeCurrent} tabChange={(tabs) => handleTabChange(tabs)}>
                <BoardMain currentIndex={subCurrentIndex} />
            </BoardTab>
        </div>
    )
})

