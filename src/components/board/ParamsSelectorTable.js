import React from "react";
import {Input,Table} from "antd";

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
        render: (text, record) => <Input className={'input-area'} placeholder={record.description}/>
    }
]

export default class ParamsSelectorTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: []
        }
    }

    getAllValues(){
        const inputArr = document.querySelectorAll('.input-area')
        for(let item of this.state.selectedRows){
            const value = inputArr[item.key].value
            console.log(value)
            item.value = value
        }
        return this.state.selectedRows
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                selectedRows
            })
        },
        getCheckboxProps: record => ({
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    render() {
        const dataSource = this.props.dataSource.map((item,index) => {
            return {...item, key:index}
        })

        return (
            <>
                <Table
                    pagination={ false }
                    rowSelection={{
                        type: 'checkbox',
                        ...this.rowSelection,
                    }}
                    columns={paramsColumns}
                    dataSource={dataSource}
                />
            </>
        );
    }

}
