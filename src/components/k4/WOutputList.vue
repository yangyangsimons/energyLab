<template>
  <div class="root w-abs">
    <dv-border-box-12 style="backdrop-filter: blur(5px);">
      <div class="w-dv-content">
        <div class="w-dv-title"><slot>未知标题</slot></div>
        <div>
          <div class="w-list w-title">
            <div>采集时间</div>
            <div>设备名称</div>
            <div>读表数据</div>
          </div>
          <div v-for="(item,i) in data.list" :key="i" class="w-list">
            <div>{{ item.lastTime || '/' }}</div>
            <div>{{ item.deviceName || '/' }}</div>
            <div v-if="item.deviceOnline">{{ item.lastValue?.toFixed(2) || '/' }} {{['吨','度'][item.deviceTypeId] }}</div>
            <div v-else>离线</div>
          </div>
        </div>
        </div>
    </dv-border-box-12>
  </div>
</template>
<script setup>
import { onMounted,onUnmounted, reactive } from "vue";
import ajax from "@/api/ajax"
let base = "/awl/device-config/";
const data = reactive({
  list:[
    {
    },
    {
    },
    {
    },
    {
    },
  ],
});

const loadData = () => {
  ajax.get(base + 'top-4').then(r => {
    if (r.data.ok) {
      data.list = r.data.data;
    }
  });
}

const timer = (event) => {
  if (event.detail.count % 10 != 0) {
    return;
  }
  loadData();
}
onMounted(() => {
  loadData();
  window.addEventListener("timer", timer);
});

onUnmounted(() => {
  window.removeEventListener("timer", timer);
});
</script>
<style scoped>
.root {
  left:287.6rem;
  top:30rem;
  width: 84.4rem;
  height: 60rem; 
  color: #1160b5;
}
.w-list {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  font-size: 2.5rem;
  color:#c6d5ed;
  line-height: 3.5;
}
.w-list>:first-child {
  text-indent: 6rem;
}
.w-list:nth-child(2n+1) {
  background-color: #FFF1;
}
.w-list.w-title {
  background-color: #0002;
  color:#49a2ff;
}
</style>