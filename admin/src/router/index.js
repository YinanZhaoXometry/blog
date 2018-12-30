import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login.vue'
import Main from '@/components/main/Index.vue'
import List from '@/components/main/List.vue'
import Post from '@/components/main/Post.vue'
import Categories from '@/components/main/Categories.vue'
import Tags from '@/components/main/Tags.vue'
import Google from '@/components/main/Google.vue'
import Settings from '@/components/main/Settings.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'List',
          component: List
        },
        {
          path: 'post',
          name: 'Post',
          component: Post
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories
        },
        {
          path: 'tags',
          name: 'Tags',
          component: Tags
        },
        {
          path: 'google',
          name: 'Google',
          component: Google
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings
        }
      ]
    }
  ]
})
