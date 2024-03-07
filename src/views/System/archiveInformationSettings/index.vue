<template>
  <a-card title="复制以下信息并填入到企业微信后台" class="mb8">
    <a-form
      name="basic"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="可信任IP地址"
      >
        <a-input v-model:value="formState.ip" :disabled="true" style="width: 240px;" />
      </a-form-item>
      <a-form-item
        label="信息加密"
      >
        <a-input-group compact class="mb8">
          <a-input v-model:value="formState.publicKey" placeholder="公钥内容" :disabled="true" style="width: 240px;" />
          <a-tooltip title="复制公钥">
            <a-button>
              <template #icon><CopyOutlined /></template>
            </a-button>
          </a-tooltip>
        </a-input-group>
        <a-input-group compact class="mb8">
          <a-input v-model:value="formState.privateKey" placeholder="私钥内容" :disabled="true" style="width: 240px;" />
          <a-tooltip title="复制私钥">
            <a-button>
              <template #icon><CopyOutlined /></template>
            </a-button>
          </a-tooltip>
        </a-input-group>
        <a-button type="primary">生成</a-button> <span>提示：需要您生成后才可以使用</span>
      </a-form-item>
    </a-form>
  </a-card>
  <a-card title="将企业微信后台会话存档配置页面的Secret复制到下框中" class="mb8">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="会话存档Secret"
      >
        <a-input v-model:value="formSecret.secret" style="width: 360px;">
          <template #suffix>
            <a-tooltip title="登录企业微信管理后台，点击“管理工具”-“会话内容存档”-“Secret”">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="公钥版本号"
      >
        <a-input v-model:value="formSecret.publicKeyVersion" style="width: 360px;">
          <template #suffix>
            <a-tooltip title="登录企业微信管理后台，点击“管理工具”-“会话内容存档”-“版本号”">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="存档拉取频率"
      >
        <a-select
          ref="select"
          v-model:value="formSecret.pullFrequency"
          style="width: 360px"
          placeholder="请选择存档拉取频率"
          class="mb16"
        >
          <a-select-option value="1">每1小时拉取一次</a-select-option>
          <a-select-option value="2">每2小时拉取一次</a-select-option>
          <a-select-option value="3">每4小时拉取一次</a-select-option>
          <a-select-option value="4">每天零点拉取一次</a-select-option>
        </a-select>
        <p><a-button type="primary">保存</a-button></p>
      </a-form-item>
    </a-form>
  </a-card>
  <a-card class="mb8">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="会话存档状态"
      >
        <a-switch v-model:checked="formState.status"></a-switch>
      </a-form-item>
    </a-form>
  </a-card>
  <a-card>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="License"
      >
        <a-input :disabled="formState.licenseDisabled" v-model:value="formState.license" style="width: 360px; margin-right: 8px;" />
        <a-button class="mr8">更改</a-button>
        <a-button class="mr8" type="primary">激活</a-button>
        <a-button type="primary">获取激活信息</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { CopyOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
const formState = reactive<any>({
  ip: '139.196.54.20',
  publicKey: '',
  privateKey: '',
  status: true,
  license: '',
  licenseDisabled: true
});

const formSecret = reactive<any>({
  secret: '',
  publicKeyVersion: '',
  pullFrequency: undefined
});
</script>