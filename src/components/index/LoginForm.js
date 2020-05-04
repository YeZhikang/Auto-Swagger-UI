import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { UserOutlined, LockOutlined } from '@ant-design/icons'

// const layout = {
//     labelCol: {
//         span: 6,
//     },
//     wrapperCol: {
//         span: 18,
//     },
// }
// const tailLayout = {
//     wrapperCol: {
//         offset: 6,
//         span: 18,
//     },
// };

function LoginForm(props) {
    return (
        <div className={ 'fxal fxct fxnw' }>
            <form
                style={ {
                    width: '100%'
                } }
                className={ 'fxal fxct fxnw' }
            >
                <div className={ 'form-item fxal fxct' }>
                    <UserOutlined className={ 'input-icon' }/>
                    <input
                        className={ 'username form-item__input' }
                        type="text"
                        placeholder={ '手机号或邮箱' }
                    />
                </div>
                <div className={ 'form-item fxal fxct' }>
                    <LockOutlined className={ 'input-icon' }/>
                    <input
                        className={ 'password form-item__input' }
                        type="password"
                        placeholder={ '密码' }
                    />
                </div>
                <div className={ 'form-item fxal fxbt mt15' }>
                    <Checkbox>记住我</Checkbox>
                    <div>还没有账号？<Link to={ '/sign/register' }>立即注册</Link></div>
                </div>

                <div className={ 'form-item mt25' }>
                    <Button
                        size={ 'large' }
                        type={ "primary" }
                        className={ 'standard-block-button' }
                        block
                    >登陆</Button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
