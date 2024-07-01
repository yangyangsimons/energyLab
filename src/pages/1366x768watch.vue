<template>
  <div class="ls-root">
    <div class="top">
      <div>
        <div class="logo"></div>
        <h1 class="title">{{ awlStore.title }}</h1>
      </div>
      <div class="menus">
        <div @click="$router.push('/')">系统总览</div>
        <div class="active">运行监控</div>
        <div hidden>设备详情</div>
      </div>
    </div>
    <div class="sub-menus">
      <router-link to="bms">锂电池BMS</router-link>
      <router-link to="acdc">储能双向变流器</router-link>
      <router-link to="rlc">RLC可编程模拟负载</router-link>
      <router-link to="ac">直驱模拟风机变流器</router-link>
      <router-link to="elec">微电网接入中央测控柜</router-link>
    </div>
    <div>

      <Transition name="fade" mode="out-in">
        <router-view></router-view>
      </Transition>


    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

import {useRouter} from "vue-router";

import { AwlStore } from '@/store';

const awlStore = AwlStore();

const $router = useRouter();

const onMessage = (event)=>{
  console.debug("onMessage",event)
  if("routeTo"==event.data.message){
    $router.push(event.data.data);
  }
}


onMounted(()=>{
  window.addEventListener("message",onMessage);
});

onUnmounted(()=>{
  window.removeEventListener("message",onMessage);
});



const resize = ()=>{
  if (screen.width < 1366 || screen.height < 768) {
    document.body.style.overflow = "scroll";
  }else{
    document.body.style.overflow = "hidden";
  }
}

onMounted(() => {
  resize();
  window.addEventListener("resize",resize);
});
onUnmounted(() => {
  window.removeEventListener("resize",resize);
});

</script>

<style scoped>
.sub-menus {
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
}
.sub-menus > a {
  display: block;
  padding: 5px 15px 7px;
  border: 1px solid #FFF0;
  background-color: #FFF0;
  border-radius: 50px;
  margin: 0 5px;
  text-shadow: 0 0 5px #0006;
}
.sub-menus > a.router-link-active {
  border: 1px solid #FFF6;
  background-color: #FFF3;
  color:#15DBF5;
}

</style>