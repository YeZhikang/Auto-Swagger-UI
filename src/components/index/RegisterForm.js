import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons'

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
}

const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 18,
    },
};

function RegisterForm(props) {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const handleSubmit = async () => {
        const registerForm = document.querySelector('.form')
        const name = registerForm['userName'].value
        const phone = registerForm['phoneNumber'].value
        const password = registerForm['password'].value

        const response = await window.server.post('/api/user/register', {name,phone,password})
        console.log(response)
    }

    return (
        <div>
            <form
                style={ {
                    width: '100%'
                } }
                className={ 'fxal fxct fxnw form' }
            >
                <div className={ 'form-item fxal fxct' }>
                    <UserOutlined className={ 'input-icon' }/>
                    <input
                        className={ 'username form-item__input' }
                        name={ 'userName' }
                        type="text"
                        placeholder={ '你的昵称' }
                    />
                </div>
                <div className={ 'form-item fxal fxct' }>
                    <PhoneOutlined className={ 'input-icon' }/>
                    <input
                        className={ 'middle form-item__input' }
                        name={ 'phoneNumber' }
                        type="text"
                        placeholder={ '手机号' }
                    />
                </div>
                <div className={ 'form-item fxal fxct' }>
                    <LockOutlined className={ 'input-icon' }/>
                    <input
                        className={ 'password form-item__input' }
                        name={ 'password' }
                        type="password"
                        placeholder={ '设置密码' }
                    />
                </div>
                <div className={ 'form-item fxal fxbt mt15' }>
                    <div>已有账号？<Link to={ '/sign' }>立即登陆</Link></div>
                </div>

                <div className={ 'form-item mt25' }>
                    <Button
                        onClick={handleSubmit}
                        size={ 'large' }
                        type={ "primary" }
                        className={ 'standard-block-button button-color-success' }
                        block
                    >立即注册</Button>
                </div>
            </form>
        </div>
    )
}


export default RegisterForm
