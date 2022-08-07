<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
// import zhRequest from '../../service/index'
import LoginPanel from './components/login-panel.vue'

// const getRequest = () => {
//   zhRequest
//     .get({
//       url: '/home/multidata',
//       showLoading: true
//     })
//     .then((res) => {
//       console.log(res)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
// getRequest()
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ins {
  width: 100%;
  height: 5%;
  background-color: pink;
}
</style>
