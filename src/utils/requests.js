import axios from 'axios'
import { showNotify } from 'vant'
import axiosRetry from "axios-retry"

// 封装Axios请求
const request = axios.create({
    baseURL: '/api'
})

// 自动重试
axiosRetry(request, { 
    retries: 1,
    shouldResetTimeout: true,
    retryDelay: (retryCount) => {
        return retryCount * 3000; // 重复请求延迟，每次请求之间间隔10s
    },
 })

// 请求拦截器
request.interceptors.request.use(config => {
    // 统一设置用户身份 token
    config.headers = {
        'NAT_APP_ID': '24c0a2a15683d654a0f55d91456a4695fa61bf4f',
        'NAT_SECRET_KEY': '1776d12acd76d43e3659468dc2783a644be07a55'
    }
    return config
}, error => {
    showNotify({ type: 'warning', message: error.message })
    return Promise.reject(error)
})

// 相应拦截器
request.interceptors.response.use(response => {
    // 统一设置接口相应错误, 比如 token 过期失效, 服务端异常
    return response
}, error => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
        // 1.公共错误处理
        // 2.根据响应码具体处理
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        // 超时处理
        if (JSON.stringify(error).includes('timeout')) {
            showNotify({ type: 'warning', message: '服务器响应超时，请刷新当前页' })
        }
        error.message = '连接服务器失败'
    }
    showNotify({ type: 'warning', message: error.message, duration: 1000 })
    return Promise.reject(error)
})

export default request
