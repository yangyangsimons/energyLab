import { defineStore } from "pinia" // 定义容器
export const AuthStore = defineStore('AuthStore', {
  /**
   * 存储全局状态
   * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
  */
  state: () => {
    return {
      token: "",
      user: {}
    }
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   */
  getters: {
    isLogin(state) {
      return state.token ? true : false;
    }
  },
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    /**
     * 设置令牌
     * @param {string} token 
     */
    setToken(token) {
      this.token = token;
    },
  },
  persist: {
    enabled: true, // 开启缓存  默认会存储在本地localStorage
    strategies: [
      {
        key: 'AuthStore',
        storage: localStorage,
        paths:["token"]
      },
      {
        key: 'AuthStore',
        storage: sessionStorage,
        paths:["user"]
      }
    ]
  }

})