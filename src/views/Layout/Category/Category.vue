<script setup>
import MainBanner from '@/views/Layout/comment/MainBanner.vue';
import GoodsItem from '@/views/Layout/Home/comment/GoodsItem.vue';
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {useCategoryStore} from "@/stores/categoryStore.js";
import {getTopCategoryAPI} from "@/apis/category.js";


const route = useRoute();
const categoryData = ref({});
const categoryStore = useCategoryStore()
const getCategoryDate = async (id = route.params.id) => {
  const res = await getTopCategoryAPI(id);
  categoryData.value = res.data.result;
};


onMounted(() => {
  getCategoryDate();
});

onBeforeRouteUpdate((to, from, next) => {
  getCategoryDate(to.params.id);
  console.log(to);
  next();
});


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
      <!--轮播图-->
      <MainBanner :bannerImgList="categoryStore.bannerImgList"></MainBanner>
      <!-- 子分类 -->
      <div class="sub-list">
        <h3 @click="$emit('update:categoryData',1)">全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink :to="`/category/sub/${i.id}`">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
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

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>

