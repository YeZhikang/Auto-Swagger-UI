import axios from "axios";

const debugRequest = axios.create({
    timeout: 10*1000,
})

debugRequest.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 统一错误处理
        // 取消请求导致 response 为空
        if (!error.response) {
            return Promise.reject('请求被取消');
        }
        // const {
        //     status,
        //     data: { message, detail }
        // } = error.response;
        //
        // if (status === 401) {
        //     // 1s后，跳转到登录页（延时增加交互体验）
        //     setTimeout(() => {
        //         window.location.href = '/sign'
        //     }, 100);
        //     //
        //     return Promise.reject('登录失效');
        // }
        //
        // if (status === 500) {
        //     return Promise.reject('服务端异常');
        // }
        //
        // if (message) {
        //     tips.error(message)
        // } else {
        //     return Promise.reject(detail ? detail.slice(0, 50) : '');
        // }
        return error.response.data
    }
);

export default debugRequest
