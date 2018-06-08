import axios from 'axios';
import pathToRegexp from 'path-to-regexp';

import {baseURL} from './config';

const fetch = options => {
  let {method = 'get', data, headers, url} = options;

  const cloneData = {...data};

  try {
    let domin = '';
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/);
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domin + url;
  } catch (e) {
    /* eslint-disable */
    console.error(e.message);
  }

  const service = axios.create({
    baseURL,
    // timeout: 5000, // 请求的超时时间
    withCredentials: true // 允许携带cookie
  });

  service.interceptors.request.use(
    config => {
      if (headers) {
        config.headers = {
          ...config.headers,
          ...headers
        };
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  service.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            /* eslint-disable */
            console.error('无权限');
            break;
          default:
            break;
        }
      }
      return Promise.reject(error); // 返回接口返回的错误信息
    }
  );

  switch (method.toLowerCase()) {
    case 'get':
      return service.get(url, {
        params: cloneData
      });
    case 'delete':
      return service.delete(url, {
        data: cloneData
      });
    case 'post':
      return service.post(url, cloneData);
    case 'put':
      return service.put(url, cloneData);
    case 'patch':
      return service.patch(url, cloneData);
    default:
      return service(options);
  }
};

export default function request(options) {
  return fetch(options)
    .then(response => {
      // const {statusText, status} = response;
      let data = response.data;
      if (data instanceof Array) {
        data = {
          result: data
        };
      }
      return Promise.resolve({
        // success: true,
        // message: statusText,
        // statusCode: status,
        ...data
      });
    })
    .catch(error => {
      const {response} = error;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const {data, statusText} = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      /* eslint-disable */
      return Promise.reject({success: false, statusCode, message: msg});
    });
}
