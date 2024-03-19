import instance from '@/utils/http.js';

export const getTopCategoryAPI = (id) => {
  return instance.get(`/category`, {params: {id}});
};

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return instance.get('/category/sub/filter', {params: {id}});
}


// export const getBannerAPI = (params={}) => {
//   const {distributionSite=1} = params;
//   return instance.get('/home/banner', {
//     params: {
//       distributionSite
//     },
//   });
// };
