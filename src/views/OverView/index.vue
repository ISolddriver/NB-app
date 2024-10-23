<template>
  <div class="over-view base-card">
    <div class="top">
      <a-range-picker
        style="width: 400px"
        show-time
        format="YYYY/MM/DD HH:mm:ss"
        :presets="rangePresets"
        @change="onRangeChange"
      />
    </div>
    <!-- <p>单聊数据</p> -->
    <div style="background-color: #f0f2f5; padding: 20px" class="mb16">
      <a-row :gutter="[16, 16]">
        <a-col :span="6" v-for="(item, index) in chatData" :key="index">
          <a-card :bordered="false">
            <!-- <a-card-meta>
              <template #avatar>
                <a-avatar :size="40">CHAT</a-avatar>
              </template>
            </a-card-meta> -->
            <a-statistic
              :title="item.name"
              :value="item.value"
              :precision="2"
              :value-style="{ color: '#3f8600' }"
            >
              <template #prefix>
                <!-- <arrow-down-outlined /> -->
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!-- <p>群聊数据</p> -->
    <div style="background-color: #f0f2f5; padding: 20px">
      <a-row :gutter="[16, 16]">
        <a-col :span="6" v-for="(item, index) in chatGroupData" :key="index">
          <a-card :bordered="false">
            <a-statistic
              :title="item.name"
              :value="item.value"
              :precision="2"
              :value-style="{ color: '#3f8600' }"
            >
              <template #prefix>
                <!-- <arrow-down-outlined /> -->
                <!-- <arrow-up-outlined /> -->
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import dayjs, { Dayjs } from 'dayjs'
import { ref, h } from 'vue'
import { CommentOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue'
type RangeValue = [Dayjs, Dayjs]

const rangePresets = ref([
  { label: '前7天', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '前14天', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '前30天', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '前90天', value: [dayjs().add(-90, 'd'), dayjs()] }
])

const onRangeChange = (dates: RangeValue, dateStrings: string[]) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1])
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
  } else {
    console.log('Clear')
  }
}

const chatData = ref([
  {
    name: '单聊总数',
    value: '0',
    icon: () => h(CommentOutlined)
  },
  {
    name: '发送消息数',
    value: '0',
    icon: () => h(CommentOutlined)
  },
  {
    name: '新增客户数',
    value: '0',
    icon: () => h(CommentOutlined)
  },
  {
    name: '平均首次回复时长',
    value: '00:00:00',
    icon: () => h(CommentOutlined)
  }
])
const chatGroupData = ref([
  {
    name: '群聊总数',
    value: '0',
    icon: () => h(CommentOutlined)
  },
  {
    name: '日活群聊数',
    value: '0',
    icon: () => h(CommentOutlined)
  },
  {
    name: '群成员总数',
    value: '0',
    icon: () => h(CommentOutlined)
  },
  {
    name: '群消息总数',
    value: '00:00:00',
    icon: () => h(CommentOutlined)
  }
])
</script>

<style scoped lang="less">
@base-padding: 16px 0;
.over-view {
  .top {
    padding: @base-padding;
    border-bottom: 1px solid #e8e8e8;
  }
  .chat-data {
    padding: @base-padding;
    &:first-child {
      padding: 16px 0 0 0;
    }
    .title {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .items {
      display: flex;
      justify-content: space-between;
      .item {
        padding: 16px;
        display: flex;
        background: #f8f9fb;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        flex: 1;
        margin-right: 16px;
        &:last-child {
          margin-right: 0;
        }
        .icon {
          font-size: 26px;
          margin-right: 14px;
        }
        .context {
          font-size: 16px;
          .title {
            font-weight: 600;
          }
          .count {
            color: #3366ff;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
