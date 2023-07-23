<script setup lang="ts">
import { ref, toRefs, watch, onMounted, computed, onUnmounted } from 'vue'

const props = defineProps<{
  src: string,
}>()

const { src } = toRefs(props);
const offset = ref(0)
const root = ref<HTMLDivElement>()
const backgroundSize = ref({ width: 0, height: 0 })

watch(src, async () => {
  backgroundSize.value = await new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src.value
    if (img.complete) return resolve({ width: img.width, height: img.height })
    img.addEventListener('load', () => resolve({ width: img.width, height: img.height }))
  })

  updateOffset()
}, { immediate: true })

onMounted(() => window.addEventListener('resize', updateOffset))

onUnmounted(() => window.removeEventListener('resize', updateOffset))

function updateOffset() {
  const { width, height } = root.value?.getBoundingClientRect()!
  const ratio = height / backgroundSize.value.height
  const realWidth = backgroundSize.value.width * ratio
  const boxWidth = width / 2 +  height * Math.sqrt(3) / 3
  if (realWidth > boxWidth) {
    offset.value = -(realWidth - boxWidth) / 2
  }
}

// const currentDatetime = ref<Date>(new Date());
// const timer = setInterval(() => currentDatetime.value = new Date(), 1000)
// onUnmounted(() => clearInterval(timer))
</script>

<template lang="pug">
.background(ref='root' :style="`--background: url('${src}'); --offset: ${offset}px;`") 
</template>

<style lang="scss" scoped> .background {
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background-image: var(--background);
   background-position: var(--offset) 0;
   background-size: contain;
 }
</style>
