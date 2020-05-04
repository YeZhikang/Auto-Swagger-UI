import React from "react";

function BoardDocument(props) {
    return(
        <>
            <div className={'board-document__header'}>
                <h2>{props.currentApiInfo.title}</h2>
            </div>
            <div className={'board-document__body'}>
                <h4>
                    <span className={'board-document__body--title'}>请求地址</span><span className={'board-document__body__method'}>{props.currentApiInfo.method}</span>
                    <span className={'board-document__body__url'}>{props.currentApiInfo.url}</span>
                </h4>
                <h4>
                    <span className={'board-document__body--title'}>描述</span>
                    { props.currentApiInfo.description }
                </h4>
            </div>
        </>
    )
}

function BoardDebug() {
    return(
        <h1></h1>
    )
}

// 主区域，主部分
export default class BoardMain extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentApiInfo:{
                title: '获取用户信息',
                url: 'https://api.yezhikang.com/user',
                method: 'GET',
                description: '获取用户基本信息和资料',
                params: [
                    {
                        name: 'id',
                        description: '用户 id',
                        type: 'int',
                        schema: ''
                    }
                ],
                responseStatus: [
                    {
                        statusCode: 200,
                        description: '',
                        schema: ''
                    },
                    {
                        statusCode: 300,
                        description: '',
                        schema: ''
                    },
                    {
                        statusCode: 400,
                        description: '',
                        schema: ''
                    },
                    {
                        statusCode: 500,
                        description: '',
                        schema: ''
                    },
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
                responseExample: {
                    status: 200,
                    data: {
                        userId: 1,
                        name: '叶志康'
                    }
                }
            }
        }
    }

    render() {
        return (
            <div className={'board-body'}>
                {
                    this.props.currentIndex === 0 ? <BoardDocument currentApiInfo={this.state.currentApiInfo}/> : <BoardDebug/>
                }
            </div>
        );
    }
}
