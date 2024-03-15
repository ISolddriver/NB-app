<template>
  <div class="chat-container">
    <a-drawer
      v-model:open="open"
      :title="title"
      placement="right"
      @after-open-change="afterOpenChange"
      width="1000px"
    >
      <div class="layout">
        <div class="list">
          <a-radio-group v-model:value="listType" size="small" class="mb8">
            <a-radio-button value="1">外部好友</a-radio-button>
            <a-radio-button value="2">内部好友</a-radio-button>
            <a-radio-button value="3">外部群</a-radio-button>
            <a-radio-button value="4">内部群</a-radio-button>
          </a-radio-group>
          <div class="search-form mb8">
            <a-select
              ref="select"
              v-model:value="searchType"
              style="width: 100px"
              class="mr8"
            >
              <a-select-option value="1">名称</a-select-option>
              <a-select-option value="2">聊天内容</a-select-option>
            </a-select>
            <a-input-search
              v-model:value="context"
              placeholder="请输入"
              style="width: 150px"
            />
          </div>
          <div class="user-list reset-scroll">
            <a-list item-layout="horizontal" bordered :data-source="list" size="small">
              <template #renderItem="{ item }">
                <a-list-item
                  class="list-item"
                  :class="{ 'list-item-active': item.userId === selectUser }"
                  @click="handleSelect(item.userId)"
                >
                  <p>
                    <a-avatar size="small" shape="square">
                      <template #icon><UserOutlined /></template>
                    </a-avatar>
                    {{ item.title }}
                  </p>
                  <CheckCircleOutlined :class="{ 'active-icon' : item.userId === selectUser }" />
                </a-list-item>
              </template>
            </a-list>
          </div>
        </div>
        <div class="chats-content">
          <div class="search-form">
            <a-range-picker style="width: 360px;" v-model:value="dateTime" show-time class="mr8" />
            <a-input
              v-model:value="chatContext"
              placeholder="关键词搜索"
              style="width: 120px"
              class="mr8"
              allowClear
            />
            <a-select
              ref="select"
              v-model:value="contextType"
              style="width: 100px"
              class="mr8"
            >
              <a-select-option value="1">全部</a-select-option>
              <a-select-option value="2">文本</a-select-option>
              <a-select-option value="3">图片</a-select-option>
            </a-select>
            <a-tooltip title="导出">
              <a-button type="primary" shape="circle">
                <template #icon><ExportOutlined /></template>
              </a-button>
            </a-tooltip>
          </div>
          <div class="chats reset-scroll">
            <div class="search-chats" v-show="chatContext">
              1条和“186”相关的搜索结果
            </div>
            <div class="search-chat-item-list" v-if="false">
              <div
                class="search-chat-item"
                v-for="item in searchList"
                :key="item.id"
              >
                <div class="user">
                  <a-avatar shape="square" class="avatar">
                    <template #icon><UserOutlined /></template>
                  </a-avatar>
                  <div class="ml8">
                    <div class="user-name">{{ item.userName }}</div>
                    <div class="chat-value" v-html="filterChatContext(item.content, chatContext)"></div>
                  </div>
                </div>
                <div style="text-align: right;">
                  <div>{{ item.createTime }}</div>
                  <a-button type="link">查看上下文</a-button>
                </div>
              </div>
            </div>
            <div class="chat-item-list" v-if="true">
              <div
                class="chat-item"
                :class="{ 'chat-item-right': item.type === 'user' }"
                v-for="item in chatList"
                :key="item.id"
              >
                <a-avatar shape="square" class="avatar">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
                <div>
                  <div class="chat-item-datetime">{{ item.createTime }}</div>
                  <div class="popover-card">
                    <div class="popover-card-arrow"></div>
                    <div class="popover-card-inner">{{ item.content }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div>
              <a-pagination v-model:current="pagination.current" :total="pagination.total" show-less-items />
            </div> -->
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleOutlined, UserOutlined, ExportOutlined } from '@ant-design/icons-vue'
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
defineProps({
  title: {
    type: String,
    default: '会话内容'
  }
})

