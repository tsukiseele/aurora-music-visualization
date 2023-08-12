<script setup lang="ts">
import { ref, toRefs, watch, onMounted, computed, onUnmounted } from 'vue'
import moment from 'moment';

const props = defineProps<{
  format: string,
}>()

const { format } = toRefs(props);
const currentTimeText = ref<string[]>([])
const timer = ref<number>()

onMounted(() => timer.value = setInterval(() => currentTimeText.value = formatDate(format.value), 1000))
onUnmounted(() => clearInterval(timer.value))

function formatDate(format: string) {
  return format.split('|').map(value => moment().format(value))
}
</script>

<template lang="pug">
.datetime
  .time(v-if="currentTimeText.length") {{ currentTimeText[0] }}
  .date(v-if="currentTimeText.length > 1") {{ currentTimeText[1] }}
</template>

<style lang="scss" scoped>
.datetime {
  position: absolute;
  right: 4%;
  bottom: 10%;
  line-height: 1.5rem;
  color: var(--background-color);
  font-family: Myriad;
  text-align: end;
  transition: .3s ease;
  letter-spacing: 2px;

  .time {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .date {
    font-size: 1.5rem;
    font-style: italic;
  }
}
</style>
