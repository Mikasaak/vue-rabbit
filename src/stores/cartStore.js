import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {useUserStore} from "@/stores/useStorer.js";
import {
    addCartAPI,
    changeAllSelectedAPI,
    changeCartGoodsAPI,
    deleteCartAPI,
    getCartListAPI,
    margeCartListAPI
} from "@/apis/cart.js";

export const useCartStore = defineStore(
    'cart',
    () => {
        const cartList = ref([])
        const userStore = useUserStore()
        /**
         *
         * @param {Object} goods
         * @goods {
         * id: 商品id
         * name: //商品名称/
         * picture: ,//商品图片
         * price: //商品价格
         *count://商品数量
         *skuId: //skuId
         attrsText:/规格描述
         selected: //是否选中}
         */
        const addCart = async (goods) => {
            if (userStore.isLogin) {
                const res = await addCartAPI(goods)
                console.log('addCart', res)
                getCartList()

            } else {
                const find = cartList.value.find(item => item.skuId === goods.skuId)
                if (find) {
                    find.count += goods.count
                } else {
                    cartList.value.push(goods)
                }
            }

        }

        const getCartList = async () => {
            const res = await getCartListAPI()
            console.log('getCartList', res)
            cartList.value = res.data.result
        }


        let isAdding = false//防止重复添加 节流阀
        const changeCount = async (skuId,selected,count) => {
            if (userStore.isLogin) {
                if (!isAdding) {
                    isAdding = true
                    // let changeCount = 0
                    // console.log('changeCount', skuId, count)
                    // let find = cartList.value.find(item => item.skuId === skuId)
                    // changeCount = count - find.count
                    // console.log('find.count', find.count)
                    const res = await changeCartGoodsAPI({selected,count}, skuId)
                    console.log('res', res)
                    await getCartList()
                    isAdding = false
                }
            } else {
                const find = cartList.value.find(item => item.skuId === skuId)
                if (find && (count > 0)) {
                    find.count = count
                }
            }
        }


        const deleteGoods = async (skuId) => {
            if (userStore.isLogin) {
                const res = await deleteCartAPI([skuId])
                console.log('deleteGoods', res)
                getCartList()
            } else {
                const index = cartList.value.findIndex(item => item.skuId === skuId)
                if (index !== -1) {
                    cartList.value.splice(index, 1)
                }
            }
        }

        const clearCart = () => {
            cartList.value = []
        }

        const mergeCartList = async () => {
            if (userStore.isLogin) {
                const res = await margeCartListAPI(cartList.value.map(item => {
                    return {skuId: item.skuId, count: item.count, selected: item.selected}
                }))
                console.log('mergeCartList', res)
                getCartList()
            }
        }

        const setGoodsSelected = async (skuId, selected) => {
           if (userStore.isLogin) {
               const res = await changeCartGoodsAPI({selected}, skuId)
                console.log('setGoodsSelected', res)
                getCartList()
            }

            else {
                const find = cartList.value.find(item => item.skuId === skuId)
                if (find) {
                    // console.log('selected', selected)
                    find.selected = selected
                }
            }
        }


        const goodsCount = computed(() => cartList.value.reduce((prev, current) => prev + current.count, 0))

        const goodsTotalPrice = computed(() => cartList.value.reduce((prev, current) => prev + current.count * current.price, 0))

        const selectGoodsCount = computed(() => cartList.value.filter(item => item.selected).reduce((prev, current) => prev + current.count, 0))

        const selectGoodsTotalPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((prev, current) => prev + current.count * current.price, 0))

        const isAllSelected = computed({
            get() {
                return cartList.value.every(item => item.selected)
            },
            async set(value) {
                if (userStore.isLogin) {
                    const res = await changeAllSelectedAPI(value, cartList.value.map(item => item.skuId))
                    console.log('isAllSelected', res)
                    getCartList()
                }else {
                    cartList.value.forEach(item => item.selected = value)
                }
            }
        })
        return {
            cartList,
            goodsCount,
            goodsTotalPrice,
            isAllSelected,
            selectGoodsCount,
            selectGoodsTotalPrice,
            addCart,
            changeCount,
            deleteGoods,
            setGoodsSelected,
            clearCart,
            getCartList,
            mergeCartList
        }
    },


    {
        persist: true,
    },)
