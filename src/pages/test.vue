<template>
  <div>
    <el-button type="success" @click="ssss">sdfdsafdsa</el-button>
  </div>
</template>
<script setup>
const ssss = ()=>{
  let a = parent.myApi.test("test");
  alert(a);
}
</script>
<style scoped>

</style>
