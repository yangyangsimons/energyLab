import { createApp, onMounted } from 'vue'
import App from './App.vue'
//导入路由配置
import router from './router/'


//导入element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'normalize.css'
import "./assets/css/index.css"

import dataV from '@jiaminghi/data-view'

//导入element-plus的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//npm uninstall vuex
//npm install pinia
//npm i pinia-plugin-persist 持久化
import { createPinia } from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'

//导入自定义指令
import { permissions } from "./directives";

import util from "./util";
import {WebSocketDevice} from './WebSocketDevice';

(parent||window).postMessage("loading.hide","*");

util();




const store = createPinia()
store.use(piniaPluginPersist)



let app = createApp(App);

//全局注册Element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(router)//使用路由
  .use(ElementPlus, {
    locale: zhCn,
  })//使用ElementPlus,并使用中文语言
  .use(dataV)
  .use(store) //使用pinia数据仓库
  .use(permissions) //使用自定义指令
  .mount('#app');//挂载到id=app的html元素中

WebSocketDevice();

//发起一个全局的周期性事件,避免产生多个定时器
let count = 0;
window.dispatchEvent(new CustomEvent("timer", { bubbles: false, detail: { count: count } }));
window.setInterval(() => {
  count++;
  if (count > 36000000) {
    count = 0;
  }
  window.dispatchEvent(new CustomEvent("timer", { bubbles: false, detail: { count: count } }));
  if(count%5==0){
    window.dispatchEvent(new CustomEvent("timer5",{bubbles: false}));
  }
  if(count%10==0){
    window.dispatchEvent(new CustomEvent("timer10",{bubbles: false}));
  }
  if(count%30==0){
    window.dispatchEvent(new CustomEvent("timer30",{bubbles: false}));
  }
  if(count%60==0){
    window.dispatchEvent(new CustomEvent("timer60",{bubbles: false}));
  }
}, 1000);