import {defineStore} from "pinia";
import {ref,computed} from "vue";
import {loginAPI} from "@/apis/user.js";
import {watch} from "vue";
import {useCartStore} from "@/stores/cartStore.js";
export const useUserStore = defineStore(
    'user',
    () => {
        const cartStore = useCartStore()
        const userInfo = ref({})
        const getUserInfo = async ({account,password}) => {
            const res = await loginAPI({account,password});
            userInfo.value = res.data.result;
        }
        const isLogin = computed(() => !!userInfo.value.token)

        const clearUserInfo = () => {
            userInfo.value = {}
        }

        watch(isLogin, (newVal) => {
            if (!newVal) {//退出登录
                cartStore.clearCart()
            }else {//登录后合并购物车
                cartStore.mergeCartList()
            }
        })
        return {
            userInfo,
            getUserInfo,
            isLogin,
            clearUserInfo
        }
    },
    {
        persist: true,
    },
)
