import { RouteRecordRaw } from 'vue-router'

// 保留第一个路由对象
let firstValue: any = null

// 处理路由对象
export default function mapMenusToRoues(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []
  // context是webpack的方法
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstValue) {
          firstValue = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

export function mapMenusRoute(path: string, userMenus: any): any {
  for (const item of userMenus) {
    if (item.type == '1') {
      const findMenu = mapMenusRoute(path, item.children)
      if (findMenu) {
        return findMenu
      }
    } else if (item.url == path && item.type == '2') {
      return item
    }
  }
}

export { firstValue }
