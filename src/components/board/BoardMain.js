import React, { useEffect } from "react";
import { Table } from "antd";
import hljs from 'highlight.js'
import BoardDocument from "./BoardDocument";
import BoardDebug from "./BoardDebug";
import Store from '../../store'

// 主区域，主部分
export default class BoardMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseStatus: [
                {
                    statusCode: 200,
                    description: '响应成功',
                    schema: ''
                },
                {
                    statusCode: 300,
                    description: '用户跳转',
                    schema: ''
                },
                {
                    statusCode: 400,
                    description: '客户端请求错误',
                    schema: ''
                },
                {
                    statusCode: 500,
                    description: '服务器错误',
                    schema: ''
                },
            ],
            currentApiInfo: {
                title: '获取用户信息',
                url: 'https://api.yezhikang.com/user',
                method: 'GET',
                description: '获取用户基本信息和资料',
                params: [
                    {
                        name: 'id',
                        description: '用户 id',
                        requestType: 'query',
                        isNecessary: 'true',
                        type: 'int',
                        schema: ''
                    }
                ],
                responseData: [
                    {
                        name: 'userId',
                        description: '用户 id',
                        type: 'int',
                        schema: ''
                    },
                    {
                        name: 'name',
                        description: '用户姓名',
                        type: 'string',
                        schema: ''
                    },
                    {
                        name: 'gender',
                        description: '用户性别',
                        type: 'string',
                        schema: ''
                    }
                ],
                responseExample: "{\n \tdata: 'sss',\n \tname: '333', \n \ttime:'2000-01-30' \n}",
                currentApi: null
            }
        }
        Store.subscribe(() => {
            const project = Store.getState().projectReducer
            const apiTitle = Store.getState().projectInfoReducer.api;
            console.log(this.state.currentApi, apiTitle)
            if (this.state.currentApi !== apiTitle) {
                this.setState({
                    currentApi: apiTitle,
                    project: project
                })
                this.getApiInfo(project, apiTitle)
            }
        })
    }

    getApiInfo(project, apiTitle) {
        if (!project.parentNodes) {
            return
        }
        for (let parentNode of project.parentNodes) {
            for (let api of parentNode.items) {
                if (api.title === apiTitle) {
                    this.setState({
                        currentApiInfo: api
                    })
                }
            }
        }
    }

    render() {

        return (
            <div className={ 'board-body' }>
                {
                    this.props.currentIndex === 0 ?
                        <BoardDocument
                            currentApiInfo={ {
                                ...this.state.currentApiInfo,
                                responseStatus: this.state.responseStatus
                            } }
                            project={this.state.project}
                        /> :
                        <BoardDebug
                            currentApiInfo={ {
                                ...this.state.currentApiInfo,
                                responseStatus: this.state.responseStatus
                            } }
                            project={this.state.project}
                        />
                }
            </div>
        );
    }
}
