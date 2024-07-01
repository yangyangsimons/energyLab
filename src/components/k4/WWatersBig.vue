<template>
  <div class="w-waters-big w-abs" @click.stop="" :class="{ 'w-waters-big-open': awl.openBig }">
    <dv-border-box-12 style="backdrop-filter: blur(5px); z-index:99999;">
      <div class="w-dv-content">
        <dv-flyline-chart-enhanced :dev="true" :config="config"
          style="width:100%;height:100%; z-index: 1;  position: absolute;" />

        <div class="w-abs" v-for="item in list" :key="item.deviceId" :style="{
          left: item.x1 + 'px',
          top: item.y1 + 'px',
          color: colors[item.deviceTypeId]
        }" style="font-size:15px;z-index:2;" @click="itemClick(item);">
          <w-wind v-if="item.deviceTypeId == 2" :running="opens[item.deviceId]">{{ item.deviceName }}</w-wind>
          <w-sun v-else-if="item.deviceTypeId == 3" :running="opens[item.deviceId]">{{ item.deviceName }}</w-sun>
          <w-device v-else :type="item.deviceTypeId" :running="item.deviceOnline">{{ item.deviceName }}</w-device>
        </div>

        <div class="w-abs" :style="{
          left: cx + 'px',
          top: cy + 'px',
        }" style="font-size:15px;color:#FFF;">
          <w-device :type="99" :am="false" :running="true">控制中心</w-device>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script setup>
// 604/136 = 4.4411764705882355
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { AwlStore } from "@/store";
import WWind from "../energylab/WWind.vue";
import WSun from "../energylab/WSun.vue";
import WDevice from "../energylab/WDevice.vue";

const awl = AwlStore();

const props = defineProps({
  devices: {
    type: Object,
    default: {}
  },
  colors: {
    type: Array,
    default: []
  }
});

const list = ref([]);
const yMin = 108;
const yMax = yMin + 340;
const xMin = -25;
const xMax = xMin + 370;
const amplification = 608 / 136;
const cx = 1100;
const cy = 500;
const offset = { x: 60, y: 60 };//飞线点偏移位置

const opens = ref({});

const config = ref({
  points: [],
  lines: [],
  relative: false,
  k: 1,
  curvature: 10,
});

const init = () => {
  console.debug(props.devices);
  list.value = [];
  config.value.lines = [];
  config.value.points = [];
  config.value.points.push({
    name: "c",
    coordinate: [cx + offset.x, cy + offset.y]
  });
  for (let item of [...props.devices.list]) {
    if (item.deviceX < xMin || item.deviceX > xMax
      || item.deviceY < yMin || item.deviceY > yMax
      || item.deviceTypeId == 0
    ) {
      continue;
    }
    item.x1 = (item.deviceX - xMin) * amplification;
    item.y1 = (item.deviceY - yMin) * amplification;
    opens.value[item.deviceId] = opens.value[item.deviceId] == undefined ? true : opens.value[item.deviceId];
    list.value.push(item);

    //添加点
    config.value.points.push({
      name: "p" + item.deviceId,

      coordinate: [item.x1 + offset.x, item.y1 + offset.y]
    });
    //添加线
    if (item.deviceTypeId > 0) {
      let line = {
        source: item.deviceTypeId == 1 ? 'c' : ("p" + item.deviceId),
        target: item.deviceTypeId != 1 ? 'c' : ("p" + item.deviceId),
        width: 3,
        color: props.colors[item.deviceTypeId],
        duration: item.deviceOnline ? [10, 40] : [0, 0],
        radius: 40,
      };
      if (item.deviceTypeId == 2 || item.deviceTypeId == 3) {
        line.duration= opens.value[item.deviceId] ? [10, 40] : [0, 0];
      }
      config.value.lines.push(line);
    }
  }
  config.value = { ...config.value };
}

watch(() => props.devices.list, init);
onMounted(init);


const itemClick = item => {
  opens.value[item.deviceId] = !opens.value[item.deviceId];
  for(let line of config.value.lines){
      if(line.source=="p"+item.deviceId){
        line.duration=opens.value[item.deviceId]?[10, 40] : [0, 0]
      }
  }
  config.value = { ...config.value };
};



</script>
<style scoped>
.w-waters-big {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 1s;
  transform: scale(0, 0);
  z-index: 9999;
}

.w-waters-big-open {
  transform: scale(1, 1);
}

.w-dv-content {
  background-image: url(@/assets/imgs/k4/big.png);
  background-position: center center;
}
</style>