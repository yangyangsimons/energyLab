<template>
  <div class="root">
    <div>
      <LocationInformation></LocationInformation>湖南工商大学
    </div>
    <div><img :src="'assets/imgs/weather/a_' + w[9]" /> {{ w[6]?.split(" ")[1] }} {{ w[5] }}</div>
    <div><a class="w-link" target="_admin" href="../login.html">管理后台</a></div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import ajax from "../api/ajax"

const w = ref([]);
const loadWeather = () => {
  ajax.get("/sys/weather/长沙", { showError: false }).then(r => {
    if (r.data.ok) {
      w.value = r.data.data;
      w.value[9] = w.value[9] || "nothing.gif";
      w.value[6] = w.value[6] || " 未知的天气情况";
    } else {
      w.value[9] = "nothing.gif";
      w.value[5] = "";
      w.value[6] = " 未知的天气情况";
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
  w.value[5] = "";
  w.value[6] = " 未知的天气情况";
  loadWeather();
  window.addEventListener("timer", doLoadWeather);
});
onUnmounted(() => {
  window.removeEventListener("timer", doLoadWeather);
});

</script>
<style scoped>
.root {
  width: 38rem;
  font-size: 1.3rem;
  line-height: 2;
  text-shadow: 0 0 .2em #000;
  color: var(--c-white);
  display: grid;
  grid-template-columns: 3fr 4fr 2fr;
}

.root>div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem;
}

.root img,
.root svg {
  display: block;
  height: 2em;
  margin-right: .3em;
}

.w-link {
  cursor: pointer;
  transition: color .3s;
}

.w-link:hover {
  color: var(--c-3);
}
</style>