import { defineStore } from "pinia" // 定义容器

export const useSetStore = defineStore('setStore', {
  state: () => {
    return {
      k4:{
        logo:1,
        text:1,
      }
    }
  },
  
  persist: {
    enabled: true, // 开启缓存  默认会存储在本地localStorage
    strategies: [
      {
        key: 'setStore',
        storage: localStorage,
      },
    ]
  }

})