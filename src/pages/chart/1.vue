<template>
  <div class="root">
    <div class="tabs" v-if="false">
      <div v-for="(item, index) in store.deviceConfig.names" :key="index"
        :class="{ 'active': index == data.deviceTypeId }" @click.stop.prevent="data.deviceTypeId = index;">{{ item }}
      </div>
    </div>
    <div class="w-frame">
      <div style="text-align: center; font-size:2rem; line-height: 2; font-weight: bold; color:#333;">
        <!-- {{ store.deviceConfig.names[data.deviceTypeId ] }} -->
        能耗环比数据报表
      </div>
      <div style="height: 50vh;width:100%;padding: .5rem 0;">
        <div ref="chartRef" style="width: 100%; height: 100%;  font-size: 2rem; text-shadow: none;"></div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        <el-radio-group v-model="data.gap">
          <el-radio-button :label="0">小时</el-radio-button>
          <el-radio-button :label="1">天</el-radio-button>
          <el-radio-button :label="2">月</el-radio-button>
          <el-radio-button :label="3">年</el-radio-button>
        </el-radio-group>

        <el-date-picker style="width:12em; margin-left: 5rem;"
        v-model="data.endTime"
        :type="search.dateType[data.gap]"
        :format="search.dateFormat[data.gap]"
        value-format="YYYY-MM-DD HH:00"
        :clearable="false"
        :disabled-date="disabledDate"
        :editable="false"
        />
        
        <el-button-group style="margin-left: 5rem;">
          <el-button type="default" @click="saveCharts('pdf',proxy.$refs.chartRef,'能耗环比数据报表');">pdf</el-button>
          <el-button type="default" @click="saveCharts('png',proxy.$refs.chartRef,'能耗环比数据报表');">png</el-button>
          <el-button type="default" @click="saveCharts('jpeg',proxy.$refs.chartRef,'能耗环比数据报表');">jpg</el-button>
        </el-button-group>
      </div>
      <div style=" width: 100%; padding: 0 1rem .5rem;">
        <el-checkbox v-model="data.checkAll" :indeterminate="data.isIndeterminate"
          @change="deviceChageAll">全选</el-checkbox>
        <el-checkbox-group v-model="data.selectDevices" @change="devicesChange">
          <el-checkbox style="margin-bottom: .5rem;" border v-for="item in data.devices" :key="item.deviceId"
            :label="item.deviceId">{{ item.deviceName
            }}</el-checkbox>
        </el-checkbox-group>
      </div>


    </div>

  </div>
</template>
<script setup>
import {saveCharts} from './saveCharts';
import * as echarts from 'echarts';
import { onMounted, onUnmounted, reactive, ref, watch, getCurrentInstance, toRaw } from "vue";
import ajax from "@/api/ajax";
import { AwlStore } from '@/store';

const store = AwlStore();
const { proxy } = getCurrentInstance();

const data = reactive({
  deviceTypeId: 1,
  gap: 0,
  endTime:new Date().format('yyyy-MM-dd HH:00'),
  selectDevices: [],
  devices: [],
  checkAll: false,
  isIndeterminate: true,
});

//获取设备列表
const loadDevices = async () => {
  let r = await ajax.get("/awl/device-config/types-" + data.deviceTypeId,);
  console.debug("获取设备列表", r);
  data.devices = r.data.data;
  data.selectDevices = [];
  for (let i = 0; i < 3 && i < data.devices.length; i++) {
    data.selectDevices.push(data.devices[i].deviceId);
  }
}
onMounted(loadDevices);
watch(() => data.deviceTypeId, loadDevices);

//选择设备事件处理
const deviceChageAll = () => {
  data.isIndeterminate = false;
  data.selectDevices = [];
  if (data.checkAll) {
    data.selectDevices = data.devices.map(item => item.deviceId);
  }
}
const devicesChange = () => {
  data.isIndeterminate = data.selectDevices.length > 0 && data.selectDevices.length < data.devices.length;
}

//处理echart初始化和图片改变
const isChange = ref(false);
watch(data, () => {
  isChange.value = true;
});
// import { chartInit, chartChange } from './1chart';
const chart1 = import.meta.globEager('./1chart.js');
const { chartInit, chartChange } = chart1['./1chart.js'];
const changeChart = () => {
  if (isChange.value) {
    isChange.value = false;

    chartChange(toRaw(data));

  }
}
onMounted(async () => {
  let chart = await chartInit(proxy.$refs.chartRef);
  window.addEventListener("resize", () => {
    chart.resize();
  });
  window.addEventListener("timer", changeChart);
});
onUnmounted(() => {
  window.removeEventListener("timer", changeChart);
});


let routeQueryChange = ()=>{
  if(proxy.$route.query.deviceTypeId){
    data.deviceTypeId=proxy.$route.query.deviceTypeId;
    isChange.value = true;
  }
  if(proxy.$route.query.gap){
    data.gap=proxy.$route.query.gap;
    isChange.value = true;
  }
}
onMounted(routeQueryChange);
watch(()=>proxy.$route.query,routeQueryChange);




const search = reactive({
  dateType:['datetime','date','month','year'],
  dateFormat:['YYYY-MM-DD HH:mm','YYYY-MM-DD','YYYY年MM月','YYYY年']
});

const disabledDate = (d)=>{
  return d.getTime() > Date.now();
}
watch(()=>data.gap,()=>{
    data.endTime = new Date().format('yyyy-MM-dd HH:00')
});

</script>
<style scoped lang="scss">
.root {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  background-color: #f2f2f2;
  padding: 10px;

  .tabs {
    display: flex;

    &>div {
      position: relative;
      top: 1px;
      padding: 5px 20px;
      margin: 0 1px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border: solid 1px #d2d2d2;
      font-size: 1.3em;
      cursor: pointer;
      color: #999;
      translate: 1s all;

      &:first-child {
        margin-left: 10px;
      }

      &:hover,
      &:active,
      &.active {
        background-color: #FFF;
        color: #000;
      }

      &.active {
        border-bottom-color: #FFF;
      }
    }
  }


  .w-frame {
    box-sizing: border-box;
    border: solid 1px #d2d2d2;
    background-color: #FFF;
    min-height: 5em;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
}
</style>
