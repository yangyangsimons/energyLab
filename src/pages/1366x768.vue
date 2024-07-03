<template>
  <div class="ls-root">
    <div class="top">
      <div>
        <div class="logo"></div>
        <h1 class="title">园区微电网智慧能源管控平台</h1>
      </div>
      <div class="menus">
        <div class="active">系统总览</div>
        <div @click="proxy.$router.push('/watch')">运行监控</div>
        <div hidden>设备详情</div>
      </div>
    </div>
    <div class="devicesContainer">
      <div class="devices">
        <w-move :move="false" v-model="xy[0]"><w-acdc @click="routeTo('/watch/acdc', '储能双向变流器')"></w-acdc></w-move>
        <w-move :move="false" v-model="xy[2]"><w-ac @click="routeTo('/watch/ac', '直驱模拟风机变流器')"></w-ac></w-move>
        <w-move :move="false" v-model="xy[3]"><w-elec @click="routeTo('/watch/elec', '微电网接入中央测控柜')"></w-elec></w-move>
        <w-move :move="false" v-model="xy[4]"><w-rlc @click="routeTo('/watch/rlc', 'RLC可编程负载')"></w-rlc></w-move>
        <w-move :move="false" v-model="xy[5]"><w-ele @click="routeTo('/watch/bms', '电池储能')"></w-ele></w-move>

        <!--太阳能-->
        <w-move :move="false" v-model="xy[6]"><w-sun :running="running.sun" click1="running.sun = !running.sun;"
            @click="doWind"></w-sun></w-move>
        <!--风车-->
        <w-move :move="false" v-model="xy[1]"><w-wind :running="running.wind" click1="running.wind = !running.wind;"
            @click="doWind"></w-wind></w-move>


        <dv-flyline-chart-enhanced :dev="true" :config="config"
          style="width:100%;height:100%; z-index: 0;  position: absolute;" />


      </div>
      <div class="swt">
        <div class="switch">
          <button @click="toggleSunAnimation" class="glow-on-hover">光伏开关</button>

        </div>
        <div class="switch">
          <button @click="toggleWindAnimation" class="glow-on-hover">风电开关</button>

        </div>
        <div class="switch">
          <button @click="toggleWindAnimation" class="glow-on-hover">并网开关</button>

        </div>
      </div>
    </div>


    <div
      style=" width: 100%; height: 35rem; display: flex; justify-content: center; align-items: center; display: none;">
      <w-ls-count :param-titles="['瞬时总有功功率']" :param-ids="[16400]"></w-ls-count>

    </div>
    <div class="curveChartsContainer" style=" width: 100%; height: 35rem;">
      <div id="curve">
        <BMSCharts></BMSCharts>
        <SunCharts></SunCharts>
        <WindCharts></WindCharts>

        <PressureCharts></PressureCharts>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted, onUnmounted } from 'vue';
import WAcdc from '../components/energylab/WAcdc.vue';
import WMove from '../components/WMove.vue';
import WWind from '../components/energylab/WWind.vue';
import WAc from '../components/energylab/WAc.vue';
import WElec from '../components/energylab/WElec.vue';
import WRlc from '../components/energylab/WRlc.vue';
import WEle from '../components/energylab/WEle.vue';
import WSun from '../components/energylab/WSun.vue';
import WLsCount from '../components/energylab/WLsCount.vue';
import BMSCharts from './chart/BMSCharts.vue';
import WindCharts from './chart/WindCharts.vue';
import SunCharts from './chart/SunCharts.vue';
import PressureCharts from './chart/PressureCharts.vue';
import { sendAll } from '../WebSocketDevice'

import { doOpen } from '../api/OpensApi'

import { AwlStore } from '../store';
import { ElMessage } from 'element-plus';

const proxy = getCurrentInstance().proxy;

const awlStore = AwlStore();

const wh = [1366, 360];

const running = ref({ wind: true, sun: true });

const runningChange = () => {
  changeLine(2, running.value.wind);
  changeLine(7, running.value.sun);
  changeLine(3, running.value.sun || running.value.wind);
};
const toggleSunAnimation = () => {
  running.value.sun = !running.value.sun;
};

