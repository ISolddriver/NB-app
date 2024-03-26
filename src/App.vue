<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
</script>

<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
</style>
