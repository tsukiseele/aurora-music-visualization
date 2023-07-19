<script setup lang="ts">
import { ref, toRefs, watch, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  data: number[],
  color: string,
}>(), {
  color: 'hsla(192, 40%, 60%, 1)'
});

const { data, color } = toRefs(props);

const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  const audioCanvas = canvasRef.value!
  const audioCanvasCtx = audioCanvas.getContext('2d')!;
  watch(() => data.value, async (newVal, oldVal) => {
    resizeCanvasToDisplaySize(audioCanvas)
    audioCanvasCtx.clearRect(0, 0, audioCanvas.width, audioCanvas.height)
    const audioArray = newVal
    var barWidth = Math.round(audioCanvas.width / 128.0);
    var halfCount = audioArray.length / 2;
    audioCanvasCtx.fillStyle = color.value//'rgba(255, 0, 0, 1)';
    for (var i = 0; i < halfCount; ++i) {
      var height = audioCanvas.height * Math.min(audioArray[i], 1);
      audioCanvasCtx.fillRect(barWidth * i, audioCanvas.height - height, barWidth, height);
    }
    audioCanvasCtx.fillStyle = props.color//'rgba(0, 0, 255, 1)';
    for (var i = halfCount; i < audioArray.length; ++i) {
      var height = audioCanvas.height * Math.min(audioArray[191 - i], 1);
      audioCanvasCtx.fillRect(barWidth * i, audioCanvas.height - height, barWidth, height);
    }
  })
})

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  // If it's resolution does not match change it
  if (canvas.width !== width   || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  /* color: hsla(hue, saturation, lightness, alpha); */
}
</style>
