
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
          <a-button @click="handleDelete(record.id)" type="link"><DeleteOutlined />删除</a-button>
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
      width="700"
    >
      <a-form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
      >
        <a-form-item
          label="超时名称"
          name="name"
          :rules="[{ required: true, message: '请输入超时名称!' }]"
        >
          <a-input v-model:value="formState.name" show-count maxlength="15" />
        </a-form-item>
        <a-form-item
          label="超时时长"
          name="timeOut"
          :rules="[{ required: true, message: '请输入超时时长!' }]"
        >
          <a-input-number
            :min="0" style="width: 120px;"
            v-model:value="formState.timeOut"
            addon-after="分钟"
          />
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
        <!-- ['workCycle', 'beginTime', 'endTime', 'userIds'] -->
        <a-form-item
          :label="index === 0 ? '员工排期' : ''"
          :name="['rangeList', index]"
          :rules="[{ required: true, message: '请设置员工范围!' }]"
          v-for="(item, index) in formState.rangeList"
          :key="item.key"
          :wrapper-col="index !== 0 ? { xs: { span: 24, offset: 0 },sm: { span: 20, offset: 4 }} : {}"
        >
          <a-card style="width: 95%;">
            <a-checkbox-group v-model:value="item.workCycle" style="margin-bottom: 32px;">
              <a-checkbox :value="1">周一</a-checkbox>
              <a-checkbox :value="2">周二</a-checkbox>
              <a-checkbox :value="3">周三</a-checkbox>
              <a-checkbox :value="4">周四</a-checkbox>
              <a-checkbox :value="5">周五</a-checkbox>
              <a-checkbox :value="6">周六</a-checkbox>
              <a-checkbox :value="7">周日</a-checkbox>
            </a-checkbox-group>
            <a-time-picker
              v-model:value="item.beginTime"
              format="HH:mm"
              valueFormat="HH:mm"
              style="margin-bottom: 32px;"
            />
            <span> - </span>
            <a-time-picker
              v-model:value="item.endTime"
              format="HH:mm"
              valueFormat="HH:mm"
              style="margin-bottom: 32px;"
            />
            <a-select
              v-model:value="item.userIds"
              :options="userList"
              mode="multiple"
              placeholder="Please select"
            ></a-select>
          </a-card>
        </a-form-item>
        <a-form-item :wrapper-col="{ xs: { span: 24, offset: 0 },sm: { span: 20, offset: 4 }}">
          <a-button type="dashed" style="width: 95%" @click="handleAddRangeItem">
            <PlusOutlined />
            新增排期
          </a-button>
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
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getList as getUserList } from '@/apis/system/user'
import { getRuleList, addRule, editRule, deleteRule, getRule } from '@/apis/timeout/setting';
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
        value: item.userId,
        label: item.userName
      }
    })
  })
})


let open = ref<boolean>(false)
let drawTitle = ref<string>('新增超时规则')
const formRef = ref()
type RangeList = {
  key: number | string,
  beginTime: string,
  endTime: string,
  workCycle: Array<string | number>,
  userIds: Array<number>
}
interface FormState {
  name: string
  timeOut: string
  chatType: string | number
  rangeList: RangeList[],
  id?: string | number
}
let formState = reactive<FormState>({
  name: '',
  timeOut: '',
  chatType: 0,
  rangeList: [
    {
      key: 1,
      beginTime: '',
      endTime: '',
      workCycle: [1, 2, 3, 4, 5, 6, 7],
      userIds: []
    }
  ],
  id: ''
})
const userList = ref<any[]>([])

const handleAddRangeItem =  () => {
  formState.rangeList.push({
    key: Date.now(),
    beginTime: '',
    endTime: '',
    workCycle: [1, 2, 3, 4, 5, 6, 7],
    userIds: []
  })
}
const handleAdd = () => {
  drawTitle.value = '新增超时规则'
  open.value = true
}
const handleDelete = async (id: string | number) => {
  const res = await deleteRule({ id })
  if (res.code === 200) {
    message.success('删除成功')
    handleSeach({ current: 1, pageSize: 10 })
    return
  }
  message.error('删除失败')
}
const handleEdit = (record: any) => {
  drawTitle.value = '编辑超时规则'
  getRule({
    id: record.id
  }).then(res => {
    const rangeList = res.data.rangeList.map((item: any) => {
      return {
        key: item.ruleId,
        beginTime: item.btime,
        endTime: item.etime,
        workCycle: item.workCycle.split(',').map(item => Number(item)),
        userIds: item.userList.map(item => item.userId)
      }
    })
    formState = {
      name: res.data.name,
      timeOut: res.data.timeOut,
      chatType: res.data.chatType,
      rangeList: rangeList,
      id: record.id
    }
    console.log(formState, '222')
    open.value = true
  })
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
    rangeList: [
      {
        key: 1,
        beginTime: '',
        endTime: '',
        workCycle: [1, 2, 3, 4, 5, 6, 7],
        userIds: []
      }
    ],
    id: ''
  })
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