import instance from "@/utils/http.js";

export const getCheckoutInfoAPI = () => {
    return instance.get('/member/order/pre')
}
