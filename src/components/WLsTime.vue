<template>
  <div class="root">{{
      d.getFullYear()+"-"+
      (d.getMonth()+1).toString().padStart(2,"0")+"-"+
      (d.getDate()+1).toString().padStart(2,"0")+" "+
      d.getHours().toString().padStart(2,"0")+":"+
      d.getMinutes().toString().padStart(2,"0")+":"+
      d.getSeconds().toString().padStart(2,"0")
      }} 星期{{ws.charAt(d.getDay())}}
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const ws= ref("日一二三四五六");
const d = ref(new Date());

onMounted(()=>{
  window.setInterval(()=>{
    d.value = new Date(new Date().getTime());
  },1000);
});
</script>
<style scoped>
.root {
  width:20em;
  padding: .5rem;
  font-size: 2rem;
  line-height: 2;
  text-shadow: 0 0 .2em #000;
  color: var(--c-5);
  font-family: led,'微软雅黑';
}
</style>