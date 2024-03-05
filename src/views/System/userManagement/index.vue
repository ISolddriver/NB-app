<template>
  <div class="base-card query">
    <a-input style="width: 240px" v-model:value="query.username" placeholder="请输入用户名或账号" />
    <a-button style="margin-left: 16px" type="primary">查询</a-button>
    <a-button style="margin-left: 16px" >新增</a-button>
  </div>
  <div class="base-card table">
    <a-table :columns="columns" :data-source="data" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { SelectProps } from 'ant-design-vue'
interface columnData {
  title: string;
  dataIndex: string;
  className?: string;
}
const columns:Array<columnData> = [
  {
    title: '用户名',
    dataIndex: 'name'
  },
  {
    title: '账号',
    dataIndex: 'money'
  },
  {
    title: '角色',
    dataIndex: 'address'
  },
  {
    title: '创建时间',
    dataIndex: 'address'
  },
  {
    title: '启用',
    dataIndex: 'address'
  },
  {
    title: '操作',
    dataIndex: 'address'
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
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

const handleChange = (value: string) => {
  query.value = value
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