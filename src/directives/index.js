import { AuthStore } from "@/store";


export const permissions = {
  install(Vue) {
    Vue.directive("auth", {
      //元素挂载的时候如果没有登录就移除元素
      mounted(el, binding) {
        if (!AuthStore().isLogin) {
          el.parentNode.removeChild(el);
        }
      }
    });

    Vue.directive("roles", {
      mounted(el, binding) {
        if (!binding.value) {
          throw new Error("指令v-roles未配置要检查的角色");
        }
        if (binding.value instanceof Array) {
          if (!binding.value.includes(AuthStore().user.roleId)) {
            el.parentNode.removeChild(el);
          }
        } else {
          if (binding.value != AuthStore().user.roleId) {
            el.parentNode.removeChild(el);
          }
        }

      }
    })



  }
}