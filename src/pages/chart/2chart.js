import * as echarts from 'echarts';
import ajax from "@/api/ajax";

let props = {
  colors: ["#83eb97", "#83a3eb", "#ee8fbe", "#83ebe5", "#ebaa83", "#ebe583", "#be83eb", "#83ebc3", "#83c3eb", "#eb8383"],//图形颜色
  color: "#333",//文字颜色
  color1: "#ddd",//间隔线颜色
  num: [10, 8, 5],//小时,日,月,年统计数量
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
        name:'能耗同比数据报表',
        excludeComponents:['toolbox','dataZoom'],
        pixelRatio:5,
        type:'png',
        backgroundColor:'#FFF'
      }
    },
    right:10
  },
  grid: {
    left: '10px',
    right: '60px',
    bottom: '60px',
    containLabel: true
  },
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['', ''],
      ['', 0]
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
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
  devices = data.devices.filter(item => data.selectDevices.includes(item.deviceId));
  let ds = [];
  option.dataset.source = ds;
  option.series = devices.map(item => { return { type: 'bar' } });
  let d = endTime.toDate("yyyy-MM-dd HH:mm");
  for (let i = 0; i < props.num[data.gap]; i++) {
    if (data.gap == 0) {
      let name = d.format("MM月dd日HH时");
      ds.unshift([name, ...devices.map(item => 0)])
      d.setDate(d.getDate() - 1);
    } else if (data.gap == 1) {
      let name = d.format("MM月dd日");
      ds.unshift([name, ...devices.map(item => 0)])
      d.setMonth(d.getMonth() - 1);
    } else if (data.gap == 2) {
      let name = d.format("yyyy年MM月");
      ds.unshift([name, ...devices.map(item => 0)])
      d.setFullYear(d.getFullYear() - 1);
    }
  }
  ds.unshift(["", ...devices.map(item => item.deviceName)])


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

  let r = await ajax.post(base + props.api[data.gap] + "1", {
    ids: data.selectDevices,
    num: props.num[data.gap] + 0,
    endTime
  });

  map = new Map();
  for (let item of devices) {
    map[item.deviceId] = new Map();
  }
  for (let item of r.data.data) {
    if (!map[item.deviceId]) {
      map[item.deviceId] = new Map();
    }
    map[item.deviceId][item.i] = item.dataValue;
  }
  console.debug("map", map);
  for (let index = 1; index < option.dataset.source.length; index++) {
    let arr = option.dataset.source[index];
    for (let j = 0; j < devices.length; j++) {
      arr[j + 1] = map[devices[j].deviceId][index - 1] || 0;
    }
  }
  // console.debug(JSON.stringify(option, null, "   "))
  chart.setOption(option);
}