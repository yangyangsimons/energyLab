<template>
  <div class="w-wind-root w-link-1">
    <dv-border-box-12 class="frame">
      <div class="icon"></div>
      <div class="icon3" :class="{'stop':!props.running}">
        <div class="icon"></div>
        <div class="icon"></div>
        <div class="icon"></div>
      </div>
    </dv-border-box-12>
    <div class="title"><slot>风能</slot></div>
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
.w-wind-root,
.frame {
  position: relative;
  width: 8em;
  height: 8em;
}

.frame {
  padding: .3em .5em;
}

.w-wind-root .frame .icon {
  width: 7em;
  height: 7em;
  background-size: contain;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(../../assets/imgs/wind11.png);
}

.w-wind-root .frame .icon3 .icon {
  background-image: url(../../assets/imgs/wind1.png);
}
.w-wind-root .frame .icon3 .icon:nth-child(2) {
  transform: rotate(120deg);
}
.w-wind-root .frame .icon3 .icon:nth-child(3) {
  transform: rotate(240deg);
}

.w-wind-root .frame .icon3 {
  width: 7em;
  height: 7em;
  animation: am-icon3 5s infinite linear;
}

.w-wind-root .frame .icon3.stop {
  animation-play-state:paused;
}

@keyframes am-icon3 {
  to{
    transform: rotate(-360deg);
  }
}

.w-wind-root .title {
  font-size: 1.5em;
  width: 200%;
  position: absolute;
  left: -50%;
  text-align: center;
  bottom: -1.67em;
}
</style>