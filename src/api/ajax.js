import { ElLoading, ElMessage } from 'element-plus'
import axios from 'axios'
import { AuthStore } from '@/store';//导入用户仓库
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  showLoading: false,
  showError: true,
  token: false,//控制是否需要携带请求头令牌
});

let loading = null;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  //如果需要携带请求头令牌,则从用户仓库中获取token设置请求头x-token中
  if (config.token) {
    let authStore = AuthStore();
    if (authStore.isLogin) {
      config.headers["x-token"] = authStore.token;
    }
  }
  if (config.showLoading) {
    loading = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.1)',
    });
  }

  // 在发送请求之前做些什么
  return config;
}, function (error) {
  if (loading != null) {
    loading.close();
    loading = null;
  }
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (loading != null) {
    loading.close();
    loading = null;
  }

  // console.debug(response);
  //对错误信息进行全局提示
  if (response.config.showError) {
    if ("ok" in response.data) {
      if (!response.data.ok) {
        // ElMessage.error(response.data.message);
      }
    }
  }

  return response;
}, function (error) {
  if (loading != null) {
    loading.close();
    loading = null;
  }
  // 对响应错误做点什么
  // ElMessage.error("响应错误:" + error.message);
  return Promise.reject(error);
});

/**
* 格式化参数成URLSearchParams
* @param {String|Array|Object|HTMLFormElement|FormData|URLSearchParams} param
* @return {URLSearchParams}
*/
instance.params = function (param) {
  if (param == null || param == "") {
    return new URLSearchParams();
  }
  if (param.constructor == Array) {
    let param1 = new URLSearchParams();
    for (let obj of param) {
      param1.append(obj.name, obj.value);
    }
    param = param1;
  } else if (param.constructor == Object) {
    let param1 = new URLSearchParams();
    for (let name in param) {
      param1.append(name, param[name]);
    }
    param = param1;
  } else {
    if (param.constructor == HTMLFormElement) {
      param = new FormData(param);
    }
    if (param.constructor == FormData || param.constructor == String) {
      param = new URLSearchParams(param);
    }
  }

  return param;
}

export default instance;