interface columnData {
  key?: string;
  title: string;
  dataIndex: string;
  className?: string;
  customRender?: Function;
}
export const columns = reactive<columnData[]>([
  {
    title: '规则名称',
    dataIndex: 'ruleName',
  },
  {
    title: '会话类型',
    dataIndex: 'chatType',
    customRender: ({ text }) => {
      return text === 2 ? '单聊超时' : '群聊超时'
    }
  },
  {
    title: '超时次数',
    dataIndex: 'num'
  }
])