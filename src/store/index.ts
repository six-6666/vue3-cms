import { createStore, Store, useStore as useVuexStore } from 'vuex' //给useStore取别名
import { IRootStore, IStoreType } from './types'
import login from './login/login'

const store = createStore<IRootStore>({
  state() {
    return {
      name: '黄志惠'
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

// 拉取缓存数据保存到vuex
export const setupStore = () => {
  store.dispatch('login/loadLocalLogin')
}

// 给useStore指定类型
export const useStore = (): Store<IStoreType> => {
  return useVuexStore()
}
export default store
