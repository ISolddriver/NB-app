<template>
  <div class="base-card mb8">
    <a-radio-group v-model:value="type">
      <a-radio-button value="1">单聊触发排名</a-radio-button>
      <a-radio-button value="2">群聊触发排名</a-radio-button>
    </a-radio-group>
  </div>
  <div class="base-card query">
    <a-range-picker v-model:value="dateTime" format="YYYY-MM-DD" :presets="rangePresets" />
    <a-button style="margin-left: 16px" type="primary" @click="handleSearch">查询</a-button>
  </div>
  <div class="tables">
    <div class="table-item mr8">
      <p class="title">成员触发排行</p>
      <a-table
        :columns="userColumns"
        :data-source="tableConfig.tableData"
        bordered
        :pagination="tableConfig.pagination"
        :loading="tableConfig.loading"
        @change="tableConfig.handleTableChange"
      >
      </a-table>
    </div>
    <div class="table-item">
      <p class="title">客户触发排行</p>
      <a-table
        :columns="customerColumns"
        :data-source="tableCustomerConfig.tableData"
        bordered
        :pagination="tableCustomerConfig.pagination"
        :loading="tableCustomerConfig.loading"
        @change="tableCustomerConfig.handleTableChange"
      >
      </a-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFetchList } from '@/hooks/table/useFetchList'
import dayjs, { Dayjs } from 'dayjs'
import { getSingleUserRank, getSingleCustomerRank } from '@/apis/statistics/sensitive'

type RangeValue = [Dayjs, Dayjs];
const dateTime = ref<RangeValue>();
const rangePresets = ref([
  { label: '今日', value: [dayjs(), dayjs()] },
  { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] }
]);
const userColumns = [
  { title: '排名', dataIndex: 'num' },
  { title: '用户名', dataIndex: 'userName' },
]
const customerColumns = [
  { title: '排名', dataIndex: 'num' },
  { title: '客户名', dataIndex: 'customerName' },
]
const type = ref('1')
const query = reactive({
  beginTime: '',
  endTime: '',
})
let tableConfig = reactive(useFetchList(getSingleUserRank, query))
let tableCustomerConfig = reactive(useFetchList(getSingleCustomerRank, query))
console.log(tableConfig, '111', tableCustomerConfig)
onMounted(() => {
  tableConfig.handleSeach()
  // tableCustomerConfig.handleSearch()
})
const handleSearch = () => {
  tableConfig.handleSearch()
  // tableCustomerConfig.handleSearch()
}


</script>

<style scoped lang="less">
.tables {
  display: flex;
  .table-item {
    flex: 1;
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      padding: 12px 0;
    }
  }
}
</style>