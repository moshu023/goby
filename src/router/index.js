import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Scan from '../components/Scan.vue'
import Report from '../components/Report.vue'
import Loading from '@/components/Loading'
import Assets from '@/components/Assets'
import Assets1 from "@/components/Assets1";
import Assets3 from "@/components/Assets3";
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/scan',
        component: Scan
      },
      {
        path: '/report',
        component: Report
      },
      {
        path: '/assets',
        component: Assets
      },
      {
        path: '/loading',
        component: Loading
      },
      {
        path: '/assets1',
        component: Assets1
      },
      {
        path: '/assets3',
        component: Assets3
      }
    ]
  },
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/scan',
    component: Assets, Assets1, Report, Assets3
  },
  {
    path: '/report',
    component: Scan, Assets3,Assets1,Assets
  },
  {
    path: '/assets3',
    component: Scan, Report
  },
  {
    path: '/assets',
    component: Scan, Report
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // next()为放行函数，两种形式
//   // 1. next()    2. next('/login') 强制跳转
//   // 路由导航步骤一：检查当前要去（to）的页面是否是登录页，如果是则放行，不是则进入下一步；
//   if (to.path === '/home') {
//     return next()
//   }
//   // 路由导航步骤二：获取token并检查是否有效
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     return next('/home')
//   } else {
//     next()
//   }
// })

export default router
