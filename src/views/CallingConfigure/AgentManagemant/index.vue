<script setup lang="ts">
import { getList, deleteAgent } from '@/apis/callingConfigure/agent'
import { useFetchList } from '@/hooks/table/useFetchList'
import { columns } from './consts/tableColumns'
import { message } from 'ant-design-vue'

const query = reactive({
  username: ''
})
const { tableData, handleSeach, handleTableChange, pagination, loading } = useFetchList(
  getList,
  query
)
onMounted(() => {
  handleSeach()
})

const handleDelete = async (userId: string | number) => {
  const res = await deleteAgent({ userId })
  if (res.code === 200) {
    message.success('删除成功')
    handleSeach()
    return
  }
  message.error('删除失败')
}

const handleEdit = (record: any) => {}

const handleAdd = () => {}
</script>
<template>
  <div class="base-card query">
    <a-input style="width: 240px" v-model:value="query.username" placeholder="请输入用户名或账号" />
    <a-button style="margin-left: 16px" type="primary" @click="handleSeach">查询</a-button>
  </div>
  <div class="base-card table">
    <a-button class="mb8 fr" @click="handleAdd"><PlusOutlined />新增</a-button>
    <a-table
      :columns="columns"
      :data-source="tableData"
      bordered
      :pagination="pagination"
      @change="handleTableChange"
      :loading="loading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operate'">
          <a-button @click="handleEdit(record)" type="link"><FormOutlined />编辑</a-button>
          <a-button @click="handleDelete(record.userId)" type="link">
            <DeleteOutlined />删除
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
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
