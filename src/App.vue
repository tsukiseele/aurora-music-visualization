<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CVisual from './components/CVisual.vue'
import { onMounted } from 'vue';

onMounted(() => {
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
