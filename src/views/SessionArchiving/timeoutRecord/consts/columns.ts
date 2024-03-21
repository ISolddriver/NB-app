interface columnData {
  key?: string;
  title: string;
  dataIndex: string;
  className?: string;
}
export function getColumns (type: string) {
  const typeMap = {
    '1': [
      {
        title: '客户信息',
        dataIndex: 'customerName',
      },
      {
        title: '超长时间',
        dataIndex: 'timeOut',
      }
    ],
    '2': [
      {
        title: '群聊名称',
        dataIndex: 'chatName',
      },
      {
        title: '群主名称',
        dataIndex: 'userName',
      },
      {
        title: '客户信息',
        dataIndex: 'customerName',
      },
      {
        title: '超长时间',
        dataIndex: 'timeOut',
      }
    ]
  }
  const matchArr = typeMap[type]
  return <columnData[]>[
    ...matchArr,
    {
      title: '规则名称',
      dataIndex: 'ruleName'
    },
    {
      title: '触发时间',
      dataIndex: 'sendTime',
    },
    {
      title: '操作',
      dataIndex: 'operate'
    }
  ]
}