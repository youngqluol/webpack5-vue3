import axios from 'axios';
import qs from 'qs';

const baseURL = 'api';
const timeout = 80000;

const config = {
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {},
  data: {}
  // withCredentials: false, // 跨域请求时是否需要使用凭证
  // responseType: 'json' // 服务器响应的数据类型,可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
};

const instance = axios.create(config);

// 请求拦截
instance.interceptors.request.use(
  config => {
    let _config = checkUrl(config);
    _config = checkContentType(_config);
    return _config;
  },
  error => {
    return Promise.reject(error);
  }
);

const get = getConfig => {
  return new Promise((resolve, reject) => {
    instance({ method: 'get', ...getConfig }).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

const post = postConfig => {
  return new Promise((resolve, reject) => {
    instance({ method: 'post', ...postConfig }).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
};

function checkUrl(config) {
  if (config.url && config.url.slice(0, 1) !== '/') {
    config.url = '/' + config.url;
  }
  return config;
}

function checkContentType(config) {
  if (
    config.data &&
    Object.keys(config.data).length > 0 &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data);
  }
  return config;
}

export default {
  get,
  post
};
