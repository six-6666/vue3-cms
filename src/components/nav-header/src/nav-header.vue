<template>
  <div class="nav-header">
    <el-icon @click="cutFold" :size="30" v-if="isFold"><Expand /></el-icon>
    <el-icon @click="cutFold" :size="30" v-else><Fold /></el-icon>
    <div class="content">
      <div>面包屑</div>
      <div class="avatar">
        <el-avatar class="img" :size="30" :icon="UserFilled" />
        <NavInfo />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { Expand, Fold, UserFilled } from '@element-plus/icons-vue'

import NavInfo from './components/nav-info.vue'

const emit = defineEmits(['cutFold'])

let isFold = ref(false)
const cutFold = () => {
  isFold.value = !isFold.value
  emit('cutFold', isFold.value)
}
</script>
<style lang="less" scoped>
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .content {
    flex: 1;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    .avatar {
      display: flex;
      align-items: center;
      .img {
        margin-right: 8px;
      }
    }
  }
}
</style>
