import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import Overview from '@/components/pages/Overview.vue'
import List from '@/components/pages/List.vue'
import Edit from '@/components/pages/Edit.vue'
import Write from '@/components/pages/Write'
import Categories from '@/components/pages/Categories.vue'
import Google from '@/components/pages/Google.vue'
import Settings from '@/components/pages/Settings.vue'
import auth from '../utils/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/overview',
      meta: { requireAuth: true },
      children: [
        {
          path: 'overview',
          name: 'Overview',
          component: Overview,
          meta: { requireAuth: true }
        },
        {
          path: 'list',
          name: 'List',
          component: List,
          meta: { requireAuth: true }
        },
        {
          path: 'edit/:id',
          name: 'Edit',
          component: Edit,
          meta: { requireAuth: true }
        },
        {
          path: 'write',
          name: 'Write',
          component: Write,
          meta: { requireAuth: true }
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories,
          meta: { requireAuth: true }
        },
        {
          path: 'google',
          name: 'Google',
          component: Google,
          meta: { requireAuth: true }
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
          meta: { requireAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach(
  async (to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
      let isLoggedIn = await auth.checkLogin()
      if (!isLoggedIn)
        return next( '/login' )
     return next()
    }
    next()
})

export default router
