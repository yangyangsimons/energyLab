<template>
  <div class="desc">
    <div>
      
      <template v-for="item in awl.getDevice(5)?.items" :key="item.address">
        <div>{{item.description  }}</div>
        <div>{{ awl.params[item.address]?.toFixed(2) || 0 }} {{ item.unit }}</div>
      </template>
    </div>
  </div>

  <div style="width: 100%; height: 35rem; display: flex; justify-content: center; align-items: center;">
    <w-ls-count :param-titles="['Pa', 'Pb', 'Pc']" :param-ids="[16508, 16509, 16510]" ></w-ls-count>
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
  grid-template-columns: repeat(6, 1fr);
  width: 90%;
  border: 1px solid #FFF4;
  border-width: 1px 0 0 1px;
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
</style>
