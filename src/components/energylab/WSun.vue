<template>
  <div class="w-sun-root w-link-1">
    <dv-border-box-12 class="frame"><div class="icon" :class="{'w-sun':props.running}"></div></dv-border-box-12>
    <div class="title"><slot>太阳能</slot></div>
  </div>
</template>
<script setup>
const props = defineProps({
  running : {
    type:Boolean,
    default:true
  }
})
</script>
<style scoped>
.w-sun-root,.frame {
  position: relative;
  width: 8em;
  height: 8em;
}

.frame {
  padding: .3em .5em;
}
.w-sun-root .frame .icon{
  position: absolute;
  top:0;
  left:0;
  width:7em;
  height:7em;
  background-size: contain;
  background-image: url(../../assets/imgs/sun.png);
  filter:grayscale(100%);
  opacity: .5;
}
.w-sun-root .title {
  font-size: 1.5em;
  width: 200%;
  position: absolute;
  left: -50%;
  text-align: center;
  bottom: -1.67em;
}

.w-sun {
  filter:none !important;
  animation: am-sun 2s infinite  alternate-reverse;
}

@keyframes am-sun {
  0% {
    opacity: .5;
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: .5;
  }
}



</style>