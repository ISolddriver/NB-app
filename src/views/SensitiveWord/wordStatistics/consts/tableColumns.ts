interface columnData {
  key?: string;
  title: string;
  dataIndex: string;
  className?: string;
}
export const columns = reactive<columnData[]>([
  {
    title: '规则名称',
    dataIndex: 'ruleName',
  },
  {
    title: '生效范围',
    dataIndex: 'rangeType'
  },
  {
    title: '触发次数',
    dataIndex: 'num'
  },
  {
    title: '员工触发数',
    dataIndex: 'userNum'
  },
  {
    title: '客户触发数',
    dataIndex: 'customerNum'
  }
])