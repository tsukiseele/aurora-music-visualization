<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CVisualDom from '@/components/CVisualDom.vue';
import image from '@/assets/bg.png'
// @ts-ignore
import ColorThief from 'colorthief/dist/color-thief.mjs'

const data = ref<Number[]>([])
const imageRef = ref<HTMLImageElement>()
const themeColor = ref<number[]>([255, 255, 255])

onMounted(() => {
  const img = imageRef.value!;
  const colorThief = new ColorThief();
  if (img.complete) {
    themeColor.value = colorThief.getColor(img);
  } else {
    img.addEventListener('load', () => {
      themeColor.value = colorThief.getColor(img);
    });
  }
})
setInterval(() => data.value = Array.from({ length: 128 }, () => Math.random() * 0.1), 33)
// @ts-ignore
// window.wallpaperRegisterAudioListener(waveArray => data.value = waveArray);
</script>

<template lang="pug">
main(:style="`--theme-color: rgba(${themeColor[0]}, ${themeColor[1]}, ${themeColor[2]}, 1); --background: url(${image})`")
  img(ref="imageRef" :src="image" style="display: none;")
  .background 
  .frontground
    .divider
    .title Swift
    .subtitle I have no fear
      br 
      | 我无所畏惧
    .info 
      .info-header INFORMATION 
      .info-text 专辑：Fairy Tale 
      .info-title 歌手：Synthion 
      .info-divider  
      .info-text Ai绘画：Stella
    .middle 
      .middle-divider by Nyarray 
    .start 
    CVisualDom.divider-visual(:data="data" :lineStyles="{ backgroundColor: 'rgba(64, 118, 178, 1)' }") 
      //- .start-timer 0:31
      //- .start-color-
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
}

.title {
  position: absolute;
  right: 4%;
  top: 48%;
  font-family: Limerick;
  font-size: 72px;
  color: var(--theme-color);
  font-style: italic;

}

.subtitle {
  position: absolute;
  right: 4%;
  top: 72%;
  font-family: Myriad;
  font-size: 20px;
  color: var(--theme-color);
  font-style: italic;
  text-align: end;
  line-height: 24px;
}

.info {
  --info-padding-right: 4vw;
  --info-text-shadow: 0 0 1px var(--theme-color);
  // --info-text-shadow: 0.5px 0 0 var(--theme-color), -0.5px 0 0 var(--theme-color), 0 0.5px 0 var(--theme-color), 0 -0.5px 0 var(--theme-color);
  position: absolute;
  right: 0;
  top: 0;
  padding: 4vh 0 0 0;
  color: var(--theme-color);
  text-align: end;
  font-family: Myriad;
  font-size: 24px;
  font-weight: bolder;
  font-style: italic;
  z-index: 11;

  .info-header {
    padding-right: var(--info-padding-right);
    font-size: 16px;
    font-family: FunctionPro;
    font-style: normal;
  }

  .info-text {
    padding-right: var(--info-padding-right);
    font-size: 20px;
    text-shadow: var(--info-text-shadow);
  }

  .info-title {
    padding-right: var(--info-padding-right);
    font-size: 24px;
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
  background-position: -50% 0;
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
  transform: translateX(12%);
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
    width: 3vw;
    height: calc(100vh + 100vw);
    transform: rotate(30deg);
    background-color: var(--theme-color);
    z-index: 10;
    // background-image: linear-gradient(-60deg, var(--background-color) calc(50% - var(--divider) / 2 - 1px), var(--theme-color) calc(50% - var(--divider) / 2), var(--theme-color) calc(50% + var(--divider) / 2), transparent calc(50% + var(--divider) / 2 + 1px));
  }

  .divider-visual {
    width: 100%;
    height: 100%;
    transform: rotate(30deg) translate(calc(50% + 1vw), 0);
    z-index: 1;
  }

  .middle {
    position: absolute;
    top: 0;
    left: 30%;
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .middle-divider {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: rotate(-60deg) translate(-50%, -50%);
      transform-origin: 0 0;
      z-index: 1;
      text-align: start;
      color: white;
      font-family: Myriad;
    }

  }
}
</style>


