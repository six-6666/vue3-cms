class LocalCache {
  // 保存数据
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取数据
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  //删除key指定的缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空所有缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
