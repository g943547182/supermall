import axios from "axios";


export function request(config, success, failure) {
  //1.创建axios实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    // console.log('来到request拦截success中')
    return config
  }, err => {
    // console.log('来到request拦截failture')
    console.log(err);
  })
  //
  //2.2响应拦截
  instance.interceptors.response.use(response => {
    // console.log('来到response拦截success中');
    return response.data
  }, err => {
    // console.log('来到response拦截failture');
    console.log(err);
  })

  //发送真正的网络请求
  // instance(config)
  //   .then(res => {
  //     // console.log(res);
  //     success(res)
  //   })
  //   .catch(err => {
  //     // console.log(err)
  //     failure(err)
  //   })
  // 3.发送真正的网络请求
  return instance(config)
}
