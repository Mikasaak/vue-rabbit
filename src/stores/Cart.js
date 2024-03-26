import {defineStore} from "pinia";
import {ref,computed} from "vue";

export const useCartStore = defineStore(
    'cart',
    () => {
        const cartList = ref([])


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
        const addCart = (goods) => {
            const find = cartList.value.find(item => item.id === goods.id)
            if (find) {
                find.count+=goods.count
            } else {
                cartList.value.push(goods)
            }
        }
        const changeCount = (id, count) => {
            const find = cartList.value.find(item => item.id === id)
            if (find&&count>0) {
                find.count = count
            }
        }
        const deleteGoods = (id) => {
            const index = cartList.value.findIndex(item => item.id === id)
            if (index !== -1) {
                cartList.value.splice(index, 1)
            }
        }

        const setGoodsSelected = (id, selected) => {
            const find = cartList.value.find(item => item.id === id)
            if (find) {
                // console.log('selected', selected)
                find.selected = selected
            }
        }

        const goodsCount = computed(() => cartList.value.reduce((prev, current) => prev + current.count, 0))

        const goodsTotalPrice = computed(() => cartList.value.reduce((prev, current) => prev + current.count * current.price, 0))

        const selectGoodsCount = computed(() => cartList.value.filter(item => item.selected).reduce((prev, current) => prev + current.count, 0))

        const selectGoodsTotalPrice = computed(() => cartList.value.filter((item)=>item.selected).reduce((prev, current) => prev + current.count * current.price, 0))

        const isAllSelected  = computed({
            get() {
                return cartList.value.every(item => item.selected)
            },
            set(value) {
                cartList.value.forEach(item => item.selected = value)
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
        }
        },


    {
        persist: true,
    },)
