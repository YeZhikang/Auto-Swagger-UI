import React from "react";
import { Radio } from "antd";
import ParamsSelectorTable from "./ParamsSelectorTable";
import axios from 'axios'

export default function BoardDebug(props) {
    const contentTypeOptions = [
        { label: 'x-www-form-urlencoded', value: 'x-www-form-urlencoded' },
        { label: 'form-data', value: 'form-data' },
        { label: 'application/json', value: 'application/json' },
    ]

    function handleChangeValue() {

    }

    function handleSubmit() {
        console.log(props.currentApiInfo.method)
        axios[props.currentApiInfo.method.toLowerCase()](props.currentApiInfo.url).then(res => console.log(res)).catch(error => console.log(error))
    }

    return (
        <div className={ 'board-document__body' }>
            <div className="information--unit">
                <span className={ 'board-debug__body__method' }>{ props.currentApiInfo.method }</span>
                <input
                    className={ 'board-debug__body__method--input' }
                    value={ props.currentApiInfo.url }
                />
                <div
                    onClick={ handleSubmit }
                    className={ 'board-debug__body__method--right' }
                >发 送
                </div>
            </div>
            <div className="information--unit">
                <Radio.Group
                    defaultValue={ contentTypeOptions[0].value }
                    onChange={ handleChangeValue }
                    options={ contentTypeOptions }
                />
            </div>
            <div className="information--unit">
                <ParamsSelectorTable dataSource={ props.currentApiInfo.params }/>
            </div>
        </div>
    )
}
