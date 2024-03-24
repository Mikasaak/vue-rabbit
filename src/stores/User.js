import {defineStore} from "pinia";
import {ref,computed} from "vue";
import {loginAPI} from "@/apis/user.js";

export const useUserStore = defineStore(
    'user',
    () => {
        const userInfo = ref({})
        const getUserInfo = async ({account,password}) => {
            const res = await loginAPI({account,password});
            userInfo.value = res.data.result;
        }
        const isLogin = computed(() => !!userInfo.value.token)

        const clearUserInfo = () => {
            userInfo.value = {}
        }
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
