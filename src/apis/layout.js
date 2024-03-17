import instance from '@/utils/http.js';

export const getCategoryAPI = () => {
  return instance.get('/home/category/head');
};

/**
 *
 * @param distributionSite
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export const getBannerImgAPI = (distributionSite) => {
  return instance.get('/home/banner', {
    params: {
      distributionSite: distributionSite === undefined ? 1 : distributionSite
    },
  });
};

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const getNewAPI = () => {
  return instance({
    url: '/home/new',
  });
};

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return instance.get('home/hot');
};

export const getGoodsProductAPI = () => {
  return instance.get(`/home/goods`);
};
