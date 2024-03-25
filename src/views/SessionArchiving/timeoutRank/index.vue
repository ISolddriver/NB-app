<template>
  <div class="base-card mb8">
    <a-radio-group v-model:value="type">
      <a-radio-button value="1">单聊超时排名</a-radio-button>
      <a-radio-button value="2">群聊超时排名</a-radio-button>
    </a-radio-group>
  </div>
  <div class="base-card query mb8">
    <a-range-picker v-model:value="dateTime" format="YYYY-MM-DD" :presets="rangePresets" @change="handleDateChange"/>
    <a-button style="margin-left: 16px" type="primary" @click="handleSearchList">查询</a-button>
  </div>
  <a-table
    ref="userTable"
    :columns="type === '1' ? userColumns : chatColumns"
    :data-source="userTableConfig.tableData"
    bordered
    :pagination="userTableConfig.pagination"
    :loading="userTableConfig.loading"
    @change="userTableConfig.handleTableChange"
  >
  </a-table>
</template>
<script setup lang="ts">
import { useFetchList } from '@/hooks/table/useFetchList'
import { getTimeoutSingleRank, getTimeoutGroupRank } from '@/apis/statistics/sensitive'
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
  { title: '成员信息', dataIndex: 'userName' },
  { title: '超时次数', dataIndex: 'num' }
]
const chatColumns = [
  { title: '排名', dataIndex: 'num' },
  { title: '群信息', dataIndex: 'chatName' },
  { title: '超时次数', dataIndex: 'num' }
]
const type = ref('1')
const urlMap = {
  '1': getTimeoutSingleRank,
  '2': getTimeoutGroupRank
}
let userUrl = reactive(urlMap[type.value])
const query = reactive({
  beginTime: '',
  endTime: '',
})

let userTableConfig = reactive(useFetchList(userUrl, query))

const handleSearchList = () => {
  userTableConfig.handleSeach()
}

onMounted(() => {
  handleSearchList()
})

watch(type, (value) => {
  query.beginTime = ''
  query.endTime = ''
  dateTime = ref<RangeValue>();
  userUrl = urlMap[value]
  userTableConfig = reactive(useFetchList(userUrl, query))
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