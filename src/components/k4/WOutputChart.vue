<template>
  <div class="root w-abs">
    <dv-border-box-12 style="backdrop-filter: blur(5px);">
      <div class="w-dv-content">
        <div class="w-dv-title">
          <slot>未知标题</slot>
        </div>
        <div>
          <div ref="chartRef"
            style="width: 100%; height: 100%; font-size: 2rem; text-shadow: none; padding-bottom: 1rem;"></div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import ajax from "@/api/ajax"


const data = reactive({
  waters: [210, 190, 20, 30, 100],
  eles: [150, 290, 120, 130, 200],
  names: ['10:00', '11:00', '12:00', '13:00', '14:00'],
  items: ["水资源消耗", "电能消耗"]
});

let chart = null;
const chartRef = ref(null);


let option = {
  color: ["#d3f4f4", "#e28269"],

  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontSize: 20,
    },
    formatter: (d) => {
      return `<b>${d[0].axisValue}</b><br>${data.items[0]}:${d[0].value.toFixed(2)}<br>${data.items[1]}:${d[1].value.toFixed(2)}`;
    }
  },
  legend: {
    data: data.items,
    y: 'bottom',
    textStyle: {
      color: "#fff",
      fontSize: '2.6rem',
    }
  },
  grid: {
    top: '3%',
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLine: {
      lineStyle: {
        color: "#4484bd",
      }
    },
    axisLabel: {
      textStyle: {
        fontSize: "20",
      },
    },
  },
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: "#4484bd",

      },
    },
    axisLabel: {
      textStyle: {
        fontSize: "20",
      },
    },
  },
  ],
  series: [
    {
      name: data.items[0],
      data: [],
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      areaStyle: {},
    }, {
      name: data.items[1],
      data: [],
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      areaStyle: {},
    }
  ]
};

let reloadChart = () => {
  option.xAxis.data = data.names;
  option.series[0].data = data.waters;
  option.series[1].data = data.eles;

  chart.setOption(option);
}

onMounted(() => {
  chart = echarts.init(chartRef.value);
  reloadChart();
});

watch(data, reloadChart);

const num = 6;

const timer = () => {

  let d = new Date();
  d.setHours(d.getHours() + 2 - num);
  let names = [];
  let waters = [];
  let eles = [];
  for (let i = 1; i < num; i++) {
    d.setHours(d.getHours() + 1);
    names.push(d.format("HH:00"));
    waters.push(0);
    eles.push(0);
  }


  ajax.post("/awl/device-config-data/count", { per: 60, num: num, endTime: d.format("yyyy-MM-dd HH:00") }).then(r => {
    if (!r.data.ok) {
      return;
    }
    data.names = names;
    let map = new Map();
    r.data.data.forEach(item => {
      map[item.i + ":" + item.deviceTypeId] = item.dataValue;
    });
    // console.debug(map);
    for (let i = 0; i < num - 1; i++) {
      if (map[`${i}:0`] && map[`${i + 1}:0`]) {
        waters[i] = map[`${i + 1}:0`] - map[`${i}:0`]
      }
      if (map[`${i}:1`] && map[`${i + 1}:1`]) {
        eles[i] = map[`${i + 1}:1`] - map[`${i}:1`]
      }
    }

    data.names = names;
    data.waters = waters;
    data.eles = eles;

  });
}
onMounted(() => {
  timer();
  window.addEventListener("timer5", timer);
});

onUnmounted(() => {
  window.removeEventListener("timer5", timer);
});

</script>
<style scoped>
.root {
  left: 287.6rem;
  top: 95.4rem;
  width: 84.4rem;
  height: 56.6rem;
  color: #1160b5;
}
</style>