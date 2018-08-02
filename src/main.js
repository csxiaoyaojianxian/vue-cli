/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import './registerServiceWorker'

// import 'font-awesome/css/font-awesome.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

/**
 * axios
 */
// npm i axios -S
// options: headers、baseURL、params
// 默认全局设置
axios.defaults.baseURL = 'http://bbs.cfhd.cf.qq.com/'
axios.defaults.timeout = 5000
// 允许axios携带cookie
axios.defaults.withCredentials = true
// 默认设置
// axios.defaults.headers = {
//   accept: 'defaults'
// }
// 给Vue原型挂载属性
Vue.prototype.$axios = axios
// 在组件中 this.$axios(opt).then(fn)
// 拦截器，在请求之前
axios.interceptors.request.use( config => {
  // config.data = qs.stringify(config.data)
  // 注意：同时设置了axios.defaults.headers和拦截器config.headers，以拦截器为准
  // config.headers = { 
  //   'Content-Type':'application/x-www-form-urlencoded'
  // }

  console.log('request start')
  milo.ready(function () {
    need("biz.login", function (LoginManager) {
      LoginManager.checkLogin(function (userInfo) {
        // console.log(userInfo)  
      },function(){
        console.log("未登录");
        window.location.href = 'login.html'
      });
    });
  });
  // window.location.href = 'login.html'
  return config
})
axios.interceptors.response.use(function (config) {
  console.log('get response')
  console.log(config)
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
