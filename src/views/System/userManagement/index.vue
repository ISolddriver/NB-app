
import type { handleLogin } from '@/apis/login';
<template>
  <div class="base-card query">
    <a-input style="width: 240px" v-model:value="query.username" placeholder="请输入用户名或账号" />
    <a-button style="margin-left: 16px" type="primary">查询</a-button>
    <a-button style="margin-left: 16px" >新增</a-button>
  </div>
  <div class="base-card table">
    <a-table :columns="columns" :data-source="data" bordered :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'isOpen'">
          <a-switch v-model:checked="record.isOpen"  @change="handleIsOpenChange" />
        </template>
        <template v-if="column.dataIndex === 'operate'">
          <a-button type="link"><FormOutlined />编辑</a-button>
          <a-button type="link"><DeleteOutlined />删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { SelectProps } from 'ant-design-vue'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue';
interface columnData {
  title: string;
  dataIndex: string;
  className?: string;
}
const pagination:object = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
  showPageSize: true
})

const columns:Array<columnData> = [
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '账号',
    dataIndex: 'acount'
  },
  {
    title: '角色',
    dataIndex: 'roleName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '启用',
    dataIndex: 'isOpen'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
];
const data = [
  {
    key: '1',
    userName: 'John Brown',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '2',
    userName: 'Jim Green',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '1',
    userName: 'John Brown',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '2',
    userName: 'Jim Green',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '1',
    userName: 'John Brown',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '2',
    userName: 'Jim Green',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '1',
    userName: 'John Brown',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '1',
    userName: 'John Brown',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '2',
    userName: 'Jim Green',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '1',
    userName: 'John Brown',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
];
const query = reactive({
  username: ''
})

const options = ref<SelectProps['options']>([
  {
    value: '',
    label: '全部',
  },
  {
    value: '1',
    label: 'Jack',
  },
  {
    value: '2',
    label: 'Tom',
  }
])

const handleIsOpenChange = (value: any) => {
  console.log(`selected ${value}`);
}
</script>
<style scoped lang="less">
.query {
  margin-bottom: 8px;
}
.table {
  padding: 16px;
  border-radius: 6px;
  background: #fff;
}
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>