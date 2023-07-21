<script setup lang="ts">
import { ref, toRefs, watch, onMounted, computed, onUnmounted } from 'vue'

const props = defineProps<{
  format: string,
}>()

const { format } = toRefs(props);
const currentDatetime = ref<Date>(new Date());
const timer = setInterval(() => currentDatetime.value = new Date(), 1000)
onUnmounted(() => clearInterval(timer))
</script>

<template lang="pug">
.system-clock {{ currentDatetime.format(format) }}

</template>

<style lang="scss" scoped>
.system-clock {
  font-family: inherit;
}

</style>
