interface columnData {
  title: string;
  dataIndex: string;
  className?: string;
}

export const columns:Array<columnData> = [
  {
    title: '姓名',
    dataIndex: 'corpUserName'
  },
  // {
  //   title: '账号',
  //   dataIndex: 'userName'
  // },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
];