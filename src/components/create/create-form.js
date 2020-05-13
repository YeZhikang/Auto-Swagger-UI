import React from 'react'
import { Form, Button, Select, Input, Radio, message, } from "antd";
import Store from '../../store'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

const { Textarea } = Input

export default function CreateForm() {
    async function onFinish(values) {
        const { name, phone } = Store.getState()
        console.log(values)
        const res = await window.server.post('/api/project/create-project', { phone, name, ...values })
        if (res) {
            console.log('yes')
            message.success('创建成功')
        }
    }

    const onFinishFailed = () => {

    }


    return (
        <div>
            <Form
                name="createForm"
                onFinish={ onFinish }
                onFinishFailed={ onFinishFailed }
                { ...layout }
            >
                <Form.Item
                    label={ '项目名称' }
                    name={ 'projectName' }
                >
                    <Input placeholder={ 'eg: auto-swagger-ui' }/>
                </Form.Item>
                <Form.Item
                    label={ 'baseUrl' }
                    name={ 'baseUrl' }
                >
                    <Input placeholder={ 'eg: https://api.baidu.com' }/>
                </Form.Item>
                <Form.Item
                    label={ '描述' }
                    name={ 'description' }
                >
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    label={ '您的身份' }
                    name={ 'identify' }
                >
                    <Radio.Group>
                        <Radio value={ 'backend' }>后端开发</Radio>
                        <Radio value={ 'frontend' }>前端开发</Radio>
                        <Radio value={ 'allStackOrTest' }>全栈/测试</Radio>
                    </Radio.Group>
                </Form.Item>

                <Button
                    htmlType="submit"
                    block
                    type={ 'primary' }
                >创建</Button>

            </Form>
        </div>
    )
}
