<template>
  <div class="root w-abs">
    <dv-border-box-12 style="backdrop-filter: blur(5px);">
      <div class="w-dv-content">
        <div class="w-dv-title">
          <slot>未知标题</slot>
        </div>
        <div class="w-list">
          <div>
            <div>设备总数</div>
            <div>{{ Number(data.online) + Number(data.offline) }}</div>
          </div>
          <div>
            <div>设备在线数</div>
            <div>{{ data.online }}</div>
          </div>
          <div>
            <div>设备离线数</div>
            <div>{{ data.offline }}</div>
          </div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import ajax from "@/api/ajax"

let base = "/awl/device-config/"

const data = ref({ online: 0, offline: 0 });


const loadData = () => {
  ajax.get(base + 'online').then(r => {
    if (r.data.ok) {
      data.value = r.data.data;
    }
  });
}

const timer = (event) => {
  if (event.detail.count % 17 != 0) {
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
  left: 6.2em;
  top: 15.1em;
  width: 42.2em;
  height: 29.1em;
  color: #1160b5;
}

.w-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 0 7rem;
}

.w-list>div {
  background-image: url(@/assets/imgs/k4/bg_total@3x.png);
  background-position: left center;
  background-size: auto 9rem;
  width: 60rem;
  height: 9rem;
  color: #7bcbef;
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 9rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.w-list>div>:first-child {
  font-weight: normal;
  text-indent: 13.4rem;
  color: #bccdea;
  letter-spacing: .3rem;
}

.w-list>div:nth-child(2) {
  background-image: url(@/assets/imgs/k4/bg_line@3x.png);
  color: #13d18f;
}

.w-list>div:nth-child(3) {
  background-image: url(@/assets/imgs/k4/bg_offline@3x.png);
  color: #cd1d2f;
}
</style>