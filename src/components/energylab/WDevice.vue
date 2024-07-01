<template>
  <div class="w-device-root w-link-1" :class="{'w-stop':!props.running}">
    <dv-border-box-12 class="frame"><div class="icon" :class="cls"></div></dv-border-box-12>
    <div class="title"><slot>太阳能</slot></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  running : {
    type:Boolean,
    default:true
  },
  type : {
    type:Number,
    default:0
  },
  am:{
    type:Number,
    default:true
  }
})
const cls = ref({});
cls.value["w-device-am"]=props.am && props.running;
cls.value["icon"+props.type]=true;
</script>
<style scoped>
.w-device-root,.frame {
  position: relative;
  width: 8em;
  height: 8em;
}

.frame {
  padding: .3em .5em;
}
/* .w-device-root:has(:not(.w-dev)) {
  filter:grayscale(100%); 
} */
.w-device-root .frame .icon{
  position: absolute;
  top:0;
  left:0;
  width:7em;
  height:7em;
  background-size: contain;
  opacity: 1;
}
.w-device-root.w-stop {
  filter:grayscale(100%);
}
.w-device-root .frame .icon0 {
  background-image: url(../../assets/imgs/dev0.png);
}
.w-device-root .frame .icon1 {
  background-image: url(../../assets/imgs/dev1.png);
}
.w-device-root .frame .icon99 {
  background-image: url(../../assets/imgs/dev99.png);
}
.w-device-root .title {
  font-size: 1.5em;
  width: 200%;
  position: absolute;
  left: -50%;
  text-align: center;
  bottom: -1.67em;
}

.w-device-am {
  animation: am-0 3s infinite alternate-reverse;
}


@keyframes am-0 {
  0% {
    opacity: .5;
  }
  40% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
  }
}



</style>