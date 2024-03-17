<script setup>
defineProps({
  bannerImgList: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerImgList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
      <slot ></slot>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">

</style>
