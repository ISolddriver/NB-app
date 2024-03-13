<template>
  <div class="base-card mb8">
    <a-radio-group v-model:value="type">
      <a-radio-button value="1">员工列表</a-radio-button>
      <a-radio-button value="2">用户列表</a-radio-button>
      <a-radio-button value="3">群列表</a-radio-button>
    </a-radio-group>
  </div>
  <div class="base-card query">
    <a-input :placeholder="placeholderMap[type]" v-model:value="value" style="width: 200px;" />
    <a-button style="margin-left: 16px" type="primary" @click="tableConfig.handleSeach">查询</a-button>
  </div>
  <div class="base-card table">
    <a-table
      :columns="columns"
      :data-source="tableConfig.tableData"
      bordered
      :pagination="tableConfig.pagination"
      :loading="tableConfig.loading"
      @change="tableConfig.handleTableChange"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.dataIndex === 'operate'">
          <a-button type="link">查看会话内容</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { useFetchList } from '@/hooks/table/useFetchList'
import {
  getUserList,
  getRoomList,
  getCustomerList
} from '@/apis/session/archive.ts'
interface columnData {
  key?: string;
  title: string;
  dataIndex: string;
  className?: string;
}
const columns = reactive<columnData[]>([
  {
    key: 'name',
    title: '姓名', // 用户名称 群名称 roomName customerName
    dataIndex: 'name',
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
])
const funMap = {
  '1': getUserList,
  '2': getRoomList,
  '3': getCustomerList
}
const placeholderMap = {
  '1': '请输入员工姓名',
  '2': '请输入群名称',
  '3': '请输入客户名称'
}
const itemMap = {
  '1': {
    key: 'name',
    title: '姓名', // 用户名称 群名称 roomName customerName
    dataIndex: 'name',
  },
  '2': {
    key: 'name',
    title: '群名称',
    dataIndex: 'roomName',
  },
  '3': {
    key: 'name',
    title: '客户名称',
    dataIndex: 'customerName',
  }
}

const queryKeyMap = {
  '1': 'name',
  '2': 'roomName',
  '3': 'customerName'
}

interface queryData {
  name?: string,
  roomName?: string,
  customerName?: string
}
let query = reactive<queryData>({
  name: ''
})

const type = ref<string>('1');
const value = ref<string>('')

let tableConfig = reactive(useFetchList(getUserList, query))
onMounted(() => {
  tableConfig.handleSeach()
})


watch(type, (newVal) => {
  columns.splice(0, 1, itemMap[newVal])
  value.value = ''
  query = {
    [queryKeyMap[newVal]]: ''
  }
  tableConfig = reactive(useFetchList(getUserList, query))
  tableConfig.handleSeach()
})

watch(value, (newVal) => {
  query[queryKeyMap[type.value]] = newVal
  tableConfig = reactive(useFetchList(getUserList, query))
})

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