const open = ref<boolean>(true)
const listType = ref<string>('1')
const searchType = ref<string>('1')
const context = ref<string>('')
const dateTime = ref<RangeValue[]>()
const list = ref<any[]>([])
const selectUser = ref<string | number>('')
const chatContext = ref<string>('')
const contextType = ref<string>('1')
const searchList = ref<any[]>([])
const chatList = ref<any[]>([])
const pagination = ref<any>({
  current: 1,
  total: 1
})

for(let i = 0; i < 15; i++) {
  list.value.push({
    title: `秀儿 ${i}`,
    userId: i
  })
  searchList.value.push({
    userName: `秀儿`,
    id: i,
    content: `你好，我是秀儿 ${i}, 186`,
    createTime: '2024-03-14 14:22:03'
  })
  chatList.value.push({
    id: i,
    createTime: '2024-03-14 14:22:03',
    content: `${i % 2 ? '你好，我是秀儿' : '你好，请问你是 xxx 吗？我在北京，现在短时间内回不去，所以，关于买房装修等事宜，等我回去再商量可以吗？'}`,
    type: i % 2 ? 'user' : 'customer'
  })
}
const afterOpenChange = (bool: boolean) => {
  console.log(bool)
}
const handleSelect = (userId: string | number) => {
  selectUser.value = userId
}

const filterChatContext = (chat: string, matchKey: string) => {
  if (!matchKey) {  
    return chat
  }
  const regex = new RegExp(matchKey, 'gi')
  return chat.replace(regex, `<span style="color: #1677FF; font-weight: 500">${matchKey}</span>`)
}
</script>

<style scoped lang="less">
  .layout {
    display: flex;
  }
  .list {
    height: calc(100vh - 56px - 34px);
    width: 260px;
    display: flex;
    flex-direction: column;
    .search-form {
      display: flex;
    }
    .user-list {
      flex: 1;
      overflow-y: scroll;
      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        &:hover {
          background: #EFF3FF;
        }
      }
      .list-item-active {
        background: #EFF3FF;
      }
      .active-icon {
        color: #1890FF;
      }
    }
  }
  .popover-card {
    max-width: 300px;
    padding: 12px;
    border-radius: 8px;
    position: relative;
    background: #e6f4ff;
    .popover-card-arrow {
      position: absolute;
      z-index: 1;
      display: block;
      pointer-events: none;
      width: 12px;
      height: 12px;
      overflow: hidden;
      left: -6px;
      transform: translateY(-50%) translateY(100%) rotate(45deg);
      background: #e6f4ff;
      bottom: 50%;
    }
    .popover-card-arrow-right {
      left: auto;
      right: -6px;
    }
    .popover-card-inner {
      word-break: break-all;
    }
  }
  .chats-content {
    height: calc(100vh - 56px - 34px);
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    flex: 1;
    .search-chats {
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 4px;
    }
    .chats {
      flex: 1;
      margin-top: 8px;
      padding: 8px 16px 32px 16px;
      overflow-y: scroll;
      border: 1px solid #e8e8e8;
    }
    .search-chat-item-list {
      .search-chat-item {
        padding: 8px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e8e8e8;
        .user {
          display: flex;
          align-items: center;
          .chat-value {
            font-weight: 500;
          }
        }
      }
    }
    .chat-item-list {
      margin-top: 24px;
    }
    .chat-item {
      display: flex;
      align-items: center;
      margin-bottom: 32px;
      position: relative;
      .avatar {
        margin-right: 20px;
      }
      .chat-item-datetime {
        font-size: 12px;
        position: absolute;
        top: -18px;
        left: 52px;
      }
    }
    .chat-item-right {
      flex-direction: row-reverse;
      .avatar {
        margin-right: 0;
        margin-left: 20px;
      }
      .popover-card {
        background: #07C160;
        .popover-card-arrow {
          background: #07C160;
          left: auto;
          right: -6px;
        }
        .popover-card-inner {
          color: #fff;
        }
      }
      .chat-item-datetime {
        left: auto;
        right: 70px;
      }
    }
  }
</style>