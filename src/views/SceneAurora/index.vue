<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import CVisual from '@/components/CVisual.vue';
import CDigitalClock from '@/components/CDigitalClock.vue';
import CBackground from '@/components/CBackground.vue';
import image from '@/assets/bg3.png'
import { rgbToHex, rgbToStr, rgbArrToHex, rgbArrToStr } from '@/utils/color'
// @ts-ignore
import ColorThief from 'colorthief/dist/color-thief.mjs'

const data = ref<Number[]>([])
const imageRef = ref<HTMLImageElement>()
const thumbnailRef = ref<HTMLImageElement>()
const thumbnailPalette = ref<number[][]>([[]])
const backgroundPalette = ref<number[][]>([[]])
const mediaProperties = ref<WallpaperEngineMediaProperties>()
const mediaThumbnail = ref<WallpaperEngineMediaThumbnail>()
const mediaPlayback = ref<WallpaperEngineMediaPlayback>()
const mediaTimeline = ref<WallpaperEngineMediaTimeline>()

const angle = 32;
const blankColor = '#EFEFEF'

onMounted(async () => {
  const colors = await getPalette(imageRef.value!);
  backgroundPalette.value = colors
  thumbnailPalette.value = colors
  // image lazy-load
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.setAttribute('src', img.getAttribute('data-src') || '');
    img.addEventListener('load', () => img.removeAttribute('data-src'));
  });
})

watch(mediaThumbnail, () =>
  nextTick(() =>
    setTimeout(async () =>
      thumbnailPalette.value = (await getPalette(thumbnailRef.value!)).reverse()
      , 1500)
  )
)
async function getPalette(img: HTMLImageElement): Promise<number[][]> {
  await new Promise((resovle, reject) => {
    if (img.complete) {
      resovle(null)
    } else {
      img.addEventListener('load', () => resovle(null));
    }
  })
  const colorThief = new ColorThief();
  const primaryColor: number[] = colorThief.getColor(img)
  const palette: number[][] = colorThief.getPalette(img);
  const darkPalette = palette.filter(
    color => color.reduce((a, b) => a + b) < primaryColor.reduce((a, b) => a + b))
  darkPalette.unshift(colorThief.getColor(img))
  return darkPalette//.reverse()
  // palette.unshift(primaryColor)
  // return palette.sort((ca, cb) => ca.reduce((a, b) => a + b) - cb.reduce((a, b) => a + b))
}
function getThumbnailColor(index: number): string {
  return thumbnailPalette.value && thumbnailPalette.value.length > index ? rgbArrToStr(thumbnailPalette.value[index]) : '';
}
function getBackgroundColor(index: number): string {
  return backgroundPalette.value && backgroundPalette.value.length > index ? rgbArrToStr(backgroundPalette.value[index]) : '';
}
// setInterval(() => data.value = Array.from({ length: 128 }, () => Math.random() * 0.1), 33)

window.wallpaperRegisterAudioListener && window.wallpaperRegisterAudioListener(waveArray => data.value = waveArray);
window.wallpaperRegisterMediaStatusListener && window.wallpaperRegisterMediaStatusListener(event => {

});
window.wallpaperRegisterMediaPropertiesListener && window.wallpaperRegisterMediaPropertiesListener(event => {
  mediaProperties.value = event;
});
window.wallpaperRegisterMediaThumbnailListener && window.wallpaperRegisterMediaThumbnailListener(event => {
  mediaThumbnail.value = event;
});
window.wallpaperRegisterMediaPlaybackListener && window.wallpaperRegisterMediaPlaybackListener(event => {
  mediaPlayback.value = event;
});
window.wallpaperRegisterMediaTimelineListener && window.wallpaperRegisterMediaTimelineListener(event => {
  mediaTimeline.value = event;
});

</script>

<template lang="pug">
main(:style="`--background-color: ${getBackgroundColor(0)}; --thumbnail-color: ${getThumbnailColor(0)}; --angle: ${angle}deg; --blank-color: ${blankColor};`")
  img(ref="imageRef" :src="image" style="display: none;")
  CBackground(:src="image" :angle="angle")
  .frontground 
    .divider(data-text="Twitter | Nyarray")
    .title {{ mediaProperties?.title ?? 'Unknown' }}
    CDigitalClock.clock(format="H:mm:ss|dddd, MMMM Do YYYY")
    .thumbnail(v-if="mediaThumbnail && mediaThumbnail.thumbnail")
      //- img(:src="`data:image;base64,${mediaThumbnail?.thumbnail ?? ''}`")
      img(ref="thumbnailRef" :src="mediaThumbnail?.thumbnail ?? ''")
    .info 
      .info-header INFORMATION 
      //- .info-text 专辑：{{ mediaProperties?.albumTitle ?? 'Unknown' }} 
      .info-title 歌手：{{ mediaProperties?.artist ?? 'Unknown' }} 
      .info-divider  
      //- .info-text Ai绘画：Stella
      .info-text {{ mediaProperties?.contentType ?? 'Unknown' }} 
    CVisual.divider-visual(:data="data" :lineStyles="{ backgroundColor: getThumbnailColor(1) }") 
  .side
    .side-start 
      .side-line 
      .side-color
        .side-color-title COLOR VALUE
        .side-color-value {{ rgbArrToHex(backgroundPalette[0]).slice(1) }}
    .side-middle
      .side-timeline(v-show="mediaTimeline") {{ mediaTimeline ? `${mediaTimeline.position / 60} : ${(mediaTimeline.position % 60 + '').padEnd(2, '0')}` : '0:00' }}
    .side-end 
      .side-line 
      .side-music-title {{ mediaProperties?.title ?? 'Unknown' }}
</template>  
 
<style lang="scss" scoped>
@import './index.scss';
</style>


