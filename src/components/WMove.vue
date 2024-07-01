<template>
  <div style="position: absolute;" :class="{ 'w-move': props.move }" @touchstart="handleTouchstart($event)"
    @mousedown="handleDown($event)" :style="{
      'left': xy.x + 'px',
      'top': xy.y + 'px',
      'z-index': zIndex
    }">
    <slot>可移动内容</slot>
    <div :hidden="!props.move" class="w-move-hover">{{ xy.x }}:{{ xy.y }}</div>
    
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  modelValue: {
    type: Object,
    default: { x: 0, y: 0 }
  },
  move: {
    type: Boolean,
    default: true
  },

});
const emit = defineEmits(['update:modelValue', 'moveStart', 'moveEnd']);

const xy = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
});
const zIndex = ref(1);

//当前鼠标位置
let currentxy = null;
let movexy = null;

const handleDown = (event) => {
  if (!props.move) {
    return;
  }
  currentxy = { x: event.x, y: event.y };
  zIndex.value = window["w-move-z-index"] || zIndex.value;
  zIndex.value++;
  window["w-move-z-index"] = zIndex.value;
  emit('moveStart');
}

const handleTouchstart = (e) => {
  if (!props.move) {
    return;
  }

  currentxy = { x: e.touches[0].screenX, y: e.touches[0].screenY };
  zIndex.value = window["w-move-z-index"] || zIndex.value;
  zIndex.value++;
  window["w-move-z-index"] = zIndex.value;
  emit('moveStart');
}

window.addEventListener("mousemove", (event) => {
  if (currentxy != null) {
    movexy = { x: event.x, y: event.y };
    xy.value.x += movexy.x - currentxy.x;
    xy.value.y += movexy.y - currentxy.y;
    currentxy = movexy;
  }
});

window.addEventListener("touchmove", (event) => {
  if (currentxy != null) {
    console.info(event);
    movexy = { x: event.touches[0].screenX, y: event.touches[0].screenY };
    xy.value.x += movexy.x - currentxy.x;
    xy.value.y += movexy.y - currentxy.y;
    currentxy = movexy;
  }
});


window.addEventListener("mouseup", () => {
  if (currentxy) {
    currentxy = null;
    emit('moveEnd');
  }
});
window.addEventListener("touchend", () => {
  if (currentxy) {
    currentxy = null;
    emit('moveEnd');
  }
});


</script>
<style>
.w-move {

  cursor: move;
  top: 0px;
  left: 0px;
  user-select: none;
}

.w-move:hover {
  opacity: .8;
  box-shadow: 0 0 1rem .2rem #FFF3;
}

.w-move>.w-move-hover {
  display: none;
  position: absolute;
  top: -1.5rem;
  right: 0;
  line-height: 1.5rem;
  font-size: 1rem;
  text-shadow: 0 0 .5rem #000;
}

.w-move:hover>.w-move-hover {
  display: block;
}
</style>