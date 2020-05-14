import React,{createRef} from "react";
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
            editor: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.tableRef = createRef()
    }

    componentDidMount() {
        const element = document.querySelector('.editor-holder');
        const options = {
            mode: 'code',
            history: true,
            onChange: this.onChange,
            onValidationError: this.onError
        };
        console.log(this.props.currentApiInfo.params)
        const editor = new JSONEditor(element, options);
        this.setState({
            editor
        })
    }


    handleChangeValue() {

    }

    async handleSubmit() {
        const selectedRows = this.tableRef.current.getAllValues()

        const data = {}
        selectedRows.forEach(item => {
            data[item.name] = item.value
        })
        const res = await debugRequest[this.props.currentApiInfo.method.toLowerCase()](this.props.currentApiInfo.url, data)
        console.log(res)
        this.state.editor.set(res)
    }

    render() {
        return (
            <div>
                <div className="information--unit">
                    <span className={ `board-debug__body__method board-document__body__method--${this.props.currentApiInfo.method}` }>{ this.props.currentApiInfo.method.toUpperCase() }</span>
                    <input
                        className={ 'board-debug__body__method--input' }
                        value={ this.props.currentApiInfo.url }
                    />
                    <div
                        onClick={ this.handleSubmit }
                        className={ 'board-debug__body__method--right' }
                    >发 送
                    </div>
                </div>
                <div className="information--unit">
                    <Radio.Group
                        defaultValue={ contentTypeOptions[0].value }
                        onChange={ this.handleChangeValue }
                        options={ contentTypeOptions }
                    />
                </div>
                <div className="information--unit">
                    <ParamsSelectorTable ref={this.tableRef} dataSource={ this.props.currentApiInfo.params }/>
                </div>
                <div className={ 'editor-holder' }/>
            </div>
        );
    }
}
