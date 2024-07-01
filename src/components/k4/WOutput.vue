<template>
  <div class="root w-abs">
    <dv-border-box-12 style="backdrop-filter: blur(5px);">
      <div class="w-dv-content">
        <div class="w-dv-title"><slot></slot></div>
        <div class="w-2">
          <div title="水量" v-if="data.water>10000">
            {{ (data.water/10000).toFixed(2) }}<span>万吨</span></div>
          <div title="水量" v-else>{{ data.water.toFixed(0) }}<span>吨</span></div>
          <div title="电量" v-if="data.ele>10000">{{ (data.ele/10000).toFixed(2) }}<span>万度</span></div>
          <div title="电量" v-else>{{ data.ele.toFixed(0) }}<span>度</span></div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script setup>
import { onMounted,onUnmounted, reactive, ref } from "vue";
import ajax from "@/api/ajax"
let base = "/awl/device-config/";

const data = reactive({
  water:12315,
  ele:9887,
  list:[]
});


const loadData = () => {
  ajax.get(base + 'sumTypes').then(r => {
    if (r.data.ok) {
      r.data.data.forEach(e => {
        data.list[e.id]=e.num;
      });
      data.water=data.list[0];
      data.ele=data.list[1];
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
  left:287.6rem;
  top:156.9rem;
  width: 84.4rem;
  height: 39.7rem; 
  color: #1160b5;
}
.w-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}
.w-2>div {
  background-image: url(@/assets/imgs/k4/water@3x.png);
  background-size: auto 17rem;
  background-position: 1rem center;
  color:#cddff9;
  font-weight: bold;
  font-size: 5rem;
  padding-top:9rem ;
  padding-left: 20rem;
  position: relative;
}
.w-2>div>span{
  font-weight: normal;
  font-size: 2.5rem;
  margin-left: .5rem;
}
.w-2>div::before {
  content: attr(title);
  position: absolute;
  font-weight: normal;
  font-size: 2.5rem;
  margin-left: .5rem;
  left:20rem;
  top:16rem;

}
.w-2>div:nth-child(2){
  background-image: url(@/assets/imgs/k4/ele@3x.png);
}

</style>