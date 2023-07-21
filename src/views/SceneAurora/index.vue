<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import CVisual from '@/components/CVisual.vue';
import CDigitalClock from '@/components/CDigitalClock.vue';
import image from '@/assets/bg2.png'
// @ts-ignore
import ColorThief from 'colorthief/dist/color-thief.mjs'

const data = ref<Number[]>([])
const imageRef = ref<HTMLImageElement>()
const thumbnailRef = ref<HTMLImageElement>()
const palette = ref<number[][]>([[]])
const mediaProperties = ref<WallpaperEngineMediaProperties>()
const mediaThumbnail = ref<WallpaperEngineMediaThumbnail>()
const mediaPlayback = ref<WallpaperEngineMediaPlayback>()
const mediaTimeline = ref<WallpaperEngineMediaTimeline>()

onMounted(async () => {
  const colors = await getPalette(imageRef.value!);
  palette.value = colors
})

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
  // const darkPalette = palette.filter(
  //   color => color.reduce((a, b) => a + b) < primaryColor.reduce((a, b) => a + b))
  // darkPalette.unshift(colorThief.getColor(img))
  // return darkPalette
  palette.unshift(primaryColor)
  return palette.sort((ca, cb) => ca.reduce((a, b) => a + b) - cb.reduce((a, b) => a + b))
}
const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')
const rgbToStr = (r: number, g: number, b: number) => `rgba(${r}, ${g}, ${b}, 1)`;
const rgbArrToStr = (arr: number[]) => arr.length > 2 ? rgbToStr(arr[0], arr[1], arr[2]) : '';
const rgbArrToHex = (arr: number[]) => arr.length > 2 ? rgbToHex(arr[0], arr[1], arr[2]) : '';

function getColor(index: number): string {
  return palette.value && palette.value.length > index ? rgbArrToStr(palette.value[index]) : ''; 
}
watch(mediaThumbnail, () =>
  nextTick(() =>
    setTimeout(async () =>
      palette.value = await getPalette(thumbnailRef.value!)
      , 1000)
  )
)
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
main(:style="`--theme-color: ${getColor(0)}; --background: url(${image})`")
  img(ref="imageRef" :src="image" style="display: none;")
  .background  
  .frontground
    .divider(data-text="by Nyarray")
    .title {{ mediaProperties?.title ?? 'Unknown' }}
    .datetime 
      CDigitalClock(format="hh:mm:ss").time 
      CDigitalClock(format="yyyy-MM-dd").date
    .thumbnail(v-if="mediaThumbnail && mediaThumbnail.thumbnail")
      //- img(:src="`data:image;base64,${mediaThumbnail?.thumbnail ?? ''}`")
      img(ref="thumbnailRef" :src="mediaThumbnail?.thumbnail ?? ''")
    .info 
      .info-header INFORMATION 
      .info-text 专辑：{{ mediaProperties?.albumTitle ?? 'Unknown' }} 
      .info-title 歌手：{{ mediaProperties?.artist ?? 'Unknown' }} 
      .info-divider  
      //- .info-text Ai绘画：Stella
      .info-text {{ mediaProperties?.contentType ?? 'Unknown' }} 
    CVisual.divider-visual(:data="data" :lineStyles="{ backgroundColor: getColor(1) }") 
    .side
      .side-color-title Theme
      .side-color-value(v-if="palette && palette.length > 2")
        span(v-for="color in palette" :style="{backgroundColor: rgbArrToHex(color)}") {{ rgbArrToHex(color) }}
</template>  
 
<style lang="scss" scoped>
@font-face {
  font-family: Limerick;
  src: url('@/assets/limerick-serial-bold.ttf');
}

@font-face {
  font-family: Myriad;
  src: url('@/assets/MYRIADPRO-REGULAR.OTF');
}

@font-face {
  font-family: FunctionBook;
  src: url('@/assets/Function-Book.ttf');
}

@font-face {
  font-family: FunctionPro;
  src: url('@/assets/FunctionPro-Bold.otf');
}

.side {
  position: absolute;
  left: 4%;
  top: 8%;
  writing-mode: vertical-rl;
  background-color: black;
  color: var(--background-color);
  padding: .5rem;

}

.thumbnail {
  position: absolute;
  width: 128px;
  height: 128px;
  right: 4%;
  top: 28%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

main {
  --background-color: rgba(241, 241, 241, 1);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--theme-color);
}

.background,
.frontground {
  width: 100%;
  height: 100%;
  transition: .3s ease;
}

.title {
  position: absolute;
  right: 4%;
  top: 48%;
  max-width: 40%;
  font-family: Limerick;
  font-size: 72px;
  color: var(--theme-color);
  font-style: oblique;
}

.datetime {
  position: absolute;
  right: 4%;
  bottom: 10%;
  line-height: 1.5rem;
  color: var(--theme-color);
  font-family: Myriad;
  font-style: italic;
  text-align: end;
  transition: .3s ease;

  .time {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: .5rem;
  }

  .date {
    font-size: 1.5rem;
  }
}

.info {
  --info-padding-right: 4vw;
  --info-text-shadow: 0 0 1px var(--theme-color);
  position: absolute;
  right: 0;
  top: 0;
  padding: 4vh 0 0 0;
  color: var(--theme-color);
  text-align: end;
  font-family: Myriad;
  font-size: 1.5rem;
  font-weight: bolder;
  font-style: italic;
  z-index: 11;
  transition: .3s ease;

  .info-header {
    padding-right: var(--info-padding-right);
    font-size: 1rem;
    font-family: FunctionPro;
    font-style: normal;
  }

  .info-text {
    padding-right: var(--info-padding-right);
    font-size: 1.25rem;
    text-shadow: var(--info-text-shadow);
  }

  .info-title {
    padding-right: var(--info-padding-right);
    font-size: 1.5rem;
    text-shadow: var(--info-text-shadow);
  }

  .info-divider {
    margin-left: 4vw;
    height: 2px;
    background-color: var(--theme-color);
  }
}


.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: var(--background);
  background-position: -25% 0;
  background-size: contain;
  overflow: hidden;
}

.frontground {
  --divider: 3%;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  transform: translateX(8%);
  animation: fade 2s ease-in-out .25s forwards;
  // background-image: linear-gradient(-60deg, var(--background-color) calc(50% - var(--divider) / 2 - 1px), var(--theme-color) calc(50% - var(--divider) / 2), var(--theme-color) calc(50% + var(--divider) / 2), transparent calc(50% + var(--divider) / 2 + 1px));
  background-image: linear-gradient(-60deg, var(--background-color) 50%, transparent 50%);
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes fade {
    100% {
      transform: translateX(0);
    }
  }

  .divider {
    position: absolute;
    width: 3rem;
    height: 100%;
    z-index: 10;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: skew(-30deg);
      background-color: var(--theme-color);
      transition: .3s ease;
    }

    &::after {
      content: attr(data-text) '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: rotate(210deg);
      display: flex;
      align-items: center;
      color: white;
      font-size: 1.2rem;
      font-family: FunctionBook;
      text-transform: uppercase;
      writing-mode: vertical-lr;
      transition: .3s ease;
    }

    // background-image: linear-gradient(-60deg, var(--background-color) calc(50% - var(--divider) / 2 - 1px), var(--theme-color) calc(50% - var(--divider) / 2), var(--theme-color) calc(50% + var(--divider) / 2), transparent calc(50% + var(--divider) / 2 + 1px));
  }

  .divider-visual {
    width: 100%;
    height: 100%;
    transform: rotate(30deg) translate(50%, 0);
    z-index: 1;
  }
}
</style>


