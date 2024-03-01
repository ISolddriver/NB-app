import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
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
          component: () => import('@/views/OverView/index.vue')
        },
        {
          path: '/conversation',
          name: 'conversation',
          component: () => import('@/views/ConversationContent/index.vue')
        }
      ]
    }
  ]
})

export default router
