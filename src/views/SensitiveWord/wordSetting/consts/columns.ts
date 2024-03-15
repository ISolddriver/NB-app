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
    title: '敏感词',
    dataIndex: 'words'
  },
  {
    title: '生效范围',
    dataIndex: 'rangeType',
    customRender: ({ text }) => {
      return text === 0 ? '全部' : text === 1 ? '员工' : '客户';
    }
  },
  {
    title: '生效成员',
    dataIndex: 'rangeList'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '启用',
    dataIndex: 'status'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
];