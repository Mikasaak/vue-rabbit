import {onBeforeRouteUpdate, useRoute} from 'vue-router';
import {onMounted, ref} from 'vue';
import {useCategoryStore} from '@/stores/Category.js';
import {getTopCategoryAPI} from '@/apis/category.js';

export function useCategory  (emit=()=>{}){
  const route = useRoute();
  const categoryData = ref({});
  const categoryStore = useCategoryStore()
  const getCategoryDate = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id);
    categoryData.value = res.data.result;
    emit("update:categoryData",categoryData.value);
  };


  onMounted(() => {
    getCategoryDate();
  });
  // watch(() => route.params.id, (newValue,oldValue) => {
  //   console.log("old",oldValue);
  //   console.log("new",newValue);
  //   getCategoryDate();
  //   console.log("路由变化了");
  //
  // });

  onBeforeRouteUpdate((to, from, next) => {
    getCategoryDate(to.params.id);
    console.log(to);
    next();
  });
  return {
    categoryData,categoryStore
  }
}
