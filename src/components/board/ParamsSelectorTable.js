import React from "react";
import {Input,Table} from "antd";

export default function ParamsSelectorTable(props) {
    const paramsColumns = [
        {
            title: '参数名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <h4 className={ 'param-title' }>{ text }</h4>
        },
        {
            title: '参数类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '参数值',
            dataIndex: 'data',
            key: 'data',
            render: (text, record) => <Input placeholder={record.description}/>
        }
    ]
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return(
        <>
            <Table
                pagination={ false }
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={paramsColumns}
                dataSource={props.dataSource}
            />

        </>
    )
}
