import { Button, Checkbox, Form, Input } from "antd";
import { Link,withRouter } from "react-router-dom";
import React from "react";
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Store from '../../store/index'
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
    async function handleLogin() {
        const form = document.querySelector('.login-form')
        const name = form['name'].value
        const password = form['password'].value

        const res = await window.server.post('/api/user/login', {name,password})
        if(res.token){
            localStorage.setItem('token', res.token)
            Store.dispatch({ type: 'SET', value:{name, password} })
            props.history.push('/user')
        }
    }
    return (
        <div className={ 'fxal fxct fxnw' }>
            <form
                style={ {
                    width: '100%'
                } }
                className={ 'fxal fxct fxnw login-form' }
            >
                <div className={ 'form-item fxal fxct' }>
                    <UserOutlined className={ 'input-icon' }/>
                    <input
                        className={ 'username form-item__input' }
                        type="text"
                        name={'name'}
                        placeholder={ '手机号或昵称' }
                    />
                </div>
                <div className={ 'form-item fxal fxct' }>
                    <LockOutlined className={ 'input-icon' }/>
                    <input
                        className={ 'password form-item__input' }
                        type="password"
                        name={'password'}
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
                        onClick={handleLogin}
                    >登陆</Button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(LoginForm)
