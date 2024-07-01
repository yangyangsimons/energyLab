<script setup>
import { onMounted } from "vue";
import {AwlStore} from "@/store";
import ajax from "@/api/ajax";

onMounted(()=>{
  ajax.get("/awl/device-config/config").then(r=>{
    if(r.data.ok){
      AwlStore().title=r.data.data.title;
      // console.log(AwlStore().title);
    }
  })
});
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <router-view></router-view>
    </Transition>
  </div>
</template>

<style>
</style>
