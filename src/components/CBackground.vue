<script setup lang="ts">
import { ref, toRefs, watch, onMounted, computed, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  src: string,
  angle: number,
}>(), {
  angle: 30,
})

const { src } = toRefs(props);
const backgroundRef = ref<HTMLImageElement>()
// onMounted(async () => {  
//   const image = await new Promise<HTMLImageElement>((resolve, reject) => {
//     const img = backgroundRef.value!
//     img.src = src.value
//     if (img.complete) return resolve(img)
//     img.addEventListener('load', () => resolve(img))
//   })
  
//   image.src = src.value
// })

</script>

<template lang="pug">
.background(ref="root" :style="`--tan: ${Math.tan(Math.PI / 180 * angle)}`") 
  img(ref='backgroundRef' :data-src="src" alt="")
</template>

<style lang="scss" scoped> 

.background {
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   pointer-events: none;
   img {
     width: calc(50% + var(--tan) * 50vh);
     height: 100%;
     object-fit: cover;
   }
 }


 img {
  opacity: 1;
  transition: opacity ease .5s;
  &[data-src] {
    opacity: 0;
  }
 }
</style>
