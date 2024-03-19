
<template>
  <div class="base-card query">
    <a-input style="width: 240px" v-model:value="query.name" placeholder="请输入超时名称" />
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
        <!-- <template v-if="column.dataIndex === 'status'">
          <a-switch v-model:checked="record.status" :checkedValue="1" :unCheckedValue="2"  @change="handleIsOpenChange" />
        </template> -->
        <template v-if="column.dataIndex === 'operate'">
          <a-button @click="handleEdit(record)" type="link"><FormOutlined />编辑</a-button>
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
      width="600"
    >
      <a-form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item
          label="超时名称"
          name="name"
          :rules="[{ required: true, message: '请输入超时名称!' }]"
          show-count
          maxlength="15"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item
          label="超时时长"
          name="timeOut"
          :rules="[{ required: true, message: '请输入超时时长!' }]"
        >
          <a-input-number :min="0" style="width: 120px;" v-model:value="formState.timeOut" /> 分钟
        </a-form-item>
        <a-form-item
          label="会话类型"
          name="chatType"
          :rules="[{ required: true }]"
        >
          <a-radio-group v-model:value="formState.chatType">
            <a-radio :value="0">全部</a-radio>
            <a-radio :value="1">客户会话</a-radio>
            <a-radio :value="2">群聊会话</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="员工排期"
          name="rangeList"
          :rules="[{ required: true, message: '请选择生效成员!' }]"
        >
          <div>
            <a-slider :min="1" :max="7" range step="1">
              <template #mark="{ label, point }">
                <template>{{ label }}{{ point }}</template>
              </template>
            </a-slider>
            <a-time-range-picker />
            <a-transfer
              v-model:target-keys="targetKeys"
              v-model:selected-keys="selectedKeys"
              :data-source="userList"
              :titles="['全部成员', '生效成员']"
              :render="item => item.title"
              @selectChange="handleSelectChange"
            />
          </div>
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
import { getList as getUserList, deleteUser } from '@/apis/system/user'
import { getRuleList, addRule, editRule } from '@/apis/timeout/setting';
import { useFetchList } from '@/hooks/table/useFetchList'
import { columns } from './consts/tableColumns'

const query = reactive({
  name: '' 
})
const {
  tableData,
  handleSeach,
  handleTableChange,
  pagination,
  loading
} = useFetchList(getRuleList, query)
onMounted(() => {
  handleSeach()
  getUserList({}).then(res => {
    userList.value = res.data.list && res.data.list.map(item => {
      return {
        key: item.userId + '',
        title: item.userName
      }
    })
  })
})


let open = ref<boolean>(false)
let drawTitle = ref<string>('新增超时规则')
const formRef = ref()

interface FormState {
  name: string
  timeOut: string
  chatType: string | number
  rangeList: Array<any>,
  id?: string | number
}
let formState = reactive<FormState>({
  name: '',
  timeOut: '',
  chatType: 0,
  rangeList: [],
  id: ''
})
const userList = ref<any[]>([]) 
const targetKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([])
const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
  formState.rangeList = targetKeys.value
}

const handleAdd = () => {
  drawTitle.value = '新增超时规则'
  open.value = true
}
const handleDelete = async (userId: string | number) => {
  const res = await deleteUser({ userId })
  if (res.code === 200) {
    message.success('删除成功')
    handleSeach({ current: 1, pageSize: 10 })
    return
  }
  message.error('删除失败')
}
const handleEdit = (record: any) => {
  drawTitle.value = '编辑超时规则'
  open.value = true
  formState = {
    name: record.name,
    timeOut: record.timeOut,
    chatType: record.chatType,
    rangeList: [], // TODO
    id: record.id
  }
}

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      console.log('values', formState);
      const fn = formState.id ? editRule : addRule
      const res = await fn({
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
    name: '',
    timeOut: '',
    chatType: 0,
    rangeList: [],
    id: ''
  })
  selectedKeys.value = []
  targetKeys.value = []
  open.value = false
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
</style>@/hooks/list/useFetchList@/hooks/table/useFetchList