import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { systemRoutes } from './modules/system'
import { sessionRoutes } from './modules/session'
import { sensitiveWordRoutes } from './modules/sensitiveWord'
import { callingConfigureRoutes } from './modules/callingConfigure'
import { fsConfigureRoutes } from './modules/fsConfigure'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'overview',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/OverView/index.vue')
        },
        ...systemRoutes,
        ...sessionRoutes,
        ...sensitiveWordRoutes,
        ...callingConfigureRoutes,
        ...fsConfigureRoutes
      ]
    }
  ]
})

export default router
