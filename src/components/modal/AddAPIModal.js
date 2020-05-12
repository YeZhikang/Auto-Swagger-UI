import React, { createRef, useEffect, useState } from "react";
import { Modal, Button, Checkbox, Input, Select, Form, Divider, Radio } from "antd";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};

const contentTypeOptions = [
    { label: 'x-www-form-urlencoded', value: 'x-www-form-urlencoded' },
    { label: 'form-data', value: 'form-data' },
    { label: 'application/json', value: 'application/json' },
]

export default class APIModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiMenu: [],
            requestParams: [{
                id: 1
            }],
            responseParams: [
                {id: 1}
            ],
            currentParamsId: 1,
            currentResponseParamsId: 1
        }
    }

    static getDerivedStateFromProps(prevProps, prevState){
        if(prevState.apiMenu.length === 0){
            return prevProps
        }else{
            return null
        }
    }

    // 确认添加API
    handleOk = () => {
        this.props.handleAddAPI()
    }

    // 取消修改
    handleCancel = () => {
        this.props.handleCancel()
    }

    static getSnapshotBeforeUpdate(prevProps, prevState) {
    }

    // 添加一个新的类别
    addCategory = (ref) => {
        const apiMenu = this.state.apiMenu
        const lastId = apiMenu.slice(-1)[0].id
        const newData = { id: lastId + 1, title: ref.current.input.value }
        this.setState({
            apiMenu: [...apiMenu, newData],
        })

        ref.current.setState({
            value: ''
        })
    }

    handleAddParams = ( isRes=false ) => {
        const { currentResponseParamsId,currentParamsId, requestParams, responseParams } = this.state
        if(isRes){
            this.setState({
                responseParams: [...responseParams, {
                    id: currentResponseParamsId + 1
                }],
                currentResponseParamsId: currentResponseParamsId + 1
            })
        }else{
            this.setState({
                requestParams: [...requestParams, {
                    id: currentParamsId + 1
                }],
                currentParamsId: currentParamsId + 1
            })
        }
    }
    handleMinusParam = (id,isRes=false) => {
        if(isRes){
            const responseParams = this.state.responseParams.filter(item => item.id !== id)
            this.setState({
                responseParams
            })
        }else{
            const requestParams = this.state.requestParams.filter(item => item.id !== id)
            this.setState({
                requestParams: requestParams
            })
        }
    }

    onFinish = values => {
        console.log('Success:', values);
    };

    render() {
        const initalValues = {
            belongProject: {
                projectName: this.props.projectInfo.projectName,
                baseUrl: this.props.projectInfo.baseUrl
            }
        }
        const ref = createRef()
        const formRef = createRef()
        return (
            <Modal
                width={ 700 }
                title="新增API"
                visible={ this.props.visible }
                onCancel={ this.handleCancel }
            >
                <Form
                    ref={ formRef }
                    { ...formItemLayout }
                    name="basic"
                    initialValues={ {
                        remember: true,
                        ...initalValues
                    } }
                    onFinish={this.onFinish}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="所属项目"
                        name="belongProject"
                    >
                        <Input.Group compact>
                            <Form.Item
                                name={ ['belongProject', 'projectName'] }
                                noStyle
                            >
                                <Select
                                    style={ {
                                        width: '50%'
                                    }}
                                    // dropdownRender={menu => (
                                    //     <div>
                                    //         {menu}
                                    //         <Divider style={{ margin: '4px 0' }} />
                                    //         <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                    //             <Input style={{ flex: 'auto' }} />
                                    //             <a
                                    //                 style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                    //                 onClick={this.addItem}
                                    //             >
                                    //                 <PlusOutlined /> Add item
                                    //             </a>
                                    //         </div>
                                    //     </div>
                                    // )}
                                >
                                    {
                                        this.props.projectList.map(item => <Option value={ item }>{ item }</Option>)
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={ ['belongProject', 'baseUrl'] }
                                noStyle
                            >
                                <Input
                                    style={ {
                                        width: '50%'
                                    } }
                                    placeholder={ 'baseURL' }
                                />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        label="所属分类"
                        name="belongCategory"
                    >
                        <Select
                            dropdownRender={ menu => (
                                <div>
                                    { menu }
                                    <Divider style={ { margin: '4px 0' } }/>
                                    <div style={ { display: 'flex', flexWrap: 'nowrap', padding: 8 } }>
                                        <Input
                                            ref={ ref }
                                            style={ { flex: 'auto' } }
                                        />
                                        <a
                                            style={ {
                                                flex: 'none',
                                                padding: '8px',
                                                display: 'block',
                                                cursor: 'pointer'
                                            } }
                                            onClick={ this.addCategory.bind(this, ref) }
                                        >
                                            <PlusOutlined/> Add item
                                        </a>
                                    </div>
                                </div>
                            ) }
                        >
                            {
                                this.state.apiMenu.map(item => <Option value={ item.title }>{ item.title }</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={ 'API名称' }
                        name={ 'apiName' }
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={ '请求方式' }
                        name={ 'method' }
                    >
                        <Select>
                            <Option value={ 'get' }>GET</Option>
                            <Option value={ 'post' }>POST</Option>
                            <Option value={ 'put' }>PUT</Option>
                            <Option value={ 'delete' }>DELETE</Option>
                            <Option value={ 'header' }>HEADER</Option>
                            <Option value={ 'option' }>OPTION</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={ '请求URL' }
                        name={ 'requestURL' }
                    >
                        <Input placeholder={'请输入相对地址'}/>
                    </Form.Item>
                    <Form.Item
                        label={ '请求格式' }
                        name={ 'requestType' }
                    >
                        <Radio.Group
                            initialValues={ contentTypeOptions[0].value }
                            options={ contentTypeOptions }
                        />
                    </Form.Item>
                    {/*<Form.List*/ }
                    {/*    label={ '请求参数列表' }*/ }
                    {/*    name={'request'}*/ }
                    {/*>*/ }
                    {/*    { (fields, { add, remove }) => {*/ }
                    {/*        return (*/ }
                    {/*            <div>*/ }
                    {/*                { fields.map((field, index) => (*/ }

                    {
                        <>
                            {
                                this.state.requestParams.map((value, index, array) => {
                                    return (
                                        <Form.Item
                                            name={ `requestParams-${ value.id }` }
                                            label={ `请求参数-${ value.id }` }
                                        >
                                            <Input.Group compact>
                                                <Form.Item
                                                    name={ [`requestParams-${ value.id }`, 'name'] }
                                                    noStyle
                                                    rules={ [{ required: true, message: '参数名不能为空' }] }
                                                >
                                                    <Input
                                                        style={ { width: '19%' } }
                                                        placeholder="参数名"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={ [`requestParams-${ value.id }`, 'description'] }
                                                    noStyle
                                                >
                                                    <Input
                                                        style={ { width: '19%' } }
                                                        placeholder="参数描述"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={ [`requestParams-${ value.id }`, 'requestType'] }
                                                    noStyle
                                                >
                                                    <Input
                                                        style={ { width: '19%' } }
                                                        placeholder="请求类型"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={ [`requestParams-${ value.id }`, 'isNecessary'] }
                                                    noStyle
                                                >
                                                    <Select
                                                        placeholder={ '是否必须' }
                                                        style={ { width: '19%' } }
                                                    >
                                                        <Option value={ true }>是</Option>
                                                        <Option value={ false }>否</Option>
                                                    </Select>
                                                    {/*<Input style={{ width: '20%' }} placeholder="是否必须" />*/ }
                                                </Form.Item>
                                                <Form.Item
                                                    name={ [`requestParams-${ value.id }`, 'type'] }
                                                    noStyle
                                                >
                                                    <Select
                                                        placeholder={ '数据格式' }
                                                        style={ { width: '19%' } }
                                                    >
                                                        <Option value={ 'int' }>INT</Option>
                                                        <Option value={ 'string' }>STRING</Option>
                                                        <Option value={ 'number' }>FLOAT</Option>
                                                        <Option value={ 'object' }>OBJECT</Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item
                                                    name={ [`requestParams-${ value.id }`, 'type'] }
                                                    noStyle
                                                >
                                                    <Button
                                                        onClick={ this.handleMinusParam.bind(this, value.id,false) }
                                                        type={ "link" }
                                                        style={ {
                                                            width: '5%'
                                                        } }
                                                    ><MinusCircleOutlined/></Button>
                                                </Form.Item>
                                            </Input.Group>
                                        </Form.Item>
                                    )
                                })
                            }
                            <Form.Item
                                { ...formItemLayoutWithOutLabel }
                            >
                                <Button
                                    onClick={ this.handleAddParams.bind(this,false) }
                                    block
                                    type={"dashed"}
                                >添加</Button>
                            </Form.Item>
                        </>

                    }

                    {
                        <>
                            {
                                this.state.responseParams.map((value, index, array) => {
                                    return (
                                        <Form.Item
                                            name={ `responseParams-${ value.id }` }
                                            label={ `响应参数-${ value.id }` }
                                        >
                                            <Input.Group compact>
                                                <Form.Item
                                                    name={ [`responseParams-${ value.id }`, 'name'] }
                                                    noStyle
                                                    rules={ [{ required: true, message: '参数名不能为空' }] }
                                                >
                                                    <Input
                                                        style={ { width: '31%' } }
                                                        placeholder="参数名"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={ [`responseParams-${ value.id }`, 'description'] }
                                                    noStyle
                                                >
                                                    <Input
                                                        style={ { width: '31%' } }
                                                        placeholder="参数描述"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={ [`responseParams-${ value.id }`, 'type'] }
                                                    noStyle
                                                >
                                                    <Input
                                                        style={ { width: '31%' } }
                                                        placeholder="参数类型"
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    noStyle
                                                >
                                                    <Button
                                                        onClick={ this.handleMinusParam.bind(this, value.id, true) }
                                                        type={ "link" }
                                                        style={ {
                                                            width: '5%'
                                                        } }
                                                    ><MinusCircleOutlined/></Button>
                                                </Form.Item>
                                            </Input.Group>
                                        </Form.Item>
                                    )
                                })
                            }
                            <Form.Item
                                { ...formItemLayoutWithOutLabel }
                            >
                                <Button
                                    onClick={ this.handleAddParams.bind(this,true) }
                                    block
                                    type={"dashed"}
                                >添加</Button>
                            </Form.Item>
                        </>

                    }
                    {/*            <Form.Item*/ }
                    {/*                {...formItemLayoutWithOutLabel}*/ }
                    {/*            >*/ }
                    {/*                <Button*/ }
                    {/*                    type="dashed"*/ }
                    {/*                    onClick={() => {*/ }
                    {/*                        add();*/ }
                    {/*                    }}*/ }
                    {/*                    style={{ width: '100%' }}*/ }
                    {/*                >*/ }
                    {/*                    <PlusOutlined /> 添加请求参数*/ }
                    {/*                </Button>*/ }
                    {/*            </Form.Item>*/ }
                    {/*        </div>)*/ }
                    {/*} }*/ }
                    {/*</Form.List>*/ }
                    <Button type="primary" htmlType="submit">
                        提 交
                    </Button>
                </Form>
            </Modal>
        );
    }
}
