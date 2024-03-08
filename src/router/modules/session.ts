export const sessionRoutes = [
  {
    path: '/conversation',
    name: 'conversation',
    meta: {
      title: '会话内容'
    },
    component: () => import('@/views/SessionArchiving/conversationContent/index.vue')
  },
  {
    path: '/archivedRecord',
    name: 'archivedRecord',
    meta: {
      title: '存档记录'
    },
    component: () => import('@/views/SessionArchiving/archivedRecord/index.vue')
  },
  {
    path: '/archivedScopeSetting',
    name: 'archivedScopeSetting',
    meta: {
      title: '存档范围设置'
    },
    component: () => import('@/views/SessionArchiving/archivedScopeSetting/index.vue')
  },
  {
    path: '/timeoutRecord',
    name: 'timeoutRecord',
    meta: {
      title: '聊天超时记录'
    },
    component: () => import('@/views/SessionArchiving/timeoutRecord/index.vue')
  },
  {
    path: '/timeoutSetting',
    name: 'timeoutSetting',
    meta: {
      title: '超时设置'
    },
    component: () => import('@/views/SessionArchiving/timeoutSetting/index.vue')
  },
  {
    path: '/timeoutRank',
    name: 'timeoutRank',
    meta: {
      title: '聊天超时记录'
    },
    component: () => import('@/views/SessionArchiving/timeoutRank/index.vue')
  },
  {
    path: '/timeoutStatistics',
    name: 'timeoutStatistics',
    meta: {
      title: '超时设置'
    },
    component: () => import('@/views/SessionArchiving/timeoutStatistics/index.vue')
  }
]
