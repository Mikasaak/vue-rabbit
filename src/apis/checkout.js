import instance from "@/utils/http.js";

export const getCheckoutInfoAPI = () => {
    return instance.get('/member/order/pre')
}

/**
 * @description 设置默认地址
 * @param addressId
 * @param receiver
 * @param contact
 * @param provinceCode
 * @param cityCode
 * @param countyCode
 * @param address
 * @param postalCode
 * @param addressTags
 * @param isDefault
 * @param fullLocation
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const changeAddressAPI = (addressId, {
    receiver,
    contact,
    provinceCode,
    cityCode,
    countyCode,
    address,
    postalCode,
    addressTags,
    isDefault,
    fullLocation,
    id
}) => {
    return instance.put(`/member/address/${addressId}`, {
        receiver,
        contact,
        provinceCode,
        cityCode,
        countyCode,
        address,
        postalCode,
        addressTags,
        isDefault,
        fullLocation,
        id
    })
}


export const createOrderAPI = ({deliveryTimeType, payType, payChannel, buyerMessage, goods, addressId}) => {
    return instance.post('/member/order', {deliveryTimeType, payType, payChannel, buyerMessage, goods, addressId})
}
