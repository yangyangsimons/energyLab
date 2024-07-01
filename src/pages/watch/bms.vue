<template>
  <div class="desc">
    <div>
      <div>总电压</div>
      <div>{{ awl.params["16482"]?.toFixed(2)||0 }} V</div>
      <div>总电流</div>
      <div>{{ awl.params["16483"]?.toFixed(2)||0 }} A</div>
      <div>单体最高电压</div>
      <div>{{ awl.params["16486"]?.toFixed(2)||0 }} V</div>
      <div>单体最低电压</div>
      <div>{{ awl.params["16487"]?.toFixed(2)||0 }} V</div>
      <div>SOC</div>
      <div>{{ awl.params["16484"]?.toFixed(2)||0 }} ℃</div>
      <div>SOH</div>
      <div>{{ awl.params["16485"]?.toFixed(2)||0 }} ℃</div>
      <div>系统温度</div>
      <div>{{ awl.params["16447"]?.toFixed(2)||0 }} ℃</div>
      <div></div>
      <div></div>
    </div>
  </div>

  <div style="width: 100%; height: 35rem; display: flex; justify-content: center; align-items: center;">
      <w-ls-count :param-titles="['SOC']" :param-ids="[16484]"></w-ls-count>
    </div>
</template>
<script setup>
import WLsCount from '@/components/energylab/WLsCount.vue';
import { AwlStore } from '@/store';
const awl = AwlStore();
</script>
<style scoped>
.desc {
  display: flex;
  width: 100%;
  height: 32rem;
  justify-content: center;
  align-items: center;
}
.desc>div {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  width: 90%;
  border: 1px solid #FFF4;
  border-width: 1px 0 0 1px;
}
.desc>div>div {
  border: 1px solid #FFF4;
  border-width:  0 1px 1px 0;
  padding:6px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.desc>div>div:nth-child(2n+1) {
  justify-content: flex-end;
}
.desc>div>div:nth-child(2n+1):not(:empty)::after {
  content: ":";
  margin-left: 5px;
}
</style>
