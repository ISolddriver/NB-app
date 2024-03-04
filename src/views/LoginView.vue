<template>
  <div class="login-container">
    <div class="user-layout">
      <div class="top">
        <img class="logo" src="@/assets/NByangan.svg" alt="">
        <span>New Bee</span>
      </div>
      <a-form
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input style="width: 360px;" v-model:value="formState.username" placeholder="请输入账号">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password style="width: 360px;" v-model:value="formState.password" placeholder="请输入密码">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button style="width: 360px;" type="primary" @click="login">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import {
  handleLogin,
  getImgLocation
} from '@/apis/login';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

interface FormState {
  username: string | undefined;
  password: string | undefined;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: undefined,
  password: undefined,
  remember: true,
})

const onFinish = (values: any) => {
  console.log('Success:', values);
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
}

onMounted(async () => {
  const res:object = await getImgLocation({})
})

const login = async () => {
  const res = await handleLogin({
    username: formState.username,
    password: formState.password,})
  console.log(res)
}
</script>

<style lang="less">
  .login-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-image: url('src/assets/background.svg');
    background-size: cover;
    .user-layout {
      padding: 88px 0 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .top {
        // width: 360px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
        .logo {
          width: 44px;
        }
        span {
          font-size: 32px;
          padding-left: 12px;
        }
      }
    }
  }
</style>

