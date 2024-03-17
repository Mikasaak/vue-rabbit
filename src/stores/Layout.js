import {ref} from 'vue';
import {defineStore} from 'pinia';
import {getCategoryAPI, getBannerImgAPI} from '@/apis/layout.js';

export const useLayoutStore = defineStore('layout', () => {
  const categoryList = ref([]);
  const getCategoryList = async () => {
    const res = await getCategoryAPI();
    // console.log('getCategoryList', res);
    categoryList.value = res.data.result;
  };
  const homeBannerImgList = ref([]);
  const getHomeBannerImgList = async () => {
    const res = await getBannerImgAPI();
    // console.log('getHomeBannerImg', res);
    homeBannerImgList.value = res.data.result;
  };

  getCategoryList();
  getHomeBannerImgList();

  return { categoryList, getCategoryList, homeBannerImgList, getHomeBannerImgs: getHomeBannerImgList};
});

