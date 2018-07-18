/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// npm i axios -S
// options: headers、baseURL、params
// 默认全局设置
axios.defaults.baseURL = 'http://bbs.cfhd.cf.qq.com/index.php'
// 默认设置
axios.defaults.headers = {
  accept: 'defaults'
}
// 给Vue原型挂载属性
Vue.prototype.$axios = axios
// 在组件中 this.$axios(opt).then(fn)

Vue.config.productionTip = false

// 拦截器，在请求之前
axios.interceptors.request.use(function (config) {
  // 注意：同时设置了axios.defaults.headers和拦截器config.headers，以拦截器为准
  // config.headers = { xxx }
  console.log('request start')
  console.log(config)
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
