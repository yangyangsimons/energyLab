<template>
  <div class="os">
    <el-link type="danger" :underline="false" @click="shutdownOs" style="margin-right: 4em;">关闭所有电脑</el-link>
    <el-link type="success" :underline="false" @click="rebootOs">重启所有电脑</el-link>
  </div>
  <div class="opens">
    <w-bg1></w-bg1>
    <div class="btns">

      <div v-if="false" @click="doOpen(1)"
        :style="{ '--color': awlStore.opens[0] ? 'var(--open-color)' : 'var(--close-color)' }">
        <i>
          <svg t="1674974472156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2658" width="200" height="200">
            <path
              d="M512 512c-35.4 0-64-28.6-64-64L448 128c0-35.4 28.6-64 64-64s64 28.6 64 64l0 320C576 483.4 547.4 512 512 512z"
              p-id="2659" fill="#ffffff"></path>
            <path
              d="M758 137.6 758 137.6c-10-6-21.6-9.6-34-9.6-35.4 0-64 28.6-64 64 0 12.4 3.6 24 9.6 33.8 4 6.4 9.2 12.2 15.2 16.8 2.4 1.8 4.8 3.4 7.4 5 16.2 11.2 31.6 23.8 46 38.2C798.8 346.2 832 426.6 832 512c0 85.4-33.2 165.8-93.8 226.2C677.8 798.8 597.4 832 512 832c-85.4 0-165.8-33.2-226.2-93.8C225.2 677.8 192 597.4 192 512c0-85.4 33.2-165.8 93.8-226.2 14.2-14.2 29.6-27 45.8-38 2.8-1.6 5.2-3.2 7.8-5.2 6-4.6 11-10.2 15-16.6 6.2-9.8 9.6-21.4 9.6-33.8 0-35.4-28.6-64-64-64-12.4 0-24 3.6-33.8 9.6l-0.2-0.2C144.4 217.6 64 355.4 64 512c0 247.4 200.6 448 448 448 247.4 0 448-200.6 448-448C960 355.4 879.6 217.6 758 137.6z"
              p-id="2660" fill="#ffffff"></path>
          </svg>
        </i>
        <div>图标灯光</div>
      </div>

      <div @click="doOpen(2)" :style="{ '--color': awlStore.opens[1] ? 'var(--open-color)' : 'var(--close-color)' }">
        <i>
          <svg t="1674974472156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2658" width="200" height="200">
            <path
              d="M512 512c-35.4 0-64-28.6-64-64L448 128c0-35.4 28.6-64 64-64s64 28.6 64 64l0 320C576 483.4 547.4 512 512 512z"
              p-id="2659" fill="#ffffff"></path>
            <path
              d="M758 137.6 758 137.6c-10-6-21.6-9.6-34-9.6-35.4 0-64 28.6-64 64 0 12.4 3.6 24 9.6 33.8 4 6.4 9.2 12.2 15.2 16.8 2.4 1.8 4.8 3.4 7.4 5 16.2 11.2 31.6 23.8 46 38.2C798.8 346.2 832 426.6 832 512c0 85.4-33.2 165.8-93.8 226.2C677.8 798.8 597.4 832 512 832c-85.4 0-165.8-33.2-226.2-93.8C225.2 677.8 192 597.4 192 512c0-85.4 33.2-165.8 93.8-226.2 14.2-14.2 29.6-27 45.8-38 2.8-1.6 5.2-3.2 7.8-5.2 6-4.6 11-10.2 15-16.6 6.2-9.8 9.6-21.4 9.6-33.8 0-35.4-28.6-64-64-64-12.4 0-24 3.6-33.8 9.6l-0.2-0.2C144.4 217.6 64 355.4 64 512c0 247.4 200.6 448 448 448 247.4 0 448-200.6 448-448C960 355.4 879.6 217.6 758 137.6z"
              p-id="2660" fill="#ffffff"></path>
          </svg>
        </i>
        <div>风电机组</div>
      </div>

      <div @click="doOpen(3)" :style="{ '--color': awlStore.opens[2] ? 'var(--open-color)' : 'var(--close-color)' }">
        <i>
          <svg t="1674974472156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2658" width="200" height="200">
            <path
              d="M512 512c-35.4 0-64-28.6-64-64L448 128c0-35.4 28.6-64 64-64s64 28.6 64 64l0 320C576 483.4 547.4 512 512 512z"
              p-id="2659" fill="#ffffff"></path>
            <path
              d="M758 137.6 758 137.6c-10-6-21.6-9.6-34-9.6-35.4 0-64 28.6-64 64 0 12.4 3.6 24 9.6 33.8 4 6.4 9.2 12.2 15.2 16.8 2.4 1.8 4.8 3.4 7.4 5 16.2 11.2 31.6 23.8 46 38.2C798.8 346.2 832 426.6 832 512c0 85.4-33.2 165.8-93.8 226.2C677.8 798.8 597.4 832 512 832c-85.4 0-165.8-33.2-226.2-93.8C225.2 677.8 192 597.4 192 512c0-85.4 33.2-165.8 93.8-226.2 14.2-14.2 29.6-27 45.8-38 2.8-1.6 5.2-3.2 7.8-5.2 6-4.6 11-10.2 15-16.6 6.2-9.8 9.6-21.4 9.6-33.8 0-35.4-28.6-64-64-64-12.4 0-24 3.6-33.8 9.6l-0.2-0.2C144.4 217.6 64 355.4 64 512c0 247.4 200.6 448 448 448 247.4 0 448-200.6 448-448C960 355.4 879.6 217.6 758 137.6z"
              p-id="2660" fill="#ffffff"></path>
          </svg>
        </i>
        <div>并网接入</div>
      </div>

      <div @click="doOpen(4)" :style="{ '--color': awlStore.opens[3] ? 'var(--open-color)' : 'var(--close-color)' }">
        <i>
          <svg t="1674974472156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2658" width="200" height="200">
            <path
              d="M512 512c-35.4 0-64-28.6-64-64L448 128c0-35.4 28.6-64 64-64s64 28.6 64 64l0 320C576 483.4 547.4 512 512 512z"
              p-id="2659" fill="#ffffff"></path>
            <path
              d="M758 137.6 758 137.6c-10-6-21.6-9.6-34-9.6-35.4 0-64 28.6-64 64 0 12.4 3.6 24 9.6 33.8 4 6.4 9.2 12.2 15.2 16.8 2.4 1.8 4.8 3.4 7.4 5 16.2 11.2 31.6 23.8 46 38.2C798.8 346.2 832 426.6 832 512c0 85.4-33.2 165.8-93.8 226.2C677.8 798.8 597.4 832 512 832c-85.4 0-165.8-33.2-226.2-93.8C225.2 677.8 192 597.4 192 512c0-85.4 33.2-165.8 93.8-226.2 14.2-14.2 29.6-27 45.8-38 2.8-1.6 5.2-3.2 7.8-5.2 6-4.6 11-10.2 15-16.6 6.2-9.8 9.6-21.4 9.6-33.8 0-35.4-28.6-64-64-64-12.4 0-24 3.6-33.8 9.6l-0.2-0.2C144.4 217.6 64 355.4 64 512c0 247.4 200.6 448 448 448 247.4 0 448-200.6 448-448C960 355.4 879.6 217.6 758 137.6z"
              p-id="2660" fill="#ffffff"></path>
          </svg>
        </i>
        <div>储能控制</div>
      </div>

    </div>
  </div>