const toggleWindAnimation = () => {
  running.value.wind = !running.value.wind;
};
//监听状态变化
watch(running.value, runningChange);

//初始化太阳能和风能运行状态
onMounted(runningChange);

const routeTo = (to, title) => {
  ElMessage.success("正在运行监控屏幕上显示" + title);;
  sendAll({ message: 'routeTo', data: to });
}

const changeLine = (a, b) => {
  config.value.lines[a].duration = b ? [10, 10] : [0, 0];
  config.value = { ...config.value };
}



const xy = ref([
  { x: (1366 - 120) / 2, y: 66 },//ac/dc
  { x: 102, y: 232 },//风车
  { x: 342, y: 232 },//直驱
  { x: 342, y: 77 },//电网
  { x: 930, y: 232 },//RLC
  { x: 930, y: 77 },//电池
  { x: 102, y: 77 },//太阳能
]);

let points = [];
for (let i = 1; i < xy.value.length; i++) {
  points.push({
    name: i + "-1",
    coordinate: [xy.value[i].x, xy.value[i].y + 20]
  });
  points.push({
    name: i + "-2",
    coordinate: [xy.value[i].x, xy.value[i].y + 60]
  });
  points.push({
    name: i + "-3",
    coordinate: [xy.value[i].x + 80, xy.value[i].y + 20]
  });
  points.push({
    name: i + "-4",
    coordinate: [xy.value[i].x + 80, xy.value[i].y + 60]
  });
}

points.push({
  name: "0-1",
  coordinate: [xy.value[0].x, xy.value[3].y + 20]
});

points.push({
  name: "0-2",
  coordinate: [xy.value[0].x, xy.value[3].y + 60]
});

points.push({
  name: "0-3",
  coordinate: [xy.value[0].x, xy.value[2].y + 20]
});

points.push({
  name: "0-4",
  coordinate: [xy.value[0].x, xy.value[2].y + 60]
});

points.push({
  name: "0-5",
  coordinate: [xy.value[0].x + 120, xy.value[3].y + 20]
});

points.push({
  name: "0-6",
  coordinate: [xy.value[0].x + 120, xy.value[3].y + 60]
});

points.push({
  name: "0-7",
  coordinate: [xy.value[0].x + 120, xy.value[2].y + 20]
});

points.push({
  name: "0-8",
  coordinate: [xy.value[0].x + 120, xy.value[2].y + 60]
});

const config = ref(
  {
    points,
    lines: [
      {
        source: '3-3',
        target: '0-1',
        width: 3,
        color: '#F00',
        duration: [0, 0],
        radius: 40,

      },
      {
        source: '0-2',
        target: '3-4',
        width: 3,
        color: '#F00',
        duration: [0, 0],
        radius: 40,

      },
      {
        source: '1-3',
        target: '2-1',
        width: 3,
        color: '#0F0',
        duration: [0, 0],
        radius: 40,

      },
      {
        source: '2-3',
        target: '0-3',
        width: 3,
        color: '#0F0',
        duration: [0, 0],
        radius: 40,

      },
      {
        source: '0-7',
        target: '4-1',
        width: 3,
        color: '#F00',
        duration: [0, 0],
        radius: 40,

      },
      {
        source: '0-5',
        target: '5-1',
        width: 3,
        color: '#F00',
        duration: [0, 0],
        radius: 40,

      },
      {
        source: '5-2',
        target: '0-6',
        width: 3,
        color: '#F00',
        duration: [0, 0],
        radius: 40,

      },
      {
        source: '6-4',
        target: '2-1',
        width: 3,
        color: '#0F0',
        duration: [0, 0],
        radius: 40,

      },

    ],
    relative: false,
    k: 1,
    curvature: 10,
  }
);

