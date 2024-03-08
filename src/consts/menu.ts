import {
  CommentOutlined,
  AppstoreOutlined,
  FieldTimeOutlined,
  BarChartOutlined,
  InboxOutlined,
  HomeOutlined
} from '@ant-design/icons-vue';

export const menus:any[] = [
  {
    key: '1',
    icon: () => h(HomeOutlined),
    label: '首页',
    path: '/'
  },
  {
    key: 'sub1',
    icon: () => h(InboxOutlined),
    label: '会话存档',
    children: [
      {
        key: '2',
        label: '会话内容',
        path: '/conversation'
      },
      {
        key: '3',
        label: '存档记录',
        path: '/archivedRecord'
      },
      {
        key: '4',
        label: '存档范围',
        path: '/archivedScopeSetting'
      }
    ],
  },
  {
    key: 'sub2',
    icon: () => h(CommentOutlined),
    label: '聊天敏感词',
    children: [
      {
        key: '5',
        label: '敏感词记录',
        path: '/sensitiveWordRecrd'
      },
      {
        key: '6',
        label: '敏感词设置',
        path: '/sensitiveWordSetting'
      }
    ]
  },
  {
    key: 'sub3',
    icon: () => h(FieldTimeOutlined),
    label: '聊天超时',
    children: [
      {
        key: '7',
        label: '超时记录',
        path: '/timeoutRecord'
      },
      {
        key: '8',
        label: '超时设置',
        path: '/timeoutSetting'
      }
    ]
  },
  {
    key: 'sub4',
    icon: () => h(BarChartOutlined),
    label: '数据分析',
    children: [
      {
        key: '9',
        label: '敏感词排行',
        path: '/sensitiveWordRank'
      },
      {
        key: '10',
        label: '敏感词统计',
        path: '/sensitiveWordStatistics'
      },
      {
        key: '11',
        label: '超时排行',
        path: '/timeoutRank'
      },
      {
        key: '12',
        label: '超时统计',
        path: '/timeoutStatistics'
      }
    ]
  },
  {
    key: 'sub5',
    icon: () => h(AppstoreOutlined),
    label: '系统设置',
    children: [
      {
        key: '13',
        label: '用户管理',
        path: '/userManagement'
      },
      {
        key: '14',
        label: '角色管理',
        path: '/roleManagement'
      },
      {
        key: '15',
        label: '企微消息设置',
        path: '/qwChatSetting'
      },
      {
        key: '16',
        label: '存档信息设置',
        path: '/archiveSettings'
      }
    ]
  }
]
