import axios from 'axios'
import qs from 'qs';
import {message} from "antd";
const tips = message

const server = axios.create({
    timeout: 10*1000,
    baseURL: 'http://127.0.0.1:3020',
    headers: {
        'content-type': 'application/json'
    }
})


// http request 拦截器
server.interceptors.request.use(
    config => {
        // 统一请求头设置
        if (
            config.headers['Content-Type'] ===
            'application/x-www-form-urlencoded'
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
        }

        if( localStorage.getItem('token') ){
            config.headers['Authorization'] = localStorage.getItem('token')
        }
        return config;
    },
    error => {
        // 统一错误处理
        return Promise.reject(error);
    }
);

// http response 拦截器
server.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        // 统一错误处理
        // 取消请求导致 response 为空
        if (!error.response) {
            return Promise.reject('请求被取消');
        }
        const {
            status,
            data: { message, detail }
        } = error.response;

        if (status === 401) {
            // 1s后，跳转到登录页（延时增加交互体验）
            setTimeout(() => {
                window.location.href = '/sign'
            }, 100);
            //
            return Promise.reject('登录失效');
        }

        if (status === 500) {
            return Promise.reject('服务端异常');
        }

        if (message) {
            tips.error(message)
        } else {
            return Promise.reject(detail ? detail.slice(0, 50) : '');
        }
    }
);



export default server