//电网数据变化
const elecChange = () => {
  if (awlStore.elec == 0) {
    changeLine(0, false);
    changeLine(1, false);
  } else if (awlStore.elec == 1) {
    changeLine(0, false);
    changeLine(1, true);
  } else {
    changeLine(0, true);
    changeLine(1, false);
  }
}
watch(() => awlStore.elec, elecChange);
onMounted(elecChange);
watch(() => awlStore.params["16486"], (newValue, oldValue) => {
  console.log("Updated temperature:", newValue?.toFixed(2) || 0);
}, { deep: true, immediate: true });
//rlc可编程负载变化
const rlcChange = () => {
  if (awlStore.rlc) {
    changeLine(4, true);
  } else {
    changeLine(4, false);
  }
}
watch(() => awlStore.rlc, rlcChange);
onMounted(rlcChange);



//电池数据变化
const eleChange = () => {
  if (awlStore.ele == 0) {
    changeLine(5, false);
    changeLine(6, false);
  } else if (awlStore.ele == 1) {
    changeLine(6, false);
    changeLine(5, true);
  } else {
    changeLine(6, true);
    changeLine(5, false);
  }
}
watch(() => awlStore.ele, eleChange);
onMounted(eleChange);



//模拟
window.addEventListener("_timer", () => {

  if (Math.random() > .4) {
    return;
  }
  awlStore.params["16505"] = Math.floor(Math.random() * 3);
  awlStore.params["16400"] = Math.random() * 3 - 1.5;
  awlStore.params["16432"] = Math.random() * 3 - 1.5;

});



const doWind = () => {
  doOpen(2).then(r => {
    if (r.data.ok) {
      ElMessage.success(`发送能源输入模块${awlStore.opens[1] ? '打开' : '关闭'}命令成功`);
    } else {
      ElMessage.error(`发送能源输入模块${awlStore.opens[1] ? '打开' : '关闭'}命令成功`);
      console.error(r);
    }
  });
}
watch(() => awlStore.opens[1], () => {
  running.value.sun = awlStore.opens[1];
  running.value.wind = awlStore.opens[1];
});



const resize = () => {
  if (screen.width < 1366 || screen.height < 768) {
    document.body.style.overflow = "scroll";
  } else {
    document.body.style.overflow = "hidden";
  }
}

onMounted(() => {
  resize();
  window.addEventListener("resize", resize);
});
onUnmounted(() => {
  window.removeEventListener("resize", resize);
});
</script>

<style scoped lang="scss">
.ls-root {
  width: 100%;
  height: 100vh;
  background-color: #000;
  background-image: url(../assets/imgs/bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: #FFF;
  --shadow-color: #FFF3;

  .top {
    width: 100%;
    height: 100px;
    background-image: url(../assets/imgs/bg-title.png);
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 80px;
      height: 80px;
      background-image: url(../assets/imgs/logo-column-2.png);
      background-size: 100% 100%;
    }

    .menus {
      margin-right: 220px;
    }
  }

  .devicesContainer {
    width: 100%;
    height: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .devices {
      position: relative;
      width: 70%;
      height: 360px;
    }

    .swt {
      margin-right: 260px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 2rem;
      font-weight: bold;

      .glow-on-hover {
        width: 220px;
        height: 50px;
        border: none;
        outline: none;
        color: #fff;
        background: #0cf;
        cursor: pointer;
        position: relative;
        z-index: 0;
        border-radius: 10px;

        &:before {
          content: '';
          background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
          position: absolute;
          top: -2px;
          left: -2px;
          background-size: 400%;
          z-index: -1;
          filter: blur(5px);
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          animation: glowing 20s linear infinite;
          opacity: 1; // Always visible, not just on hover
          transition: opacity .3s ease-in-out;
          border-radius: 10px;
        }

        &:active {
          color: #0cf
        }

        &:active:after {
          background: transparent;
        }

        &:after {
          z-index: -1;
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgb(12, 21, 24);
          left: 0;
          top: 0;
          border-radius: 10px;
        }
      }

      @keyframes glowing {
        0% {
          background-position: 0 0;
        }

        50% {
          background-position: 400% 0;
        }

        100% {
          background-position: 0 0;
        }
      }

    }
  }

  .curveChartsContainer {
    #curve {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

  }
}
</style>