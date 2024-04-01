import instance from "@/utils/http.js";

export const getOrderAPI = (id) => {
    return instance.get(`/member/order/${id}`)
}
