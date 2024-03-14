<script setup>
import {useRoute} from 'vue-router';

const route = useRoute();
const id = route.params.id;
</script>

<template>

  <p class="text">category {{id}}</p >
</template>

<style scoped lang="scss">
.text {
  color: $priceColor;
}
</style>