</template>
<script setup>
import WBg1 from '@/components/bg/WBg1.vue';

import { AwlStore } from '@/store';
import { doOpen, doSet } from '@/api/OpensApi';

import { sendAll } from '@/WebSocketDevice';
import { onMounted, ref } from 'vue';

const awlStore = new AwlStore();

const shutdownOs = () => {
  sendAll({ message: "shell", data: "shutdownOs" });
}
const rebootOs = () => {
  sendAll({ message: "shell", data: "rebootOs" });
}

const opens = ref([true, true, true, true]);

onMounted(() => {
  parent.postMessage("sendDevice:qc", "*");
  window.addEventListener("message", (e) => {
    if (e.data instanceof String) {
      if (e.data.startsWith("device:qc:")) {
        for (let i = 1; i <= 4; i++) {
          opens.value[i - 1] = e.data.includes("f" + i);
        }
        doSet(opens);
      }
    } else if (e.data instanceof Object) {
      if (e.data.message == 'open') {
        console.debug(e.data.data);
        parent.postMessage("sendDevice:" + (e.data.data.open ? "b" : "a") + (e.data.data.i+1), "*");
      }
    }
  });
});
</script>
<style scoped>
.opens {
  --open-color: #00b25c;
  --close-color: #f74b0f;
  width: 100vw;
  height: 100vh;
  font-size: 2vmin;
}

.opens .btns {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  pointer-events: none;
  padding: 0 10vw;
}

.opens .btns>div {
  width: 20em;
  height: 30em;
  box-sizing: border-box;
  pointer-events: auto;
  transform: scaleX(.75);
}

.opens .btns>div>* {
  display: flex;
  justify-content: center;
  align-items: center;
}

.opens .btns>div>i {
  width: 20em;
  height: 20em;
  /* background-image: linear-gradient(to top, #ccc, #fff); */
  background-color: #FFF2;
  border-radius: 1em;
  border: solid .1em #FFF5;
  animation: am-btn-shadow 2s infinite;
}

.opens .btns>div>div {
  font-family: '微软雅黑';
  font-size: 3.6em;
  padding-top: 1em;
  font-weight: 1000;
  color: #FFF3;
  letter-spacing: .3em;
  -webkit-text-stroke: 2px var(--color);
  text-stroke: 2px var(--color);

  /* text-shadow: 0 0 10px var(--color);  */
}

.opens .btns>div svg {
  width: 10em;
  height: 10em;
}

.opens .btns>div svg path {
  fill: var(--color);
  ;
}

@keyframes am-btn-shadow {

  0% {
    box-shadow: 0 0 0 .01em var(--color);
  }

  10% {
    box-shadow: 0 0 0 .01em var(--color);
  }

  40% {
    box-shadow: 0 0 2em .01em var(--color);
  }

  60% {
    box-shadow: 0 0 2em .01em var(--color);
  }

  90% {
    box-shadow: 0 0 0 .01em var(--color);
  }

  100% {
    box-shadow: 0 0 0 .01em var(--color);
  }
}

.os {
  position: fixed;
  z-index: 99;
  bottom: 1em;
  width: 100%;
  display: flex;
  justify-content: center;
  transform: scaleY(1.3);
}
</style>