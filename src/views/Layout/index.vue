<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue';
import {useLayoutStore} from '@/stores/Layout.js';
const layoutStore = useLayoutStore();
console.log(layoutStore);
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
