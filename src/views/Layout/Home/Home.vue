<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
import MainBanner from '@/views/Layout/comment/MainBanner.vue';
import {useLayoutStore} from '@/stores/Layout.js';
const layoutStore = useLayoutStore()
</script>

<template>
  <div class="container">
    <MainBanner :banner-img-list="layoutStore.homeBannerImgList">
      <HomeCategory/>
    </MainBanner>
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct/>

</template>
