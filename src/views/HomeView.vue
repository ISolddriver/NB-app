<template>
  <div class="home-container">
    <div class="slider">
      <div class="logo">
        <!-- <img src="@/assets/budaidise.svg" alt=""> -->
        <img src="@/assets/NByangan.svg" alt="">
        <span v-if="!state.collapsed">New Bee</span>
      </div>
      <div class="menu-container">
        <a-menu
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          mode="inline"
          theme="dark"
          :inline-collapsed="state.collapsed"
          :items="items"
          @select="handleMenuSelect"
        ></a-menu>
      </div>
    </div>
    <div class="content">
      <header>
        <div class="top">
          <MenuFoldOutlined class="icon-collapsed" @click="toggleCollapsed"/>
          <!-- <span class="title">数据中心</span> -->
        </div>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <a-avatar size="small">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <span style="margin-left: 8px;">Admin ｜ 管理员</span>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">修改密码</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </header>
      <main>
        <a-breadcrumb>
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>Page</a-breadcrumb-item>
        </a-breadcrumb>
        <RouterView />
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterView, useRouter } from 'vue-router'
import { reactive, watch, h, handleError } from 'vue';
import {
  CommentOutlined,
  AppstoreOutlined,
  UserOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';
const state = reactive({
  collapsed: false,
  collapsedWidth: '256px', // 80
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});
const items = reactive([
  {
    key: '1',
    icon: () => h(AppstoreOutlined),
    label: '首页',
    path: '/'
  },
  {
    key: 'sub1',
    icon: () => h(CommentOutlined),
    label: '会话存档',
    children: [
      {
        key: '2',
        label: '会话内容',
        path: '/conversation'
      },
      {
        key: '3',
        label: '存档记录'
      },
      {
        key: '4',
        label: '存档范围',
      }
    ],
  },
  {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
    children: [
      {
        key: '9',
        label: 'Option 9',
        title: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
        title: 'Option 10',
      }
    ]
  }
])
const router = useRouter()
// watch(
//   () => state.openKeys,
//   (_val, oldVal) => {
//     state.preOpenKeys = oldVal
//   }
// )
const handleMenuSelect = (item: any) => {
  const path: string = item.item.path || ''
  router.push(path)
}
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
  state.collapsedWidth = state.collapsed ? '80px' : '256px'
}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    background: #f0f2f5;
    .slider {
      // width: 256px;
      height: 100%;
      background: #001529;
    }
    .logo {
      height: 64px;
      // width: 256px;
      color: #fff;
      display: flex;
      align-items: center;
      padding-left: 24px;
      span {
        font-size: 20px;
        padding-left: 12px;
      }
    }
    .menu-container {
      min-height: calc(100vh - 64px);
      width: v-bind('state.collapsedWidth');
      // overflow-y: scroll;
    }
    .content {
      width: calc(100vw - v-bind('state.collapsedWidth'));
      header {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        padding: 0 16px;
        font-size: 14px;
        .top {
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-collapsed {
            font-size: 20px;
          }
        }
        .title {
          font-size: 26px;
          padding-left: 8px;
        }
      }
      main {
        padding: 8px;

      }
    }
  }
</style>

