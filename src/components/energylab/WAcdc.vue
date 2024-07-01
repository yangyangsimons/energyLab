<template>
  <div class="root w-link-1" style="border-radius: 0;">
    <div class="title">AC/DC双向逆变系统</div>
  </div>
</template>
<script setup>

</script>
<style scoped>
.root {
  position: relative;
  --w : 120px;
  width: var(--w);
  height: calc(var(--w) * 227 / 100);
  background-image: url(../../assets/imgs/AC_DC@3x.png);
}
.root .title {
  position: absolute;
  width: 200%;
  top:-40px;
  left:-50%;
  text-align: center;
  font-size: 20px;
}

</style>