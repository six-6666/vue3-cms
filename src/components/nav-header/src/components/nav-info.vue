<template>
  <div class="nav-info">
    <el-dropdown :hide-on-click="false">
      <span style="cursor: pointer"> {{ name }} </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
          <el-dropdown-item :icon="Baseball" divided>用户信息</el-dropdown-item>
          <el-dropdown-item :icon="Setting" divided>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import { SwitchButton, Baseball, Setting } from '@element-plus/icons-vue'

const store = useStore()
let name = computed(() => store.state.login.userInfo.name)
</script>

<style lang="less" scoped></style>
