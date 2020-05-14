import React, { useEffect } from "react";
import hljs from "highlight.js";
import { Table } from "antd";

export default function BoardDocument(props) {
    const paramsColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <h4 className={ 'param-title' }>{ text }</h4>
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '请求类型',
            dataIndex: 'requestType',
            key: 'description',
        },
        {
            title: '是否必须',
            dataIndex: 'isNecessary',
            key: 'isNecessary',
            render: (text) => text ? <h4
                className={ 'param-title' }
                style={ { 'color': '#ffba00' } }
            >{ text.toString() } </h4> : <span>{ text.toString() }</span>
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'schema',
            dataIndex: 'schema',
            key: 'schema'
        }
    ]
    const responseStatusColumns = [
        {
            title: '响应码',
            dataIndex: 'statusCode',
            key: 'statusCode',
            render: (text) => <h4 className={ 'param-title' }>{ text }</h4>
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'schema',
            dataIndex: 'schema',
            key: 'schema',
            // render: (text) => {
            //     if(!text) return <span>无数据</span>
            //     return <span>{text}</span>
            // }
        },
    ]
    const responseDataColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <h4 className={ 'param-title' }>{ text }</h4>
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'schema',
            dataIndex: 'schema',
            key: 'schema'
        }
    ]

    // function addHLJSEventListener(dom){
    //     dom.addEventListener('compositionstart',function(){
    //         hljs.highlightBlock(document.querySelector('.hljss'));
    //     });
    // }

    useEffect(() => {
        if (props.currentApiInfo.responseExample) {
            hljs.highlightBlock(document.querySelector('.example-code'))
        }
    })


    return (
        <>
            <div className={ 'board-document__header' }>
                <h2>{ props.currentApiInfo.title }</h2>
            </div>
            <div className={ 'board-document__body' }>
                <div className="information--unit">
                    <h4>
                        <span className={ 'board-document__body--title' }>
                            请求地址
                        </span>
                        <span className={ `board-document__body__method board-document__body__method--${props.currentApiInfo.method}`}>
                            { props.currentApiInfo.method.toUpperCase() }
                        </span>
                        <span className={ 'board-document__body__url' }>{ props.currentApiInfo.url }</span>
                    </h4>
                </div>
                <div className="information--unit">
                    <h4>
                        <span className={ 'board-document__body--title' }>描述</span>
                        { props.currentApiInfo.description }
                    </h4>
                </div>
                <div className="information--unit">
                    <h4>
                        <span className={ 'board-document__body--title' }>请求参数</span>
                    </h4>
                    <Table
                        pagination={ false }
                        dataSource={ props.currentApiInfo.params }
                        columns={ paramsColumns }
                    />
                </div>
                <div className={ 'information--unit' }>
                    <h4>
                        <span className={ 'board-document__body--title' }>响应状态码</span>
                    </h4>
                    <Table
                        pagination={ false }
                        dataSource={ props.currentApiInfo.responseStatus }
                        columns={ responseStatusColumns }
                    />
                </div>
                <div className={ 'information--unit' }>
                    <h4>
                        <span className={ 'board-document__body--title' }>响应数据</span>
                    </h4>
                    <Table
                        pagination={ false }
                        dataSource={ props.currentApiInfo.responseData }
                        columns={ responseDataColumns }
                    />
                </div>
                <div>
                    <h4>
                        <span className={ 'board-document__body--title' }>返回示例</span>
                    </h4>
                    {
                        props.currentApiInfo.responseExample ?
                            <pre className={ 'example-code' }>
                            { props.currentApiInfo.responseExample }
                        </pre>
                            : <div className={ 'mt15' }>暂无数据</div>
                    }
                </div>
            </div>
        </>
    )
}
