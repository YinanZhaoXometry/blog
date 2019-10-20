import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from './plugins/axios.js'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons' // icon
import '@/permission' // permission contro
import message from "./utils/message.js";


import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})
Vue.use(ElementUI)
Vue.prototype.$msg = message

// 为Vue实例添加 $axios 属性对象
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
