import instance from "@/utils/http.js";


/**\
 * @description 获取购物车列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getCartListAPI = () => {
    return instance.get('/member/cart');
}


/**
 * @description 添加购物车
 * @param {string} skuId
 * @param {number} count
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const addCartAPI = ({skuId,count}) => {
    return instance.post('/member/cart', {skuId,count});
}


/**
 * @description 修改购物车商品数量
 * @param {boolean}selected
 * @param {number}count
 * @param {string}id 商品sku的id(不是商品id)
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const changeCartGoodsAPI = ({selected,count}, id) => {
    return instance.put(`/member/cart/${id}`, {selected,count});
}


/**
 *
 * @param {Array} ids
 * @param {string} ids[i]
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const deleteCartAPI = (ids) => {
    return instance.delete(`/member/cart`, {data: {ids:[...ids]}
    });
}


/**
 *@description 合并购物车
 * @param {Array} cartList
 * @param {Object} cartList[i]
 * @param {String} cartList[i].skuId
 * @param {Number} cartList[i].count
 * @param {Boolean} cartList[i].selected
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export const margeCartListAPI = (cartList) => {
    return instance.post('/member/cart/merge', [...cartList]);
}
