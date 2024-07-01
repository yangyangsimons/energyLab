import { defineStore } from "pinia" // 定义容器

export const AwlStore = defineStore('AwlStore', {
  state: () => {
    return {
      title:"",
      params: {},
      devices: [],
      deviceConfig:{
        nums: [21, 19, 1, 1],
        names: ["水表", "电表", "风能设备", "光能设备"],
        colors: ["#1b9be2", "#7bcbef", "#d3f4f4", "#e28269"]
      },
      opens:[true,true,true,true],
      openBig:false,//打开k4大屏的控制中心示意
      k4:{

      },
      po: {
      }
    }
  },
  //计算字段
  getters:{
    /**
     * 流向电网方向
     * 0：无电流
     * 1：流向电网
     * -1：从电网流入 
     */
    elec(state) {
      let p = state.params["16400"];//根据双向电表的瞬时总有功功率判断
      if(p==undefined){
        return 0;
      }
      if(p>1){
        return 1;
      }
      if(p<-1){
        return -1;
      }

      return 0;
    },
    /**
     * 流向电池方向
     * 0：无电流
     * 1：流向电池
     * -1：从电池流出 
     */
    ele(state) {
      let p = state.params["16432"];//根据PCS并网柜的直流电流判断
      if(p==undefined){
        return 0;
      }
      if(p>0.1){
        return 1;
      }
      if(p<-0.1){
        return -1;
      }

      return 0;
    },
    /**
     * RLC可编程模拟负载是否工作
     */
    rlc(state){
      let p = state.params["16505"];
      if(p==undefined){
        return false;
      }
      if(p>0){
        return true;
      }
      return false;
    }
  },

  actions: {
    loadData() {

    },

    getDevice(id) {
      for (let item of this.devices) {
        if (item.id == id) {
          return item;
        }
      }
      return null;
    }


  }
  ,
  persist: {
    enabled: true, // 开启缓存  默认会存储在本地localStorage
    strategies: [
      {
        key: 'AwlStore',
        storage: localStorage,
        paths: ["po"]
      }
    ]
  }

})