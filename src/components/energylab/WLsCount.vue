<template>

  <div style="padding: 1rem; " :style="{ height: props.height,width:props.width }">
    <div ref="chartRef" style="width: 100%; height: 100%; font-size: 2rem; text-shadow: none;"></div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref } from 'vue';
import ajax from '@/api/ajax';

const props = defineProps({
  per: {
    type: Number,
    default: 5
  },
  height: {
    type: String,
    default: "30rem"
  },
  width:{
    type: String,
    default: "90%"
  },
  num: {
    type: Number,
    default: 10
  },
  paramIds: {
    type: Array,
    default: [16566]
  },
  paramTitles: {
    type: Array,
    default: ['瞬时总有功功率']
  },
  colors: {
    type: Array,
    default: ['#e74c3c', '#f39c12', '#2ed573', '#e056fd','#833471']
  },
  color: {
    type:String,
    default:"#FFFFFF"
  },
  color1:{
    type:String,
    default:"#fff2"
  },
  param: {
    type: String,
    default: "paramLast"
  }

});

let chart = null;
const chartRef = ref(null);

let option = {

  color: props.colors,

  tooltip: {
    trigger: 'axis',
    // formatter: (data) => {
    //   // console.debug("list",list);
    //   // console.debug("data",data);
    //   let item = list[data[0].dataIndex];
    //   // console.debug("item",item);

    //   // return `
    //   //   电流:${item.dataJson?.电流真有效值?.toFixed(2)}A ${data[0].value}<br/>
    //   //   电压:${item.dataJson?.电压真有效值?.toFixed(2)}V ${data[1].value}
    //   // `;

    //   return `
    //     电流: <b>${item.dataJson?.电流真有效值?.toFixed(2)}A</b><br/>
    //     电压: <b>${item.dataJson?.电压真有效值?.toFixed(2)}V</b>
    //   `;
    // }
  },
  legend: {
    data: [],
    y: 'top',
    textStyle: {
      color: props.color
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLine: {
      lineStyle: {
        color: props.color,
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: props.color,
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: props.color1,
      }

    }
  },
  series: [
  ]
};

const reloadData = () => {
  ajax.post("/awl/device-data/count", {
    endTime: new Date().format("yyyy-MM-dd HH:mm"),
    per: props.per,
    num: props.num,
    params: props.paramIds
  }).then(r => {
    if (r.data.ok) {
      option.legend.data = props.paramTitles;
      let list = r.data.data.list;
      let param = r.data.data.param;
      option.series = [];
      for (let title of props.paramTitles) {
        option.series.push({
          name: title,
          data: [],
          type: "line",
          smooth: true,
        });
      }
      option.xAxis.data = [];
      for (let item of list) {
        if (item.paramId == props.paramIds[0]) {
          option.xAxis.data.push(item.d);
        }
        let i = 0;
        for (; i < props.paramIds.length; i++) {
          if (props.paramIds[i] == item.paramId) {
            break;
          }
        }
        option.series[i].data.push(item[props.param]?.toFixed(2) || 0);
      }
      chart.setOption(option);
    }
  });
}

const timer = (event) => {
  if (event.detail.count % 10 != 0) {
    return;
  }
  reloadData();
}

onMounted(() => {
  chart = echarts.init(chartRef.value);
  chart.setOption(option);
  reloadData();
  window.addEventListener("timer", timer);
  window.addEventListener("resize",()=>{
    chart.resize();
  });
});

onUnmounted(() => {
  window.removeEventListener("timer", timer);
});

</script>
<style scoped>

</style>