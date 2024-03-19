<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import {getCategoryFilterAPI} from '@/apis/category.js';


const categoryData = ref({})

const route = useRoute()
let findItem = ref({})
const setCategoryData = (data) => {
  categoryData.value = data
  console.log("categoryData", data);
}
watch(() => route.params.subid, async (newVal) => {
  const res = await getCategoryFilterAPI(newVal)
  findItem.value = res.data.result
  console.log("findItem", findItem.value);
})

</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:`/category/${route.params.id}`}">{{ categoryData.name }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.params.hasOwnProperty('subid')">{{findItem.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <RouterView @update:categoryData = setCategoryData></RouterView>
    </div>
  </div>

</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>
