<template>
  <div class="root w-abs">
    <div>
      <LocationInformation></LocationInformation>湖南 • 长沙
    </div>
    <div><img :src="'assets/imgs/weather/a_' + w[9]" />  {{ w[5] }}</div>

  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import ajax from "@/api/ajax"

const w = ref([]);
const loadWeather = () => {
  ajax.get("/sys/weather/长沙", { showError: false }).then(r => {
    if (r.data.ok) {
      w.value = r.data.data;
    } else {
      w.value[9] = "nothing.gif";
      w.value[5] = "未知的天气情况";
      w.value[6] = " ";
    }
  });
}

const doLoadWeather = (event) => {
  //每60个时间周期(1分钟)读取远程数据
  if (event.detail.count % 60 == 0) {
    loadWeather();
  }
}

onMounted(() => {
  w.value[9] = "nothing.gif";
  w.value[5] = "未知的天气情况";
  w.value[6] = " ";
  loadWeather();
  window.addEventListener("timer", doLoadWeather);
});
onUnmounted(() => {
  window.removeEventListener("timer", doLoadWeather);
});

</script>
<style scoped>
.root {
  left:30em;
  height: 6.6em; 
  width: 30em;
  color: #7bcbef;
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.root>div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem;
  font-size: 1.5em;
}

.root img,
.root svg {
  display: block;
  height: 2em;
  margin-right: .3em;
  color: #FFF;
}

</style>