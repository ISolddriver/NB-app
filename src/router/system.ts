
export const systemRoutes = [
  {
    path: '/userManagement',
    name: '',
    title: '用户管理',
    component: () => import('@/views/System/userManagement/index.vue')
  },
  {
    path: '/roleManagement',
    name: '',
    title: '角色管理',
    component: () => import('@/views/System/roleManagement/index.vue')
  },
  {
    path: '/qwChatSetting',
    name: '',
    title: '企微信息设置',
    component: () => import('@/views/System/qwChatSetting/index.vue')
  },
  {
    path: '/archiveSettings',
    name: '',
    title: '存档信息设置',
    component: () => import('@/views/System/archiveInformationSettings/index.vue')
  }
]

// 用户管理，角色管理，企微信息设置，存档信息设置，系统更新