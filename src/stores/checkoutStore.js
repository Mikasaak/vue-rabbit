import {defineStore} from "pinia";
import {ref,computed} from "vue";
import {getCheckoutInfoAPI} from "@/apis/checkout.js";


export const useCheckoutStore = defineStore('checkout', () => {
    const checkInfo = ref({})
    const defaultAddress = computed(()=>{
        let address = checkInfo.value.userAddresses?.find(item => item.isDefault===0)
        return address || {}
    })
    const getCheckoutInfo = async () => {
        const res = await getCheckoutInfoAPI()
        checkInfo.value = res.data.result
    }

    const changeDefaultAddress = (addressId) => {

        checkInfo.value.userAddresses.forEach(item => {
            if(item.id === addressId){
                item.isDefault = 0
            }else{
                item.isDefault = 1
            }
        })
    }


    return {
        checkInfo,
        defaultAddress,
        getCheckoutInfo,
        changeDefaultAddress
    }
});
