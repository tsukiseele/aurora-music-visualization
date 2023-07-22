<script setup lang="ts">
import { ref, toRefs, watch, onMounted, computed, onUnmounted } from 'vue'

const props = defineProps<{
  src: string,
}>()

const { src } = toRefs(props);
const offset = ref(0)
const root = ref<HTMLDivElement>()
const backgroundSize = ref({ width: 0, height: 0 })

watch(src, () => {
  const img = new Image()
  img.src = src.value;
  img.addEventListener('load', () =>
    backgroundSize.value = { width: img.width, height: img.height }
  )
})

onMounted(() => {
  const img = new Image()
  img.src = src.value;
  img.addEventListener('load', () =>
    backgroundSize.value = { width: img.width, height: img.height }
  )
  updateOffset()
  window.addEventListener('resize', updateOffset)

})

onUnmounted(() => window.removeEventListener('resize', updateOffset))

function updateOffset() {
  const { width, height } = root.value?.getBoundingClientRect()!
  const ratio = height / backgroundSize.value.height
  const realWidth = backgroundSize.value.width * ratio
  const boxWidth = width * 0.67
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
   // background-image: var(--background);
   background-position: center;
   background-size: cover;
   overflow: hidden;

   &::before {
     content: '';
     position: absolute;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-image: var(--background);
     background-position: var(--offset) 0;
     background-size: contain;
   }
 }
</style>
