<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" clearable placeholder="输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="account.password"
          placeholder="输入密码"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
// 导入Elform以获取其类型
import { ElForm } from 'element-plus'
// 导入输入框匹配规则
import { rules } from '../config/account-config'
//导入缓存函数
import localCache from '@/utils/cache'
// 导入vuex实例
import { useStore } from 'vuex'
// 实例化vuex
const store = useStore()
// 查看获取缓存账号密码数据
const account = ref({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
// 获取组件实例
const formRef = ref<InstanceType<typeof ElForm>>()
// 账号登录方法
const loginAction = (isagreement: boolean) => {
  // 输入框判空
  formRef.value?.validate((valid) => {
    if (valid) {
      // 缓存账号密码
      if (isagreement) {
        localCache.setCache('name', account.value.name)
        localCache.setCache('password', account.value.password)
        // 清除账号密码缓存
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      // 执行登录请求
      store.dispatch('login/accountLoginAction', { ...account.value })
    }
  })
}
// 抛出账号登录方法
defineExpose({ loginAction })
</script>

<style lang="less" scoped></style>
