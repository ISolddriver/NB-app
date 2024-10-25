export const callingConfigureRoutes = [
  {
    path: '/agentManagemant',
    name: '',
    meta: {
      title: '坐席管理'
    },
    component: () => import('@/views/CallingConfigure/AgentManagemant/index.vue')
  },
  {
    path: '/phoneNumberRoute',
    name: '',
    meta: {
      title: '号码路由管理'
    },
    component: () => import('@/views/CallingConfigure/PhoneNumberRoute/index.vue')
  },
  {
    path: '/sipPhoneNumber',
    name: '',
    meta: {
      title: 'SIP号码管理'
    },
    component: () => import('@/views/CallingConfigure/SIPPhoneNumber/index.vue')
  }
]
