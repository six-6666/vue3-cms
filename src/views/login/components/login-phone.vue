<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" clearable placeholder="输入手机号" />
      </el-form-item>
      <div class="code-box">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="phone.code" placeholder="输入验证码" />
        </el-form-item>
        <el-button class="code-button" type="primary">获取验证码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
// 导入输入框匹配规则
import { rules } from '../config/phone-config'
// import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore()
const phone = ref({
  num: '',
  code: ''
})
const formRef = ref()
const loginAction = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      store.dispatch('login/phoneLoginAction', { ...phone.value })
    }
  })
}
defineExpose({ loginAction })
</script>

<style lang="less" scoped>
.code-box {
  display: flex;
  .code-button {
    margin-left: 8px;
  }
}
</style>
