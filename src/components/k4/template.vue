<template>
  <div class="root w-abs">
    <dv-border-box-12 style="backdrop-filter: blur(5px);">
      <div class="w-dv-content"></div>
    </dv-border-box-12>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import ajax from "@/api/ajax"

const data = reactive({});

</script>
<style scoped>
.root {
  left:6.2em;
  top:15.1em;
  width: 42.2em;
  height: 29.1em; 
  color: #1160b5;
}

</style>