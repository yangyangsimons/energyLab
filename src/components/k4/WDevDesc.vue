<template>
  <div class="root w-abs">
    <dv-border-box-12 style="backdrop-filter: blur(5px);">
      <div class="w-dv-content">
        <div class="w-dv-title"><slot>未知标题</slot></div>
        <div>
          <div class="w-num">
            <div v-for="i in 4" :key="i">
              <div :style="{ 'color': data.colors[i - 1] }">{{ data.nums[i - 1] }}</div>
              <div>{{ data.names[i - 1] }}</div>
            </div>
          </div>

          <div style="width: 100%; height: 66rem; padding-top:2rem;">
            <div ref="chartRef" style="width: 100%; height: 100%; font-size: 2rem; text-shadow: none;"></div>
          </div>

        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, reactive, ref, watch,onUnmounted, toRefs } from "vue";
import ajax from "@/api/ajax";
import {AwlStore} from '@/store/AwlStore';

let base = "/awl/device-config/";

const awl = AwlStore();

const data = reactive({
  nums: [21, 19, 1, 1],
  names: ["水表", "电表", "风能设备", "光能设备"],
  colors: ["#1b9be2", "#7bcbef", "#d3f4f4", "#e28269"]
});




const loadData = () => {
  ajax.get(base + 'countByType').then(r => {
    if (r.data.ok) {
      let obj = JSON.parse(JSON.stringify(awl.deviceConfig));
      for(let item of r.data.data){
        obj.nums[item.id]=Number(item.num);
      }
      for(let a in data){
        data[a] = obj[a];
      }
    }
  });
}

const timer = (event) => {
  if (event.detail.count % 27 != 0) {
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

let chart = null;
const chartRef = ref(null);
let option = {
  tooltip: {
    trigger: 'item',
    textStyle:{
      fontSize:"2rem"
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['30%', '60%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#2e6099',
        borderWidth: 2
      },
      data: [
      ],
      emphasis: {
      },
      label:{
        formatter: '{b} : {d}%',
        fontSize:"2.5rem",
        color:'#FFF',
        textShadowColor:'#0009',
        textShadowBlur:5,
      }
    }
  ]
};

let reloadChart = () => {
  let d = [];
  let c = [];
  for (let i = 0; i < data.nums.length; i++) {
    d.push({ name: data.names[i], value: data.nums[i] });
    c.push(data.colors[i]);
  }
  option.color=c;
  option.series[0].data = d;
  chart.setOption(option);
}

onMounted(() => {
  chart = echarts.init(chartRef.value);
  reloadChart();
});
watch(data,reloadChart);



</script>
<style scoped>
.root {
  left: 6.2em;
  top: 47em;
  width: 42.2em;
  height: 51.2em;
  color: #1160b5;
}

.w-num {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-shadow: .2rem .2rem 0 #0009;
  letter-spacing: .2em;
  padding: 1rem 5rem 0;
}

.w-num>div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #c8daf5;
  font-size: 3.2rem;
}

.w-num>div>:first-child {
  font-size: 5.6rem;
  font-weight: bold;
}
</style>