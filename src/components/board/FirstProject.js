/**
 * 首页
 */

import React from "react";
import Store from '../../store'
import { Table } from "antd";

const methodsColumns = [
    {
        title: '请求类型',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <h4 className={ 'param-title' }>{ text }</h4>
    },
    {
        title: '统计',
        dataIndex: 'count',
        key: 'count',
    }
]

export default class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        Store.subscribe(() => {
            this.setState(Store.getState().projectReducer)
        })
    }

    getApiMethodsObj(parentNodes){
        const apiMethodsCount = {
            'delete': 0,
            'get': 0,
            'post': 0,
            'put': 0,
            'head': 0
        }
        if(parentNodes){
            for(let parentNode of parentNodes){
                for(let item of parentNode.items){
                    apiMethodsCount[item.method] = (apiMethodsCount[item.method] ? apiMethodsCount[item.method] : 0) + 1
                }
            }
        }
        const dataSource = []
        for(let item in apiMethodsCount){
            dataSource.push({
                name: item,
                count: apiMethodsCount[item]
            })
        }
        return dataSource
    }

    render() {
        const apiMethodsCount = this.getApiMethodsObj(this.state.parentNodes)
        return (
            <div style={{
                'flex-grow': '1'
            }}>
                <div className={ 'board-document__header' }>
                    <h2>{ this.state.projectName }</h2>
                </div>
                <div className={ 'board-document__body' }>
                    <div className="information--unit">
                        {
                            //项目、API都需要相应的介绍字段
                        }
                        <h4>
                            <span className={ 'board-document__body--title' }>简介</span>
                            <span className={ 'board-document__body__url' }>Auto-Swagger-UI,一个自动化接口文档与生成器</span>
                        </h4>
                    </div>
                    <div className="information--unit">
                        <h4>
                            <span className={ 'board-document__body--title' }>baseURL</span>
                            <span className={ 'board-document__body__url' }>{ this.state.baseUrl }</span>
                        </h4>
                    </div>
                    <div className="information--unit">
                        <h4>
                            <span className={ 'board-document__body--title' }>接口统计信息</span>
                        </h4>
                        <Table
                            style={{
                                'width': '700px'
                            }}
                            pagination={ false }
                            dataSource={ apiMethodsCount }
                            columns={ methodsColumns }
                            size={'small'}
                        />
                    </div>
                </div>
            </div>
        )
    }

}
