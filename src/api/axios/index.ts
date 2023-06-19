import axios, { type AxiosRequestConfig } from 'axios';
import { checkContentType, checkUrl } from './utils';

const baseURL = 'api';
const timeout = 80000;

const config = {
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  params: {},
  data: {},
  // withCredentials: false, // 跨域请求时是否需要使用凭证
};

const instance = axios.create(config);

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    let _config = checkUrl(config);
    _config = checkContentType(_config);
    return _config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function get(getConfig: AxiosRequestConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    instance({ method: 'get', ...getConfig }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

function post(postConfig: AxiosRequestConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    instance({ method: 'post', ...postConfig }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

export {
  get,
  post,
};
