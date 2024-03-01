<template>
  <div class="base-card query">
    <a-select
      ref="select"
      :value="query.value"
      style="width: 120px"
      @change="handleChange"
      placeholder="请选择"
    >
      <a-select-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</a-select-option>
    </a-select>
    <a-button style="margin-left: 16px" type="primary">查询</a-button>
  </div>
  <div class="table">
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
  className: string;
}
const columns:Array<columnData> = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: ''
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    className: '',
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
  value: ''
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