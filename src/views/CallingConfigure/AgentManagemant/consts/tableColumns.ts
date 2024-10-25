interface columnData {
  title: string
  dataIndex: string
  className?: string
}

export const columns: Array<columnData> = [
  {
    title: '用户名称',
    dataIndex: 'userName'
  },
  {
    title: '坐席号码',
    dataIndex: 'agentNumber'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
]
