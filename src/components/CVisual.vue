<script setup lang="ts">
import { ref, toRefs, watch, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  data: number[],
  lineStyles: CSSStyleSheet
}>(), {
});

const { data, lineStyles } = toRefs(props);

const lineNumbers = 128;

</script>

<template lang="pug">
.container
  .music-visual
    .line(v-for="i in lineNumbers" :style="{ width: (i > 64 ?  data[192 - i] : data[i - 1]) * 2000 + 'px', ...lineStyles }")
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.music-visual {
  height: auto;
  width: 100%;
  .line {
    width: 0;
    height: 3px;
    transition: .1s ease-out;
    border-radius: 2px;
    margin: 2px;
  }
}</style>
