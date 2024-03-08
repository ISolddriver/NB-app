export const sensitiveWordRoutes = [
  {
    path: '/sensitiveWordRecrd',
    name: 'sensitiveWordRecrd',
    meta: {
      title: '敏感词记录'
    },
    component: () => import('@/views/SensitiveWord/wordRecord/index.vue')
  },
  {
    path: '/sensitiveWordSetting',
    name: 'sensitiveWordSetting',
    meta: {
      title: '敏感词设置'
    },
    component: () => import('@/views/SensitiveWord/wordSetting/index.vue')
  },
  {
    path: '/sensitiveWordRank',
    name: 'sensitiveWordRank',
    meta: {
      title: '敏感词排行'
    },
    component: () => import('@/views/SensitiveWord/wordRank/index.vue')
  },
  {
    path: '/sensitiveWordStatistics',
    name: 'sensitiveWordStatistics',
    meta: {
      title: '敏感词统计'
    },
    component: () => import('@/views/SensitiveWord/wordStatistics/index.vue')
  }
]