# Vue中局部配置axios

```javascript
'use strict'
import axios from 'axios';
import {
    Loading
} from 'element-ui';
export const http = (config) => {
    const instance = axios.create({
        baseUrl: '服务器地址',
        timeout: '设置过期时间'
    })
    // 自定义动画函数
    let loading;
    let startLoading = () => {
        /* 开场动画 */
        loading = Loading.service({
            lock: true,
            text: '正在加载...客官请稍等...',
            background: 'rgba(0,0,0,.6)'
        })
    };
    let endLoading = () => {
        /* 结束动画 */
        loading.close()
    };

    // 设置请求拦截
    instance.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            startLoading()
            return config
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error)
        }
    )

    // 设置响应拦截
    instance.interceptors.response.use(
        function (response) {
            // Do something with response data
            endLoading()
            return response.data
        },
        function (error) {
            // Do something with response error
            endLoading()
            return Promise.reject(error)
        }
    )

    return instance(config)
}
// GET 实例
http({
        url: '127.0.0.1:8080/system/category',
        method: 'GET',
        params: {
            data: 'get请求传递的参数'
        }
    }).then(res => {
        console.table(res)
    })
    .catch(err => {
        console.log(err)
    })
// POSt 实例
http({
        url: '127.0.0.1:8080/system/user',
        method: 'POST',
        data: {
            userName: '',
            password: ''
        }
    }).then(res => {
        console.table(res)
    })
    .catch(err => {
        console.log(err)
    })
```

