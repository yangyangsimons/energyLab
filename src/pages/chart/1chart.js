import * as echarts from 'echarts';
import ajax from "@/api/ajax";

let props = {
  colors: ["#83eb97","#83a3eb","#ee8fbe","#83ebe5","#ebaa83","#ebe583","#be83eb","#83ebc3","#83c3eb","#eb8383"],//图形颜色
  color: "#333",//文字颜色
  color1: "#ddd",//间隔线颜色
  num: [24, 30, 12, 5],//小时,日,月,年统计数量
  api: ['count-hour', 'count-day', 'count-month', 'count-year'],
};

const base = "/awl/device-config-data/";

let option = {
  backgroundColor:"#FFF",
  color: props.colors,
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'slider',
      xAxisIndex: [0],
      filterMode: 'empty',
      start: 0,
      end: 100
    },
    {
      id: 'dataZoomY',
      type: 'slider',
      yAxisIndex: [0],
      filterMode: 'empty',
      start: 0,
      end: 100
    }
  ],
  tooltip: {
    trigger: 'axis',
  },
  toolbox: {
    show: false,
    feature: {
      saveAsImage: {
        show: true,
        title:'另存为',
        name:'能耗环比数据报表',
        excludeComponents:['toolbox','dataZoom'],
        pixelRatio:5,
        type:'png',
        backgroundColor:'#FFF'
      }
    },
    right:10
  },
  legend: {
    data: [],
    y: 'top',
    textStyle: {
      color: props.color
    }
  },
  grid: {
    left: '10px',
    right: '60px',
    bottom: '60px',
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

let data = {
  deviceTypeId: 1,
  gap: 0,
  selectDevices: [],
  devices: [],
}

let devices = [];


//初始化图形参数
let initData = (endTime) => {
  //设置图例
  devices = data.devices.filter(item => data.selectDevices.includes(item.deviceId));
  option.legend.data = devices.map(item => item.deviceName);

  //设置X坐标名称
  let names = [];
  let time = endTime.toDate("yyyy-MM-dd HH:mm");
  for (let i = 0; i < props.num[data.gap]; i++) {
    if (data.gap == 0) {
      names.unshift(time.format("HH") + "时");
      time.setHours(time.getHours() - 1);
    } else if (data.gap == 1) {
      names.unshift(time.format("MM/dd"));
      time.setDate(time.getDate() - 1);
    } else if (data.gap == 2) {
      names.unshift(time.format("MM") + "月");
      time.setMonth(time.getMonth() - 1);
    } else if (data.gap == 3) {
      names.unshift(time.format("yyyy") + "年");
      time.setFullYear(time.getFullYear() - 1);
    }
  }
  option.xAxis.data = names;

  //初始化Y轴数据
  option.series = [];
  for (let item of devices) {
    option.series.push({
      deviceId: item.deviceId,
      name: item.deviceName,
      data: names.map(a => 0),
      type: "line",
      yAxisIndex: 0,
      smooth: true,
    });
  }



  console.debug("改变后的初始化图形参数", option);
}

let chart = null;

let resetOption = JSON.stringify(option);

/**
 * echart 初始化
 * @param {*} data 
 * @param {*} ele 
 */
export const chartInit = async (ele) => {
  chart = echarts.init(ele);
  chart.setOption(option);
  return Promise.resolve(chart);
}




let map = new Map();
/**
 * echart发生改变
 * @param {*} arg - 数据
 */
export const chartChange = async (arg) => {
  data = { ...arg };
  option = JSON.parse(resetOption);
  chart.setOption(option);
  chart.clear();
  console.debug("改变", data);
  if (data.selectDevices.length==0) {
    console.debug("没有任何设备");
    return;
  }

  let endTime = data.endTime;
  // endTime = '2023-04-14 10:00';
  initData(endTime);
  chart.setOption(option);


  let r = await ajax.post(base + props.api[data.gap], {
    ids: data.selectDevices,
    num: props.num[data.gap] + 0,
    endTime
  });
  map = new Map();
  for(let item of devices){
    map[item.deviceId] = new Map();
  }
  for (let item of r.data.data) {
    if (!map[item.deviceId]) {
      map[item.deviceId] = new Map();
    }
    map[item.deviceId][item.i] = item.dataValue;
  }
  console.debug("map", map);
  for (let item of option.series) {
    let arr = item.data;
    let data = map[item.deviceId];
    console.debug("data", data);
    for (let i = 0; i < arr.length; i++) {
      let a = data[i];
      // let b = data[i + 1];
      // if (a && b) {
      //   arr[i] = (b - a).toFixed(2);
      // } else {
      //   arr[i] = 0;
      // }
      arr[i]=a || 0;
    }


    chart.setOption(option);
  }



}