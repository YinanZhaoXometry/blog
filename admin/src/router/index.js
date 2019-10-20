// import Vue from 'vue'
// import Router from 'vue-router'
// import Index from '@/components/Index.vue'
// import Overview from '@/components/pages/Overview.vue'
// import List from '@/components/pages/List.vue'
// import Edit from '@/components/pages/Edit.vue'
// import Write from '@/components/pages/Write'
// import Categories from '@/components/pages/Categories.vue'
// import Google from '@/components/pages/Google.vue'
// import Settings from '@/components/pages/Settings.vue'
// import auth from '../utils/auth'

// const router = new Router({
//   mode: 'history',
//   base: '/admin/',
//   routes: [
//     {
//       path: '/login',
//       name: 'Login',
//       component: () => import('@/pages/Login.vue'),
//     },
//     {
//       path: '/',
//       name: 'Index',
//       component: Index,
//       redirect: '/overview',
//       meta: { requireAuth: true },
//       children: [
//         {
//           path: 'overview',
//           name: 'Overview',
//           component: Overview,
//           meta: { requireAuth: true }
//         },
//         {
//           path: 'list',
//           name: 'List',
//           component: List,
//           meta: { requireAuth: true }
//         },
//         {
//           path: 'edit/:id',
//           name: 'Edit',
//           component: Edit,
//           meta: { requireAuth: true }
//         },
//         {
//           path: 'write',
//           name: 'Write',
//           component: Write,
//           meta: { requireAuth: true }
//         },
//         {
//           path: 'categories',
//           name: 'Categories',
//           component: Categories,
//           meta: { requireAuth: true }
//         },
//         {
//           path: 'google',
//           name: 'Google',
//           component: Google,
//           meta: { requireAuth: true }
//         },
//         {
//           path: 'settings',
//           name: 'Settings',
//           component: Settings,
//           meta: { requireAuth: true }
//         }
//       ]
//     }
//   ]
// })

// router.beforeEach(
//   async (to, from, next) => {
//     if (to.matched.some(record => record.meta.requireAuth)) {
//       let isLoggedIn = await auth.checkLogin()
//       if (!isLoggedIn)
//         return next( '/login' )
//      return next()
//     }
//     next()
// })

// export default router


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../layout/index.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/project',
    component: Layout,
    children: [{
      path: '',
      name: 'project',
      component: () => import('@/views/project'),
      meta: { title: '项目管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/monitor',
    component: Layout,
    children: [{
      path: '',
      name: 'monitor',
      component: () => import('@/views/monitor/index'),
      meta: { title: '探测器管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/management/device',
    component: Layout,
    children: [{
      path: '',
      name: 'management_device',
      component: () => import('@/views/management/device'),
      meta: { title: '设备档案表', icon: 'dashboard' }
    }]
  },
  {
    path: '/management/sensor',
    component: Layout,
    children: [{
      path: '',
      name: 'management_sensor',
      component: () => import('@/views/management/sensor'),
      meta: { title: '探测器档案表', icon: 'dashboard' }
    }]
  },
  {
    path: '/management/project',
    component: Layout,
    children: [{
      path: '',
      name: 'management_project',
      component: () => import('@/views/management/project'),
      meta: { title: '项目管理表', icon: 'dashboard' }
    }]
  },
  {
    path: '/management/project/edit',
    component: Layout,
    children: [{
      path: '',
      name: 'management_projectEdit',
      component: () => import('@/views/management/project_edit'),
      // meta: { title: '新增项目', icon: 'dashboard' }
    }]
  },
  {
    path: '/management/project/detail',
    component: Layout,
    children: [{
      path: '',
      name: 'management_projectDetail',
      component: () => import('@/views/management/project_detail'),
      // meta: { title: '项目详情', icon: 'dashboard' }
    }]
  },
  {
    path: '/management/user',
    component: Layout,
    children: [{
      path: '',
      name: 'management_user',
      component: () => import('@/views/management/user'),
      meta: { title: '用户管理表', icon: 'dashboard' }
    }]
  },
  {
    path: '/management/user/detail',
    component: Layout,
    children: [{
      path: '',
      name: 'management_userDetail',
      component: () => import('@/views/management/user_detail'),
      // meta: { title: '用户详情', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true } // 404 page must be placed at the end !!!
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
