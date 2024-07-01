<template>
  <div class="desc">
    <div>

      <template v-for="item in awl.getDevice(7)?.items" :key="item.address">
        <div>{{ item.description }}</div>
        <div>{{ awl.params[item.address]?.toFixed(2) || 0 }} {{ item.unit }}</div>
      </template>
    </div>
    <div>

      <template v-for="item in awl.getDevice(8)?.items" :key="item.address">
        <div>{{ item.description }}</div>
        <div>{{ awl.params[item.address]?.toFixed(2) || 0 }} {{ item.unit }}</div>
      </template>
    </div>
  </div>

  <div class="w-tabs">
    <div :class="{ 'active': tabIndex == 0 }" @click="tabIndex = 0;">机侧</div>
    <div :class="{ 'active': tabIndex == 1 }" @click="tabIndex = 1;">网测</div>
  </div>
  <div style="width: 100%; height: 29rem; display: flex; justify-content: center; align-items: center;">
      <w-ls-count v-if="tabIndex == 0" :per="5" :num="15" :param-titles="['直流功率']" :param-ids="[16554]" height="28rem"
        ></w-ls-count>
      <w-ls-count v-if="tabIndex == 1" :per="5" :num="15" :param-titles="['当前功率']" :param-ids="[16570]" height="28rem"
        ></w-ls-count>
  </div>
</template>
<script setup>
import WLsCount from '@/components/energylab/WLsCount.vue';
import { AwlStore } from '@/store';
import { ref } from 'vue';
const awl = AwlStore();

const tabIndex = ref(0);

</script>
<style scoped>
.desc {
  display: flex;
  width: 100%;
  height: 32rem;
  justify-content: center;
  align-items: flex-start;
}

.desc>div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 42%;
  border: 1px solid #FFF4;
  border-width: 1px 0 0 1px;
  margin: 20px 30px;
  position: relative;
  overflow: visible;
  --c: #777;
}

.desc>div::before {
  content: "";
  position: absolute;
  z-index: 1;
  top: -15px;
  left: -10px;
  width: calc(100% + 20px);
  height: 31rem;
  border: solid 1px var(--c);
  box-sizing: border-box;
  border-radius: 5px;
}

.desc>div::after {
  content: "机 侧";
  position: absolute;
  z-index: 1;
  top: -25px;
  left: 20px;
  width: 6em;
  height: 20px;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  border-radius: 20px;
  background-color: var(--c);
  text-shadow: 0 0 4px #000a;
}

.desc>div:nth-child(2):after {
  content: "网 侧";
}


.desc>div>div {
  border: 1px solid #FFF4;
  border-width: 0 1px 1px 0;
  padding: 6px 10px;
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

.w-tabs {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  height: 3em;
  --c: #FFF5;
}

.w-tabs::before,
.w-tabs::after {
  content: "";
  height: 3em;
  flex: 1;
  border-bottom: solid 1px var(--c);
  box-sizing: border-box;
}

.w-tabs>div {
  border: solid 1px var(--c);
  background-color: var(--c);
  padding: 0 10px 0 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  letter-spacing: 5px;
  font-size: 1rem;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-shadow: 0 0 4px #000a;
  margin-left: .5em;
  position: relative;
  overflow: visible;
  transition: all .5s;
}

.w-tabs>div::before {
  content: "";
  position: absolute;
  left: calc(-.5em - 1px);
  top: -1px;
  width: .5em;
  height: 3em;
  border-bottom: solid 1px var(--c);
  box-sizing: border-box;
}

.w-tabs>div.active {
  background-color: #0000;
  border-bottom-color: #0000;
}
</style>
