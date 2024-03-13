<template>
  <div class="base-card mb8">
    <a-radio-group v-model:value="type">
      <a-radio-button value="1">单聊敏感词记录</a-radio-button>
      <a-radio-button value="2">群聊敏感词记录</a-radio-button>
    </a-radio-group>
  </div>
  <div class="base-card query">
    <a-range-picker @change="handleDateTime" v-model:value="dateTime" show-time class="mr8 mb8" />
    <a-select
      ref="select"
      v-model:value="query.type"
      style="width: 200px"
      class="mr8"
    >
      <a-select-option value="">全部触发类型</a-select-option>
      <a-select-option :value="1">员工触发</a-select-option>
      <a-select-option :value="2">客户触发</a-select-option>
    </a-select>
    <a-input placeholder="请输入规则名称" v-model:value="query.name" style="width: 200px;" class="mr8" />
    <a-input :placeholder="`请输入${type === '1' ? '所属成员' : '触发人信息'}`" v-model:value="query.userName" style="width: 200px;" class="mr8" />
    <a-input v-if="type === '1'" placeholder="`请输入客户信息`" v-model:value="query.customerName" style="width: 200px;" class="mr8" />
    <a-input v-else placeholder="`请输入群聊名称`" v-model:value="query.chatName" style="width: 200px;" class="mr8" />
    <a-button class="mr8" type="primary" @click="tableConfig.handleSeach">查询</a-button>
    <a-button @click="resetQuery">重置</a-button>
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
          <a-button type="link">查看聊天内容</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { useFetchList } from '@/hooks/table/useFetchList'
import {
  getSingleList,
  getGroupList
} from '@/apis/sensitiveword/record'
import { getColumns } from './consts/columns'

interface queryData {
  type?: string | number,
  customerName?: string,
  beginTime?: string,
  endTime?: string,
  name?: string,
  words?: string, // 敏感词
  userName?: string,
  chatName?: string
}
let query = reactive<queryData>({
  type: '',
  beginTime: '',
  endTime: '',
  words: '',
  name: '', // 敏感词名称
  userName: '',

  chatName: '',
  customerName: ''
})
let dateTime = ref<any[]>([])
let columns =  reactive(getColumns('1'))
const type = ref<string>('1');
const funMap = {
  '1': getSingleList,
  '2': getGroupList
}
let tableConfig = reactive(useFetchList(getSingleList, query))
const resetQuery = () => {
  query = reactive<queryData>({
    type: '',
    beginTime: '',
    endTime: '',
    words: '',
    name: '', // 敏感词名称
    userName: '',

    chatName: '',
    customerName: ''
  })
  dateTime.value = []
}
const handleDateTime = (val: any) => {
  if (val && val.length > 0) {
    query.beginTime = val[0]
    query.endTime = val[1]
    return
  }
  query.beginTime = ''
  query.endTime = ''
}
onMounted(() => {
  tableConfig.handleSeach()
})

watch(type, (newVal) => {
  resetQuery()
  columns = getColumns(newVal)
  tableConfig = reactive(useFetchList(funMap[newVal], query))
  tableConfig.handleSeach()
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