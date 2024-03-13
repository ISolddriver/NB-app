<template>
  <div class="base-card query">
    <a-input placeholder="请输入规则名称" v-model:value="query.name" style="width: 160px;" class="mr8" />
    <a-input placeholder="请输入敏感词" v-model:value="query.words" style="width: 200px;" class="mr8" />
    <a-input placeholder="请输入生效成员" v-model:value="query.userName" style="width: 200px;" class="mr8" />
    <a-button class="mr8" type="primary" @click="tableConfig.handleSeach">查询</a-button>
    <a-button @click="resetQuery">重置</a-button>
  </div>
  <div class="base-card table">
    <a-button @click="handleAdd" class="mb8 fr"><PlusOutlined />新增</a-button>
    <a-table
      :columns="columns"
      :data-source="tableConfig.tableData"
      bordered
      :pagination="tableConfig.pagination"
      :loading="tableConfig.loading"
      @change="tableConfig.handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-switch v-model:checked="record.status" :checkedValue="1" :unCheckedValue="0"  @change="handleIsOpenChange" />
        </template>
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
          label="规则名称"
          name="name"
          :rules="[{ required: true, message: '请输入规则名称!' }]"
        >
          <a-input v-model:value="formState.name" maxlength="15" show-count />
        </a-form-item>
        <a-form-item
          label="敏感词"
          name="words"
          :rules="[{ required: true, message: '请输入敏感词!' }]"
        >
          <a-textarea v-model:value="formState.words" rows="4" maxlength="300" show-count />
        </a-form-item>
        <a-form-item
          label="生效范围"
          :rules="[{ required: true, message: '请选择生效范围!' }]"
        >
          <a-radio-group v-model:value="formState.rangeType">
            <a-radio :value="0">全部消息</a-radio>
            <a-radio :value="1">员工消息</a-radio>
            <a-radio :value="2">客户消息</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="生效成员"
          name="rangeList"
          :rules="[{ required: true, message: '请选择生效成员!' }]"
        >
          <a-transfer
            v-model:target-keys="targetKeys"
            v-model:selected-keys="selectedKeys"
            :data-source="mockData"
            :titles="['全部成员', '生效成员']"
            :render="item => item.title"
            @selectChange="handleSelectChange"
          />
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
import { useFetchList } from '@/hooks/table/useFetchList'
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import {
  getList,
  addItem,
  deleteItem,
  edit
} from '@/apis/sensitiveword/record'
import { columns } from './consts/columns'
import { message } from 'ant-design-vue';
import { editStatus } from '../../../apis/sensitiveword/record';

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
  words: '',
  name: '', // 敏感词名称
  userName: ''
})

interface FormState {
  id: number | string,
  name: string
  words: string
  rangeType: number
  rangeList: string[]
}
let formState = reactive<FormState>({
  id: '',
  name: '',
  words: '',
  rangeType: 0,
  rangeList: []
})
let open = ref<boolean>(false)
const formRef = ref()
let drawTitle = ref<string>('新增敏感词')

interface MockData {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}
const mockData: MockData[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`
  });
}
const targetKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([])
const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
  formState.rangeList = targetKeys.value
}

const closeDrawer = () => {
  formRef.value.resetFields()
  formState = reactive({
    id: '',
    name: '',
    words: '',
    rangeType: 0,
    rangeList: []
  })
  open.value = false
}
const handleAdd = () => {
  open.value = true
  drawTitle.value = '新增敏感词'
}
const handleEdit = async (record: any) => {
  open.value = true
  drawTitle.value = '编辑敏感词'
  formState = {
    id: record.id,
    name: record.name,
    words: record.words,
    rangeList: record.rangeList,
    rangeType: record.rangeType
  }
}
const handleSubmit = async () => {
  formRef.value
    .validate()
    .then(async () => {
      const fn = formState.id ? edit : addItem
      const res = await fn({
        ...formState
      })
      if (res.code === 200) {
        message.success('操作成功！')
        closeDrawer()
        tableConfig.handleSeach({
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

const resetQuery = () => {
  query = reactive<queryData>({
    words: '',
    name: '', // 敏感词名称
    userName: ''
  })
}
const handleIsOpenChange = async (checked: boolean, record: any) => {
  console.log(checked, record)
  const res = await editStatus({
    status: checked ? 1 : 0,
    id: record.id
  })
  if (res.code === 200) {
    if (res.code === 200) {
      message.success('操作成功')
      tableConfig.handleSeach()
      return
    }
    message.error('操作失败')
  }
}

const handleDelete = async (id: number) => {
  const res = await deleteItem(id)
  if (res.code === 200) {
    message.success('删除成功')
    tableConfig.handleSeach()
    return
  }
  message.error('删除失败')
}

let tableConfig = reactive(useFetchList(getList, query))
onMounted(() => {
  tableConfig.handleSeach()
})

</script>