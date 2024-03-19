interface columnData {
  title: string;
  dataIndex: string;
  className?: string;
  customRender?: any;
}

export const columns:Array<columnData> = [
  {
    title: '规则名称',
    dataIndex: 'name'
  },
  {
    title: '会话类型',
    dataIndex: 'chatType',
    customRender: ({ text }) => {
      return text === 1 ? '全部会话' : text === 2 ? '客户会话' : '群聊会话';
    }
  },
  {
    title: '超时范围',
    dataIndex: 'userList'
  },
  {
    title: '超时时间',
    dataIndex: 'timeOut'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
];