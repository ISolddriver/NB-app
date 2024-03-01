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
    <div class="chat-data">
      <div class="title">单聊数据</div>
      <div class="items">
        <div class="item" v-for="(item, index) in chatData" :key="index">
          <component class="icon" :is="item.icon"></component>
          <div class="context">
            <p class="title">{{ item.name }}</p>
            <p class="count">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-data">
      <div class="title">群聊数据</div>
      <div class="items">
        <div class="item" v-for="(item, index) in chatData" :key="index">
          <component class="icon" :is="item.icon"></component>
          <div class="context">
            <p class="title">{{ item.name }}</p>
            <p class="count">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs, { Dayjs } from 'dayjs';
import { ref, h } from 'vue';
import { CommentOutlined } from '@ant-design/icons-vue';
type RangeValue = [Dayjs, Dayjs];

const rangePresets = ref([
  { label: '前7天', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '前14天', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '前30天', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '前90天', value: [dayjs().add(-90, 'd'), dayjs()] },
]);

const onRangeChange = (dates: RangeValue, dateStrings: string[]) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};

const chatData = ref([
  {
    name: '单聊总数',
    value: 0,
    icon: () => h(CommentOutlined)
  },
  {
    name: '发送消息数',
    value: 0,
    icon: () => h(CommentOutlined)
  },
  {
    name: '新增客户数',
    value: 0,
    icon: () => h(CommentOutlined)
  },
  {
    name: '平均首次回复时长',
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
          margin-right:16px;
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