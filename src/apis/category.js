import instance from '@/utils/http.js';

export const getTopCategoryAPI = (id) => {
  return instance.get(`/category`, {params: {id}});
};

// export const getBannerAPI = (params={}) => {
//   const {distributionSite=1} = params;
//   return instance.get('/home/banner', {
//     params: {
//       distributionSite
//     },
//   });
// };
