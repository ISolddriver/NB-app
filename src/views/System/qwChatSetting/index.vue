<template>
  <div class="base-card form-content">
    <a-form ref="formRef" :model="formState" name="dynamic_rule" :labelCol="{span: 9}">
      <a-form-item
        label="企业名称"
        name="corpName"
        :rules="[{ required: true, message: '请输入企业名称!' }]"
      >
        <a-input style="width: 260px;" v-model:value="formState.corpName" show-count :maxlength="50" />
      </a-form-item>
      <a-form-item
        label="企业ID(corpID)"
        name="corpId"
        :rules="[{ required: true, message: '请输入企业ID!' }]"
      >
        <a-input style="width: 260px;" v-model:value="formState.corpId" />
      </a-form-item>
      <a-form-item
        label="外部联系人管理Secret"
        name="agentSecret"
        :rules="[{ required: true, message: '请输入外部联系人管理Secret!' }]"
      >
        <a-input style="width: 260px;" v-model:value="formState.agentSecret" />
      </a-form-item>
      <a-form-item
        label="通讯录管理Secret"
        name="encodingAesKey"
      >
        <a-input style="width: 260px;" v-model:value="formState.encodingAesKey" />
      </a-form-item>
      <a-form-item
        label="客服管理Secret"
        name="chatSecret"
      >
        <a-input style="width: 260px;" v-model:value="formState.chatSecret" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 9 }">
        <a-button style="margin-right: 10px" @click="resetFields">重置</a-button>
        <a-button type="primary" @click="handleSubmit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
interface FormState {
  corpId: string,
  corpName: string,
  agentId: string | number,
  agentSecret: string,
  chatSecret?: string,
  token?: string,
  encodingAesKey?: string,
}
const formRef = ref()
const formState = reactive<FormState>({
  corpId: '',
  corpName: '',
  agentId: 0,
  agentSecret: ''
})

const resetFields = () => {
  formRef.value.resetFields()
}

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState)
    })
    .catch(error => {
      console.log('error', error)
    })
}

</script>

<style lang="less">
  .form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>