import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true }, // 登录
  { path: '/404', component: () => import('@/views/404'), hidden: true }, // 404
  // 主页
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    hidden: false, // 是否在导航栏显示,默认为false
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统主页', icon: 'dashboard', noCache: true }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: 'classchart',
    name: 'Example',
    meta: { title: '项目管理', icon: 'example' },
    children: [
      {
        path: 'brand',
        name: 'Brand',
        component: () => import('@/views/product/brand/index'),
        meta: {
          title: '工单管理',
          icon: 'tree'
        }
      }, {
        path: 'classchart',
        name: 'Classchart',
        component: () => import('@/views/product/classchart/index'),
        meta: { title: '素材管理', icon: 'tree' }
      }, {
        path: 'classification',
        name: 'Classification',
        component: () => import('@/views/product/classification/index'),
        meta: { title: '分类管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/picture',
    component: Layout,
    redirect: 'advertisement',
    name: 'Picture',
    meta: { title: '大区管理', icon: 'excel' },
    children: [
      {
        path: 'advertisement',
        name: 'Advertisement',
        component: () => import('@/views/picture/advertisement/index'),
        meta: { title: '广告管理', icon: 'tree' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/picture/category/index'),
        meta: { title: '分类管理', icon: 'tree' }
      }
    ]
  },
  // 企业管理
  {
    path: '/enterprise',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'userManagement',
        component: () => import('@/views/userManagement/index'),
        meta: { title: '账户管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '关于', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

