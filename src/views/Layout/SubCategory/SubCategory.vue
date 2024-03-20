<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {getSubCategoryAPI} from '@/apis/category.js';
import GoodsItem from '@/views/Layout/Home/comment/GoodsItem.vue';
import { getCategoryFilterAPI } from '@/apis/category'


const route = useRoute();
const goodList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
});
// 获取面包屑导航数据
const filterData = ref({})
const getFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  filterData.value = res.data.result
  console.log(res)
}
getFilterData()





const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  console.log(res);
  goodList.value = res.data.result.items;
};

onMounted(() => {
      getGoodList();
    },
);


// 加载更多
const isLoading = ref(false);
const disabled = ref(false);
const load = async ()=>{
  if (isLoading.value) return;
  isLoading.value = true;
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);
  if (res.data.result.items.length === 0) {
    isLoading.value = true;
    disabled.value = true;
    return;
  }
  goodList.value = [...goodList.value,...res.data.result.items];
  isLoading.value = false;
}
</script>

<template>
  <div class="container ">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="()=>{
        reqData.page = 1;
        getGoodList();
      }">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="item in goodList" :good="item" :key="item.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
