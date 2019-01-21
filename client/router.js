import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home/Index.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ''
  },

]


export function createRouter () {
  return new Router({
    mode: 'history',
    routes
  })
}
