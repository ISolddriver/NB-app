
export const systemRoutes = [
  {
    path: '/userManagement',
    name: '',
    title: '用户管理',
    component: () => import('@/views/System/userManagement/index.vue')
  }
]

// 用户管理，角色管理，企微信息设置，存档信息设置，系统更新