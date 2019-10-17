import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from './plugins/axios.js'

// 为Vue实例添加 $axios 属性对象
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
