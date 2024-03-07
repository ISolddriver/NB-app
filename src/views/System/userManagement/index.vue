
import type { handleLogin } from '@/apis/login';
<template>
  <div class="base-card query">
    <a-input style="width: 240px" v-model:value="query.username" placeholder="请输入用户名或账号" />
    <a-button style="margin-left: 16px" type="primary">查询</a-button>
    <a-button style="margin-left: 16px" @click="handleAdd">新增</a-button>
  </div>
  <div class="base-card table">
    <a-table :columns="columns" :data-source="data" bordered :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'isOpen'">
          <a-switch v-model:checked="record.isOpen"  @change="handleIsOpenChange" />
        </template>
        <template v-if="column.dataIndex === 'operate'">
          <a-button type="link"><FormOutlined />编辑</a-button>
          <a-button type="link"><DeleteOutlined />删除</a-button>
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
    >
      <a-form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :rules="rules"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="账号"
          name="acount"
          :rules="[{ required: true, message: '请输入账号!' }]"
        >
          <a-input v-model:value="formState.acount" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item
          label="用户角色"
          name="roleType"
          :rules="[{ required: true, message: '请选择角色!' }]"
        >
          <a-select v-model:value="formState.roleType">
            <a-select-option value="1">管理员</a-select-option>
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
import type { SelectProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue';
interface columnData {
  title: string;
  dataIndex: string;
  className?: string;
}
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
  showPageSize: true
})

const columns:Array<columnData> = [
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '账号',
    dataIndex: 'acount'
  },
  {
    title: '角色',
    dataIndex: 'roleName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '启用',
    dataIndex: 'isOpen'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
];
const data = [
  {
    key: '1',
    userName: 'John Brown',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  },
  {
    key: '2',
    userName: 'Jim Green',
    acount: 'admin',
    roleName: '管理员',
    createTime: '2022-01-01 12:00:00',
    isOpen: true
  }
];
const query = reactive({
  username: ''
})

const options = ref<SelectProps['options']>([
  {
    value: '',
    label: '全部',
  },
  {
    value: '1',
    label: 'Jack',
  },
  {
    value: '2',
    label: 'Tom',
  }
])

const handleIsOpenChange = (value: any) => {
  console.log(`selected ${value}`);
}
let open = ref<boolean>(false)
const drawTitle = ref<string>('新增用户')
const formRef = ref()
const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码');
  } else {
    const result = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?#^()_/~&]).{8,20}$/.test(value)
    if (result) {
      return Promise.resolve();
    }
    return Promise.reject('请按照规则输入密码');
  }
};
const rules: Record<string, Rule[]> = {
  password: [{ required: true, validator: validatePass, trigger: 'change' }]
};
interface FormState {
  username: string
  password: string
  acount: string
  roleType: string | number
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  acount: '',
  roleType: ''
})

const handleAdd = () => {
  open.value = true
}
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
    })
    .catch(error => {
      console.log('error', error);
    });
}
const closeDrawer = () => {
  formRef.value.resetFields()
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
</style>