<template>
  <div class="ls-4k" :style="{ 'background-image': 'url(./assets/imgs/k4/bg.png)' }" @click="awlStore.openBig = false;">

    <a style="position: absolute; right:20px; top:10px;  color: #7bcbef;font-weight: bold;" target="_admin"
      href="/admin.html">管理后台</a>

    <div class="w-abs logo" :style="{ 'background-image': 'url(./assets/imgs/k4/logo' + setStore.k4.logo + '.png)' }"
      @click="setStore.k4.logo = setStore.k4.logo == 1 ? 2 : 1"></div>

    <img v-if="false" style="position: absolute; top:53px;left:1345px"
      :src="'./assets/imgs/k4/text' + setStore.k4.text + '.png'"
      @click="setStore.k4.text = setStore.k4.text == 1 ? 2 : 1" />
    <div class="title">
      <div>{{ awlStore.title }}</div>
      <div>{{ awlStore.title }}</div>
    </div>
    <w-weather>天气</w-weather>

    <w-time>时间</w-time>

    <w-dev-status>设备状态</w-dev-status>

    <w-dev-desc>设备总览</w-dev-desc>

    <w-output-list>能源实时数据采集</w-output-list>

    <w-output-chart>实时能源消耗数据</w-output-chart>

    <w-output>实时能源消耗汇总</w-output>

    <w-waters>电表位置信息</w-waters>

    <div class="w-bottom"></div>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted, onUnmounted } from 'vue';

import WWeather from '@/components/k4/WWeather.vue';
import WTime from '@/components/k4/WTime.vue';
import WDevStatus from '@/components/k4/WDevStatus.vue';
import WDevDesc from '@/components/k4/WDevDesc.vue';
import WOutputList from '@/components/k4/WOutputList.vue';
import WOutputChart from '@/components/k4/WOutputChart.vue';
import WOutput from '@/components/k4/WOutput.vue';
import WWaters from '@/components/k4/WWaters.vue';

import { AwlStore, useSetStore } from '../store';
import { ElMessage } from 'element-plus';

const $ = getCurrentInstance().proxy;

const awlStore = AwlStore();
const setStore = useSetStore();

const resize = () => {
  if (screen.width < 3840 || screen.height < 2160) {
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

<style scoped>
.ls-4k {
  --w: 3840px;
  --h: 2160px;
  --vw: 20px;
  height: var(--h);
  width: var(--w);
  font-size: var(--vw);
  position: relative;
  color: #FFF;
}

.logo {
  height: 6.6em;
  width: 30em;
  background-repeat: no-repeat;
  background-size: auto 5em;
  background-position: center center;
}

.w-bottom {
  position: absolute;
  width: 100%;
  height: 40.4rem;
  background-image: url(@/assets/imgs/k4/bg_bt@3x.png);
  background-size: auto 40.4rem;
  left: 0;
  bottom: 0;
}

.title {
  position: absolute;
  top: 55px;
  left: 1245px;
  width: 1344px;
  height: 110px;
  /* transform: scale(1,1.1); */
  text-shadow: none;
  box-shadow: none;
}

.title>div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  text-align: center;
  font-family: '微软雅黑','黑体';
  font-size: 90px;
  height: 90px;
  font-weight: 1000;
  line-height: 1;
}

.title>div:first-child {
  color: #434d6b;
  transform: translate(2px, 4px);
}

.title>div:last-child {
  background-image: linear-gradient(to top, #a6bde9 0%, #FFF 75%  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  /* color:#FFF; */
  /* -webkit-mask-image: -webkit-gradient(linear, 0 0, 0 bottom, from(yellow), to(rgba(0, 0, 255, 0))); */
}</style>