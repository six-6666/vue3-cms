import zhRequest from '../index'
import { IAccount } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
// 登录
export const accountLoginRequest = (account: IAccount) => {
  return zhRequest.post<any>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading: true
  })
}
// 获取个人信息
export const requestUserInfoById = (id: number) => {
  return zhRequest.get<any>({
    url: LoginAPI.LoginUserInfo + id
  })
}
// 查询权限菜单
export const requestUserMenusByRoleId = (id: number) => {
  return zhRequest.get<any>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
