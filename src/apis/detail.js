import instance from '@/utils/http'


/**
 *@description 获取商品详情
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getGoodsDetailAPI = (id) => {
    return instance.get(
        '/goods',
        {
            params: {
                id
            }
        }
    )
}
