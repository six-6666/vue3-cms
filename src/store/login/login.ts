import { Module } from 'vuex'
import type { ILoginStore } from './types'
import type { IRootStore } from '../types'
import type { IAccount } from '@/service/login/types'
import mapMenusToRoues from '@/utils/map-menus'
import router from '@/router'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import LocalCache from '@/utils/cache'

const loginModule: Module<ILoginStore, IRootStore> = {
  // 添加命名空间
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },

  getters: {},

  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeMenu(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenusToRoues(userMenus)
      // 添加路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },

  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //登录获取token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data.data
      // 保存token 与 id 到 vuex

      commit('changeToken', token)

      // 把token保存到本地缓存
      LocalCache.setCache('token', token)

      //请求个人信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data.data

      // 把userInfo保存到vuex
      commit('changeUserInfo', userInfo)

      // 把userInfo 保存到本地缓存
      LocalCache.setCache('userInfo', userInfo)

      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data.data

      // 保存userMenus 到vuex
      commit('changeMenu', userMenus)

      // 保存userMenus 到缓存
      LocalCache.setCache('userMenus', userMenus)

      // 跳转到首页
      router.push('/main')
    },

    // 使刷新后重新拉取缓存里的数据
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeMenu', userMenus)
      }
    }

    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default loginModule
