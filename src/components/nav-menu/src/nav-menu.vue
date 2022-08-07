<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/image/logo.svg" alt="" />
      <span v-if="!isFold" class="titled">大美女</span>
    </div>

    <el-menu
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
      :collapse="isFold"
      :default-active="defaultValue"
      text-color="#fff"
    >
      <!-- 一级菜单 -->
      <template v-for="(item, index) in userMenus" :key="index">
        <el-sub-menu :index="item.id + ''" class="el-sub-menu1">
          <!-- 一级标题 -->
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <template
            v-for="(sonitem, sonindex) in item.children"
            :key="sonindex"
          >
            <template v-if="sonitem.type == 1">
              <el-sub-menu :index="sonitem.id + ''" class="el-sub-menu2">
                <template #title>
                  <span>{{ sonitem.name }}</span>
                </template>
                <!-- 三级菜单 -->
                <template
                  v-for="(grandsonitem, grandsonindex) in sonitem.children"
                  :key="grandsonindex"
                >
                  <template v-if="grandsonitem.type == 2">
                    <el-sub-menu
                      :index="grandsonitem.id + ''"
                      class="el-sub-menu3"
                    >
                      <template #title>
                        <span>{{ grandsonitem.name }}</span>
                      </template>
                    </el-sub-menu>
                  </template>
                  <template v-else>
                    <el-menu-item
                      :index="grandsonitem.id + ''"
                      class="el-sub-menu3"
                    >
                      <span>{{ grandsonitem.name }}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-sub-menu>
            </template>
            <!-- 二级菜单 -->
            <template v-else>
              <el-menu-item
                :index="sonitem.id + ''"
                class="el-sub-menu2"
                @click="handleMenuItemClick(sonitem)"
                >{{ sonitem.name }}</el-menu-item
              >
            </template>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue'
import router from '@/router'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { Location } from '@element-plus/icons-vue'
import { mapMenusRoute } from '@/utils/map-menus'

const props = defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

const currentPath = route.path

const store = useStore()

let userMenus = computed(() => {
  return store.state.login.userMenus
})

let defaultValue = ref(mapMenusRoute(currentPath, userMenus.value).id + '')

const handleMenuItemClick = (item: any) => {
  router.push(item.url)
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .titled {
      width: 100%;
      font-size: 16px;
      font-weight: 700;
      line-height: 0;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }
  .el-sub-menu1 {
    background-color: #001529 !important;
  }
  :deep(.el-sub-menu__title:hover) {
    color: #001529 !important;
    background-color: #eee !important;
  }
  .el-sub-menu2 {
    background-color: #051d33 !important;
  }
  .el-sub-menu3 {
    background-color: #022e57 !important;
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
