<script setup lang="ts">
import { ref, toRefs, watch, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  data: number[],
  maxLineHeight?: number,
  lineStyles: CSSStyleSheet,
}>(), {
});

const { data, maxLineHeight, lineStyles } = toRefs(props);

const lineNumbers = 128;

function lineHeightAt(i: number) {
  if (maxLineHeight?.value) {
    return (i > 64 ? data.value[192 - i] : data.value[i - 1]) * maxLineHeight.value + 'px'
  } else {
    return (i > 64 ? data.value[192 - i] : data.value[i - 1]) * 100 + '%'
  }
}

</script> 

<template lang="pug">
.container
  .music-visual
    .line(v-for="i in lineNumbers" :style="{ height : lineHeightAt(i), ...lineStyles }")
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.music-visual {
  width: 100%;
  height: 100%;
  display: flex;

  .line {
    width: 3px;
    height: 0;
    transition: 0.1s ease-out;
    border-radius: 2px;
    margin: 2px;
  }
}
</style>
