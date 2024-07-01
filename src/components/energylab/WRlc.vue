<template>
  <div class="root w-link-1">
    <dv-border-box-12 class="frame"><div class="icon"></div></dv-border-box-12>
    <div class="title">RLC可编程负载</div>
  </div>
</template>
<script setup>

</script>
<style scoped>
.root,.frame {
  position: relative;
  width: 8em;
  height: 8em;
}
.frame {
  padding: .3em .5em;
}
.root .frame .icon{
  width:7em;
  height:7em;
  background-size: contain;
  background-image: url(../../assets/imgs/RLC@3x.png);
}
.root .title {
  font-size: 15px;
  width: 200%;
  position: absolute;
  left: -50%;
  text-align: center;
  bottom: -25px;
}

</style>