<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><avatar /></el-icon>
            <span>帐号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><chicken /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="agreement">
      <el-checkbox
        v-model="isagreement"
        label="保存密码"
        size="large"
        :disabled="isDisabled"
      />
      <el-link type="primary">找回密码</el-link>
    </div>
    <el-button class="loginButton" type="primary" @click="cameLogin"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Chicken, Avatar } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

// 登录模式选中
let currentTab = ref('account')
//保存密码
let isagreement = ref(false)
// 获取帐号登录组件实例
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()

const isDisabled = computed(() => {
  if (currentTab.value == 'account') {
    return false
  } else {
    return true
  }
})
const cameLogin = () => {
  if (currentTab.value == 'account') {
    accountRef.value?.loginAction(isagreement.value)
  } else {
    phoneRef.value?.loginAction()
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 120px;
  width: 320px;
  .title {
    text-align: center;
  }
  .agreement {
    display: flex;
    justify-content: space-between;
  }
  .loginButton {
    width: 100%;
  }
}
</style>
