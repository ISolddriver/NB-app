interface columnData {
  key?: string;
  title: string;
  dataIndex: string;
  className?: string;
}
export function getColumns (type: string) {
  const typeMap = {
    '1': [{
      title: '所属成员',
      dataIndex: 'userName',
    },
    {
      title: '客户信息',
      dataIndex: 'customerName',
    }],
    '2': [{
      title: '触发人信息',
      dataIndex: 'effectName',
    },
    {
      title: '群聊名称',
      dataIndex: 'chatName',
    }]
  }
  const matchArr = typeMap[type]
  return <columnData[]>[
    {
      title: '规则名称',
      dataIndex: 'stName',
    },
    {
      title: '触发类型',
      dataIndex: 'type',
      customRender: (text: any) => {
        return text === '1' ? '员工触发' : '客户触发'
      }
    },
    ...matchArr,
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