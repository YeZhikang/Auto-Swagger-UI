import { Modal, Table } from "antd";
import React, { useState, useEffect } from "react";
import Store from '../../store'
import MethodCard from "../tools/methods";


function StatusPoint({ status }) {
    const statusColor = status ? '#00d38d' : '#AAA'
    return (
        <div
            style={{
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                backgroundColor: statusColor
            }}
        ></div>
    )
}

function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const columnData = [
    {
        title: '方法',
        dataIndex: 'method',
        key: 'method',
        render: (text) => <MethodCard method={ text }/>
    },
    {
        title: '名称',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '所属模块',
        dataIndex: 'belongModule',
        key: 'belongModule',
    },
    {
        title: '请求地址',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',

        // check status
        render: (text) => <StatusPoint status={ text }/>
    },
]


export default function ExportApiModal(props) {

    const [apiInfo, setApiInfo] = useState({})
    const [saveApi, setSaveApi] = useState({})

    useEffect(() => {
        if (props.visible === true) {
            setApiInfo(Store.getState().projectReducer)

            // 异步
            console.log(apiInfo) // 返回: {}
        }
    }, [props.visible])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSaveApi({
                projectId: apiInfo.projectId,
                exportApiArr: [...selectedRows]
            })
        },
        getCheckboxProps: record => ({
            id: record.id,
        }),
    };


    function handleCancel() {
        props.handleClose()
    }

    function outputStandardApiArr() {
        if (apiInfo.hasOwnProperty('parentNodes')) {
            const standardOutput = []
            for (let module of apiInfo.parentNodes) {
                for (let link of module.items) {
                    const standardAPI = {
                        title: link.title,
                        belongModule: module.title,
                        url: link.url,
                        method: link.method,
                        contentType: link.contentType,
                        status: !!link.exampleRes,
                        key: link.id.toString(),
                        requestParams: link.params,
                    }

                    standardOutput.push(standardAPI)
                }
            }
            return standardOutput
        } else {
            return []
        }
    }

    const handleOk = async () => {
        const res = await window.server.post('/api/project/exportApi', saveApi)
        if(res.filename){
            // const isDownload = await window.server.get(`/${res}`)
            // downloadJs('http://127.0.0.1:3020/'+ res)
            download(res.filename, res.data)
        }
    }


    return (
        <Modal
            width={ 900 }
            title="新增API"
            visible={ props.visible }
            onCancel={ handleCancel }
            onOk={ handleOk }
        >
            <h2> { apiInfo.projectName } <small
                style={ {
                    color: 'gray',
                    fontSize: '14px'
                } }
            >{ apiInfo.description }</small></h2>
            <Table
                rowSelection={ {
                    type: 'checkbox',
                    ...rowSelection,
                } }
                pagination={ false }
                dataSource={ outputStandardApiArr() }
                columns={ columnData }
            />
        </Modal>
    )
}
