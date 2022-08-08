import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/message/style/css'
// import { LoadingOptions } from 'element-plus/lib/components/loading/src/types'
//自定义接口定义请求拦截的函数类型
interface ZHRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 使ZHRequestConfig 继承 AxiosRequestConfig
interface ZHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZHRequestInterceptors<T>
  showLoading?: boolean
}

const DEFAULT_LOADING = false
//以类的形式封装请求
//以类的形式封装请求有更好的扩展性
class ZHRequest {
  instance: AxiosInstance
  interceptors?: ZHRequestInterceptors
  loading?: any
  showLoading?: boolean
  constructor(config: ZHRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 外部添加请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    //外部添加响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //全局拦截器 所有请求都进行拦截
    //全局请求拦截器
    this.instance.interceptors.request.use(
      (config: ZHRequestConfig) => {
        this.showLoading = config.showLoading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '加载中',
            body: true,
            background: 'rgba(0,0,0,0.3)'
          })
        }
        // console.log('全局请求拦截')
        return config
      },
      (err) => {
        ElMessage({
          message: err,
          type: 'error'
        })
        return err
      }
    )
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 取消加载
        this.loading?.close()
        this.showLoading = DEFAULT_LOADING
        // console.log('全局响应拦截')
        return res
      },
      (err) => {
        this.showLoading = DEFAULT_LOADING
        return err
      }
    )
  }

  // 独立的请求拦截
  request<T>(config: ZHRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        if (config.showLoading) {
          this.showLoading = config.showLoading
        }
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: ZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: ZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}

export default ZHRequest
