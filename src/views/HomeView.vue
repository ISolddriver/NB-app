<template>
  <div class="home-container">
    <div class="slider">
      <div class="logo">
        <!-- <img src="@/assets/budaidise.svg" alt=""> -->
        <img src="@/assets/NByangan.svg" alt="">
        <span v-if="!state.collapsed">Niu Bee</span>
      </div>
      <div class="menu-container reset-scroll">
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
        <div class="menu-bread">
          <a-tabs
            v-model:activeKey="activeKey"
            hide-add
            type="editable-card"
            :tab-position="mode"
            @edit="handleEdit"
            @change="handleToPath"
          >
            <a-tab-pane
              v-for="pane in chooseMenus"
              :key="pane.key"
              :tab="pane.title"
              :closable="pane.closable"
              >
            </a-tab-pane>
          </a-tabs>
        </div>
        <RouterView />
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getMenuList } from '@/apis/system/base';
import {
  UserOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';
import { menus } from '@/consts/menu'
import type { TabsProps } from 'ant-design-vue';
const mode = ref<TabsProps['tabPosition']>('top');
const state = reactive({
  collapsed: false,
  collapsedWidth: '256px', // 80
  selectedKeys: ['1'],
  openKeys: [],
  preOpenKeys: [],
});
const items = menus
const chooseMenus = ref<{ title: any; key: string; closable?: boolean }[]>([
  { title: '首页', key: '/', closable: false }
]);
const activeKey = ref('/');

const router = useRouter()
// watch(
//   () => state.openKeys,
//   (_val, oldVal) => {
//     state.preOpenKeys = oldVal
//   }
// )
const handleChooseMenu = (path: any) => {
  activeKey.value = path
  if (path === '/') {
    state.selectedKeys = ['1']
    state.openKeys = ['']
  }
  items.forEach((item: any) => {
    if (item.children) {
      item.children.forEach((child: any) => {
        if (child.path === path) {
          state.selectedKeys = [child.key]
          state.openKeys = [item.key]
        }
      })
    }
  })
}
const handleToPath = (path: string) => {
  router.push(path)
}
const handleEdit = (targetKey: string, action: string) => {
  if (action === 'remove') {
    remove(targetKey)
  }
}
const remove = (targetKey: string) => {
  let lastIndex = 0;
  chooseMenus.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1;
    }
  });
  chooseMenus.value = chooseMenus.value.filter(pane => pane.key !== targetKey);
  if (chooseMenus.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = chooseMenus.value[lastIndex].key;
    } else {
      activeKey.value = chooseMenus.value[0].key;
    }
  }
  router.push(activeKey.value)
}
watch(() => router.currentRoute.value, (to, from) => {
  handleChooseMenu(to.path)
  if (to.path === '/') return
  const findItem = chooseMenus.value.find((item: any) => item.key === to.path)
  !findItem && chooseMenus.value.push({ key: to.path, title: to.meta.title })
}, { immediate: true })

const handleMenuSelect = (item: any) => {
  const path: string = item.item.path || ''
  router.push(path)
}
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
  state.collapsedWidth = state.collapsed ? '80px' : '256px'
}

onMounted(() => {
  /*
    menuId
    menuType = 'M' / 'C' 是菜单, 'F'是功能权限
    name
    parentId
    path
    icon
  */
  getMenuList({})
})
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
      height: calc(100vh - 64px);
      width: v-bind('state.collapsedWidth');
      overflow-y: scroll;
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
        height: calc(100vh - 64px);
        overflow-y: scroll;
        .menu-bread {
          // margin-bottom: 8px;
          // width: calc(100vw - v-bind('state.collapsedWidth') - 16px);
          :deep(.ant-tabs-nav) {
            margin-bottom: 0px!important;
          }
          :deep(.ant-tabs-nav::before) {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>

