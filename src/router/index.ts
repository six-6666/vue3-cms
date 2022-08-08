import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { firstValue } from '@/utils/map-menus'
import LocalCache from '@/utils/cache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})
// 前置路由守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstValue.url
  }
})

export default router
