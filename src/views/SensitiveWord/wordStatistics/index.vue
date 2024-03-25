<template>
  <div class="base-card query">
    <a-range-picker
      v-model:value="dateTime"
      format="YYYY-MM-DD"
      class="mr8 mb8"
      @change="handleDateChange"
    />
    <a-select
      v-model:value="query.type"
      placeholder="消息类型"
      class="mr8"
    >
      <a-select-option value="">全部消息</a-select-option>
      <a-select-option :value="1">员工消息</a-select-option>
      <a-select-option :value="2">客户消息</a-select-option>
    </a-select>
    <a-select
      v-model:value="query.chatType"
      placeholder="聊天类型"
      class="mr8"
    >
      <a-select-option :value="1">单聊消息</a-select-option>
      <a-select-option :value="2">群聊消息</a-select-option>
    </a-select>
    <a-input placeholder="员工姓名" v-model:value="query.userName" style="width: 160px;" class="mr8" />
    <a-input placeholder="客户姓名" v-model:value="query.customerName" style="width: 160px;" />
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
  getSensitiveList
} from '@/apis/statistics/sensitive'
import { columns } from './consts/tableColumns'
interface queryData {
  userName: string,
  ruleName?: string,
  customerName: string,
  type: number | string,
  chatType: number | string,
  beginTime?: string,
  endTime?: string,
}
let query = reactive<queryData>({
  userName: '',
  ruleName: '',
  customerName: '',
  chatType: 1,
  type: '',
  beginTime: '',
  endTime: '',
})
let dateTime = ref([])
let tableConfig = reactive(useFetchList(getSensitiveList, query))
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