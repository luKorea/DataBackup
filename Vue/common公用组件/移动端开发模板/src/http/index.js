import axios from 'axios'

// TODO 封装axios
export const http = (config) => {

  // 创建实例
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  });

  // 请求拦截
  instance.interceptors.request.use(config => {

    return config;
  }, err => {
    console.log(err);
  });
  // 响应拦截
  instance.interceptors.response.use(config => {
    return config;
  }, err => {
    return Promise.reject(err)
  });

  return instance(config);


};
