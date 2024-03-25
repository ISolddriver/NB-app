<template>
  <div class="base-card query">
    <a-range-picker
      v-model:value="dateTime"
      format="YYYY-MM-DD"
      class="mr8 mb8"
      @change="handleDateChange"
    />
    <a-select
      v-model:value="query.chatType"
      placeholder="聊天类型"
      class="mr8"
      style="width: 160px;"
    >
      <a-select-option :value="1">全部</a-select-option>
      <a-select-option :value="2">单聊超时</a-select-option>
      <a-select-option :value="3">群聊超时</a-select-option>
    </a-select>
    <a-input placeholder="超时规则" v-model:value="query.name" style="width: 160px;" class="mr8" />
    <a-input placeholder="员工姓名" v-model:value="query.userName" style="width: 160px;" class="mr8" />
    <a-button type="primary" @click="tableConfig.handleSeach">查询</a-button>
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
  getTimeoutList
} from '@/apis/statistics/sensitive'
import { columns } from './consts/tableColumns'
interface queryData {
  userName: string,
  ruleName?: string,
  customerName?: string,
  chatType: number | string,
  name: string,
  beginTime?: string,
  endTime?: string,
}
let query = reactive<queryData>({
  userName: '',
  ruleName: '',
  chatType: 1,
  name: '',
  beginTime: '',
  endTime: ''
})
let dateTime = ref([])
let tableConfig = reactive(useFetchList(getTimeoutList, query))
onMounted(() => {
  tableConfig.handleSeach()
})
const handleDateChange = (dates: any[], dateStrings: string[]) => {
  if (dateStrings) {
    query.beginTime = dateStrings[0]
    query.endTime = dateStrings[1]
  } else {
    query.beginTime = ''
    query.endTime = ''
  }
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
</style>