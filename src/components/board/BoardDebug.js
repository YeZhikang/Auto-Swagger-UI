import React, { createRef } from "react";
import { Radio } from "antd";
import ParamsSelectorTable from "./ParamsSelectorTable";
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
import debugRequest from "../../api/debugRequest";


const contentTypeOptions = [
    { label: 'x-www-form-urlencoded', value: 'x-www-form-urlencoded' },
    { label: 'form-data', value: 'form-data' },
    { label: 'application/json', value: 'application/json' },
]

export default class BoardDebug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: null,
            contentType: contentTypeOptions[0].value,
            isSend: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.tableRef = createRef()
        this.inputRef = createRef()
        this.handleChangeValue = this.handleChangeValue.bind(this)
    }

    componentDidMount() {
        const element = document.querySelector('.editor-holder');
        const options = {
            mode: 'code',
        };
        console.log(this.props.currentApiInfo.params)
        const editor = new JSONEditor(element, options);
        this.setState({
            editor
        })
    }


    handleChangeValue(val) {
        console.log(val.target.value)
        this.setState({
            contentType: val.target.value
        })
    }

    async handleSubmit() {
        this.setState({
            isSend: true
        })
        setTimeout(async () => {
            const selectedRows = this.tableRef.current.getAllValues()
            const url = this.inputRef.current.value
            const data = {}
            selectedRows.forEach(item => {
                data[item.name] = item.value
            })
            const res = await BoardDebug.getCurrentRequest(url, this.props.currentApiInfo.method.toLowerCase(), data, this.state.contentType)
            this.state.editor.set(res)
        }, 0)
    }

    static getCurrentRequest(url, method, data, contentType) {
        if (contentType === 'form-data') {
            const formData = new FormData();
            for (let item in data) {
                if (data.hasOwnProperty(item)) {
                    formData.append(item, data[item])
                }
            }
            data = formData
        }
        switch (method) {
            case 'get':
                return debugRequest.get(url, {
                    params: {
                        ...data
                    },
                    headers: {
                        'content-type': contentType
                    }
                })
            case 'post':
                return debugRequest.post(url, data, {
                    headers: {
                        'content-type': contentType
                    }
                })
            case 'put':
                return debugRequest.put(url, data, {
                    headers: {
                        'content-type': contentType
                    }
                })
            case 'delete':
                return debugRequest.delete(url, {
                    params: {
                        ...data
                    },
                    headers: {
                        'content-type': contentType
                    }
                })
            case 'head':
                return debugRequest.head(url, {
                    params: {
                        ...data
                    },
                    headers: {
                        'content-type': contentType
                    }
                })
            default:
                throw 'error! not match any method!'
        }
    }

    render() {
        return (
            <div>
                <div className="information--unit">
                    <span className={ `board-debug__body__method board-document__body__method--${ this.props.currentApiInfo.method }` }>{ this.props.currentApiInfo.method.toUpperCase() }</span>
                    <input
                        ref={ this.inputRef }
                        className={ 'board-debug__body__method--input' }
                        defaultValue={ this.props.currentApiInfo.url }
                    />
                    <div
                        onClick={ this.handleSubmit }
                        className={ 'board-debug__body__method--right' }
                    >发 送

                    </div>
                </div>
                <div className="information--unit">
                    <Radio.Group
                        value={ this.state.contentType }
                        onChange={ this.handleChangeValue }
                        options={ contentTypeOptions }
                    />
                </div>
                <div className="information--unit">
                    <ParamsSelectorTable
                        ref={ this.tableRef }
                        dataSource={ this.props.currentApiInfo.params }
                    />
                </div>
                {
                    this.state.isSend ?
                    <div
                        style={ { 'height': '300px' } }
                        className={ 'editor-holder' }
                    />  : null
                }
            </div>
        );
    }
}
