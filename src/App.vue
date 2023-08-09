<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CVisual from './components/CVisual.vue'
import { onMounted } from 'vue';

onMounted(() => {
  (function (doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var referenceSize = Math.max(docEl.clientWidth, docEl.clientHeight);
          docEl.style.fontSize = 8 * (referenceSize / 750) * (window.devicePixelRatio || 1) + 'px';
      };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);

  document.querySelectorAll('img[data-src]').forEach(img => {
    img.setAttribute('src', img.getAttribute('data-src') || '');
    img.addEventListener('load', () => img.removeAttribute('data-src'));
  });
})
</script>

<template lang="pug">
RouterView
</template>
<style lang="scss" scoped></style>
