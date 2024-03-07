
import type { handleLogin } from '@/apis/login';
<template>
  <div class="base-card query">
    <a-input style="width: 240px" v-model:value="query.roleName" placeholder="请输入角色名称" />
    <a-button style="margin-left: 16px" type="primary">查询</a-button>
    <a-button style="margin-left: 16px" @click="handleAdd">新增</a-button>
  </div>
  <div class="base-card table">
    <a-table :columns="columns" :data-source="data" bordered :pagination="pagination">
      <template #bodyCell="{ column, record }">
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
          label="角色名"
          name="roleName"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.roleName" show-count :maxlength="15"/>
        </a-form-item>

        <a-form-item
          label="权限描述"
          name="roleDesc"
          :rules="[{ required: true, message: '请输入账号!' }]"
        >
          <a-textarea v-model:value="formState.roleDesc" show-count :maxlength="50" />
        </a-form-item>

        <a-form-item
          label="分配权限"
          name="permissions"
        >
          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
            checkable
            :tree-data="treeData"
          >
            <template #title="{ title }">
              {{ title }}
            </template>
          </a-tree>
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
import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import type { TreeProps } from 'ant-design-vue';
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
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '角色Code',
    dataIndex: 'roleCode'
  },
  {
    title: '权限描述',
    dataIndex: 'roleDesc'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
];
const data = [
  {
    key: '1',
    roleName: '管理员',
    roleCode: 'admin',
    roleDesc: '全部权限'
  }
];
const query = reactive({
  roleName: ''
})

const handleIsOpenChange = (value: any) => {
  console.log(`selected ${value}`);
}
let open = ref<boolean>(false)
const drawTitle = ref<string>('新增角色')
const formRef = ref()

interface FormState {
  roleName: string
  roleDesc: string
  permissions: any[]
}

const formState = reactive<FormState>({
  roleName: '',
  roleDesc: '',
  permissions: []
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

const treeData: TreeProps['treeData'] = [
  {
    title: '全部权限',
    key: '0-0',
    children: [
      {
        title: '首页',
        key: '0-1-0'
      },
      {
        title: '会话存档',
        key: '0-0-0',
        children: [
          { title: '会话内容', key: '0-0-0-0' },
          { title: '存档记录', key: '0-0-0-1' },
        ],
      },
      {
        title: '系统设置',
        key: '0-0-1',
        children: [
          { key: '0-0-1-0',
            title: '用户管理'
          },
          { key: '0-0-1-1',
            title: '角色管理'
          },
          { key: '0-0-1-2',
            title: '企微信息设置'
          }
        ],
      },
    ],
  },
];
const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
const selectedKeys = ref<string[]>(['0-0-0']);
const checkedKeys = ref<string[]>([]);
watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys);
});
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys);
});
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys);
});

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