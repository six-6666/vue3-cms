<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
//element-plus 转中文
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style lang="less"></style>
