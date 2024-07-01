<template>
  <div class="root w-abs">
    <div class="w-open-bg" @click.stop="awl.openBig=true"></div>
    <template v-for="(item, i) in data.list" :key="item.deviceId">
      <w-move v-if="data.move" v-model="data.list[i]" :move="data.move" @moveStart="data.update = false;" @moveEnd="updateXY(item)">
        <div class="w-item" :style="{ '--c': item.deviceOnline ? colors[item.deviceTypeId] : '#999999' }"
          :title="item.deviceName">
          <div>
            <div>采集信息</div>
            <div>
              采集时间: {{ item.lastTime }}<br>
              设备类型: {{ data.types[item.deviceTypeId] }}<br>
              采集数据: {{ item.lastValue }} {{ data.units[item.deviceTypeId] }}<br>
            </div>
          </div>
        </div>
      </w-move>
      <div v-else class="w-item" style="position: absolute;" :style="{ '--c': item.deviceOnline ? colors[item.deviceTypeId] : '#999999',top:data.list[i].y+'px',left:data.list[i].x+'px' }"
          :title="item.deviceName">
          <div>
            <div>采集信息</div>
            <div>
              采集时间: {{ item.lastTime }}<br>
              设备类型: {{ data.types[item.deviceTypeId] }}<br>
              采集数据: {{ item.lastValue }} {{ data.units[item.deviceTypeId] }}<br>
            </div>
          </div>
        </div>
    </template>
    <w-waters-big :devices="data" :colors="colors"></w-waters-big>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import WMove from "../WMove.vue";
import WWatersBig from "./WWatersBig.vue";
import ajax from "@/api/ajax";
import { ElMessage } from "element-plus";
import { AwlStore } from "@/store";

const awl = AwlStore();

let base = "/awl/device-config/"

const colors = ref(['#197fcd', '#cf4c4c', '#19cd7f', '#cd9c19']);
// onMounted(()=>{
//   colors.value=awl.deviceConfig.colors;
// });



const data = reactive({
  move: true,
  types: ['水表', '电表', "风能设备", "光能设备"],
  units: ['吨', 'kWh', 'kWh', 'kWh'],
  update: true,
  list: [
  ],
});

const updateXY = (item) => {
  ajax.put(base, {
    deviceId: item.deviceId,
    deviceX: item.x,
    deviceY: item.y,
  }).finally(() => {
    data.update = true;
  });
}

const loadData = () => {
  ajax.get(base + 'list').then(r => {
    if (r.data.ok) {
      data.list = r.data.data;
      data.list.forEach(item => {
        item.x = item.deviceX;
        item.y = item.deviceY;
      });
    };
    return ajax.get(base + "config");
  }).then(r => {
    if (r.data.ok) {
      data.move = r.data.data.move;
      awl.title=r.data.data.title;
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
  left: 96.9rem;
  top: 30.1rem;
  width: 190.7rem;
  height: 166.3rem;
  color: #1160b5;
  position: relative;
}


.w-open-bg {
  position: absolute;
  border: dashed 1px #FFF3;
  width: 380px;
  height: 360px;
  top: 108px;
  left: 5px;
}

.w-item {
  --w: 1rem;
  --c: #19cd7f;
  color: var(--c);
  overflow: visible;
  width: var(--w);
  height: var(--w);

  border-radius: var(--w);
  box-sizing: content-box;
  background-color: currentColor;
  background-clip: content-box;
  border: calc(.2 * var(--w)) solid currentColor;
  padding: calc(.2 * var(--w));
  animation: 1s am-shadow infinite;
  z-index: 1;

}

@keyframes am-shadow {
  0% {
    box-shadow: 0 0 0 currentColor;
  }

  30% {
    box-shadow: 0 0 1rem currentColor;
  }

  70% {
    box-shadow: 0 0 1rem currentColor;
  }

  0% {
    box-shadow: 0 0 0 currentColor;
  }
}

.w-item>div {
  position: absolute;
  width: 30rem;
  border: solid currentColor .1rem;
  padding: 1rem;
  font-size: 1.6rem;
  line-height: 1.8;
  bottom: calc(var(--w) * 3);
  left: calc(var(--w) / 2 - 15rem + .25rem);
  border-radius: 1rem;
  /* backdrop-filter: blur(5px); */
  background-color: #000f;
  pointer-events: none;
  opacity: 0;
  transform: scale(0, 1);
  transition: all 1s;
  text-shadow: 0 0 .5rem #000;
  letter-spacing: .1rem;
  box-shadow: 0 0 1rem #000;
  z-index: 2;
}

.w-item>div::before {
  width: .2rem;
  height: calc(var(--w) * 2);
  background-color: currentColor;
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-.1rem);
  bottom: calc(var(--w) * -2);
}

.w-item:focus,
.w-item:hover {
  z-index: 99999;
}

.w-item:focus>div,
.w-item:hover>div {
  opacity: 1;
  transform: scale(1, 1);
  z-index:99999;
}

.w-item>div>:first-child {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: .3rem;
  margin-bottom: .5rem;
}

.w-item>div>:first-child::before {
  content: "";
  display: inline-block;
  width: .6rem;
  height: 1.2em;
  background-color: currentColor;
  margin-right: 1.5rem;
  margin-left: .5rem;
  ;
  border-radius: 1rem;
  transform: translateY(.5rem);
}

.w-item::before {
  content: attr(title);
  font-size: 1.6rem;
  letter-spacing: 0;
  white-space: nowrap;
  position: absolute;
  top: calc(var(--w) * 2);
  left: 50%;
  transform: translateX(-50%);
}</style>