
import type { handleLogin } from '@/apis/login';
<template>
  <div class="base-card query">
    <a-input style="width: 240px" v-model:value="query.corpUserName" placeholder="请输入姓名" />
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
          <a-button @click="handleDelete(record.userId)" type="link"><DeleteOutlined />删除</a-button>
        </template>
      </template>
    </a-table>
    <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :title="drawTitle"
      placement="right"
      :closable="false"
      width="500"
    >
      <a-form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item
          label="姓名"
          name="corpUserId"
          :rules="[{ required: true, message: '请选择!' }]"
        >
          <a-select v-model:value="formState.corpUserId" placeholder="请选择">
            <a-select-option v-for="item in userList" :key="item.userId" :value="item.userId">{{ item.userName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="back" style="margin-right: 16px;" @click="closeDrawer">取消</a-button>
        <a-button key="submit" type="primary" @click="handleSubmit">提交</a-button>
      </template>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getList } from '@/apis/system/user'
import { getPermitList, deletePermitItem, updatePermit } from '@/apis/session/archive.ts'
import { useFetchList } from '@/hooks/table/useFetchList'
import { columns } from './consts/columns'

const query = reactive({
  corpUserName: '' 
})
const { tableData, handleSeach, handleTableChange, pagination, loading } = useFetchList(getPermitList, query)
onMounted(() => {
  handleSeach()
})

let userList = ref<any[]>([]);

let open = ref<boolean>(false)
let drawTitle = ref<string>('新增用户')
const formRef = ref()

interface FormState {
  corpUserId: any
}
let formState = reactive<FormState>({
  corpUserId: undefined
})

const handleAdd = () => {
  drawTitle.value = '新增用户'
  open.value = true
}
const handleDelete = async (userId: string | number) => {
  const res = await deletePermitItem({ userId })
  if (res.code === 200) {
    message.success('删除成功')
    handleSeach({ current: 1, pageSize: 10 })
    return
  }
  message.error('删除失败')
}

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      console.log('values', formState);
      const res = await updatePermit({
        ...formState
      })
      if (res.code === 200) {
        message.success('操作成功！')
        closeDrawer()
        handleSeach({
          current: 1,
          pageSize: 10
        })
        return
      }
      message.error('操作失败！')
    })
    .catch(error => {
      console.log('error', error);
    });
}
const closeDrawer = () => {
  formRef.value.resetFields()
  formState = reactive({
    corpUserId: undefined
  })
  open.value = false
}

watch(open, async (val) => {
  if (val) {
    const res = await getList({})
    userList.value = res.data.list
  }
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
</style>@/hooks/list/useFetchList@/hooks/table/useFetchList