<template>
  <div class="root w-abs">
    <span>{{ (d.getDate()).toString().padStart(2,"0") }}</span>
    {{
      (d.getMonth()+1).toString().padStart(2,"0")+"."+
      d.getFullYear()+" " +
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
  display: block;
  left:calc(136 * var(--vw));
  width:20em;
  padding: .5rem;
  font-size: 1em;
  line-height: 2;
  text-shadow: 0 0 .2em #000;
  color: #7bcbef;
  font-family: led,'微软雅黑';
  font-size: 2.5em;
  line-height: 1;
}
.root span {
  font-size: 2em;
  line-height: 1.3;
}
</style>