// 请求统一的出口
import ZHRequest from './request'
import { BASE_URL } from './request/config'
import LocalCache from '@/utils/cache'
// 返回的第一个请求函数
const zhRequest = new ZHRequest({
  baseURL: BASE_URL,
  timeout: 5000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers!.Authorization = token
      }
      // console.log('独立类请求拦截')

      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      // console.log('独立类响应拦截')

      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default zhRequest
