<template>
  <div class="base-card query">
    <a-input placeholder="请输入姓名" v-model:value="query.name" style="width: 200px;" />
    <a-button style="margin-left: 16px" type="primary">查询</a-button>
  </div>
  <div class="base-card table">
    <a-table :columns="columns" :data-source="data" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          {{ text }}
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
interface columnData {
  title: string;
  dataIndex: string;
  className?: string;
}
const columns:Array<columnData> = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '操作',
    dataIndex: 'money'
  }
];
let data = reactive<any[]>([]);
const query = reactive({
  name: ''
})

const getData = () => {
  return [
    {
      name: 'John Brown',
    },
    {
      name: 'Jim Green'
    },
    {
      name: 'Joe Black'
    }
  ]
}

onMounted(() => {
  data = getData();
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