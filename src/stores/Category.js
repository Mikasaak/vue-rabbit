import {ref} from 'vue';
import {defineStore} from 'pinia';
import {getBannerImgAPI} from '@/apis/layout.js';
export const  useCategoryStore = defineStore('category', () => {
  const bannerImgList = ref([]);
  const getBannerImgList = async () => {
    const res = await getBannerImgAPI(2);
    // console.log('getBannerImgList', res);
    bannerImgList.value = res.data.result;
  };

  getBannerImgList();
  return { bannerImgList, getBannerImgList};

});
