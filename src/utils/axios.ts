import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Result<T> = {
  code: number;
  msg: string;
  data: T;
};
const baseURL = "http://10.168.9.66:8080/api";

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: baseURL, timeout: 10000 };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token，用于后端的验证
        // const token = localStorage.getItem("token") as string
        // if(token) {
        //   config.headers!.Authorization = token;
        // }
        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res.data;
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let message = "";
        switch (err.response.status) {
          case 400:
            message = "请求错误(400)";
            break;
          case 401:
            message = "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            break;
          case 403:
            message = "拒绝访问(403)";
            break;
          case 404:
            message = "请求出错(404)";
            break;
          case 500:
            message = "服务器错误(500)";
            break;
          default:
            message = `连接出错(${err.response.status})!`;
        }
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.get(url, config);
  }
  // TODO Promise<AxiosResponse<Result<T>>>

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.post(url, data, config);
  }
}

// 默认导出Request实例
export default new Request({})
