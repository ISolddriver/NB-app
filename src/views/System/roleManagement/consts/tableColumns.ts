interface columnData {
  title: string;
  dataIndex: string;
  className?: string;
}

export const columns:Array<columnData> = [
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '角色Code',
    dataIndex: 'roleKey'
  },
  {
    title: '权限描述',
    dataIndex: 'remark'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
];