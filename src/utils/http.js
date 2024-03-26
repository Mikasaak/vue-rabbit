import axios from 'axios';
import {useUserStore} from "@/stores/User.js";
import 'element-plus/theme-chalk/el-message.css'
import {ElMessage} from "element-plus";
import router from "@/router";
//这是原位置
//const userStore = useUserStore()


const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const userStore = useUserStore()//这是新位置
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  const userStore = useUserStore()

  // 超出 2xx 范围的状态码都会触发该函数。
  ElMessage.error(error.response.data.message);
  if (error.response.status === 401) {
    userStore.clearUserInfo()
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;
