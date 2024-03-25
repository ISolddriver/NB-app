<template>
  <div class="base-card mb8">
    <a-radio-group v-model:value="type">
      <a-radio-button value="1">单聊触发排名</a-radio-button>
      <a-radio-button value="2">群聊触发排名</a-radio-button>
    </a-radio-group>
  </div>
  <div class="base-card query">
    <a-range-picker v-model:value="dateTime" format="YYYY-MM-DD" :presets="rangePresets" @change="handleDateChange"/>
    <a-button style="margin-left: 16px" type="primary" @click="handleSearchList">查询</a-button>
  </div>
  <div class="tables">
    <div class="table-item mr8">
      <p class="title">成员触发排行</p>
      <a-table
        ref="userTable"
        :columns="userColumns"
        :data-source="userTableConfig.tableData"
        bordered
        :pagination="userTableConfig.pagination"
        :loading="userTableConfig.loading"
        @change="userTableConfig.handleTableChange"
      >
      </a-table>
    </div>
    <div class="table-item">
      <p class="title">客户触发排行</p>
      <a-table
        ref="customerTable"
        :columns="customerColumns"
        :data-source="customerTableConfig.tableData"
        bordered
        :pagination="customerTableConfig.pagination"
        :loading="customerTableConfig.loading"
        @change="customerTableConfig.handleTableChange"
      >
      </a-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFetchList } from '@/hooks/table/useFetchList'
import { getSingleUserRank, getSingleCustomerRank, getGroupUserRank, getGroupCustomerRank } from '@/apis/statistics/sensitive'
import dayjs, { Dayjs } from 'dayjs'

type RangeValue = [Dayjs, Dayjs];
let dateTime = ref<RangeValue>();
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
const urlMap = {
  '1': {
    'user': getSingleUserRank,
    'customer': getSingleCustomerRank
  },
  '2': {
    'user': getGroupUserRank,
    'customer': getGroupCustomerRank
  }
}
let userUrl = reactive(urlMap[type.value].user)
let customerUrl = reactive(urlMap[type.value].customer)
const query = reactive({
  beginTime: '',
  endTime: '',
})

let userTableConfig = reactive(useFetchList(userUrl, query))
let customerTableConfig = reactive(useFetchList(customerUrl, query))

const handleSearchList = () => {
  customerTableConfig.handleSeach()
  userTableConfig.handleSeach()
}

onMounted(() => {
  handleSearchList()
})

watch(type, (value) => {
  query.beginTime = ''
  query.endTime = ''
  dateTime = ref<RangeValue>();
  userUrl = urlMap[value].user
  customerUrl = urlMap[value].customer
  userTableConfig = reactive(useFetchList(userUrl, query))
  customerTableConfig = reactive(useFetchList(customerUrl, query))
  handleSearchList()
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