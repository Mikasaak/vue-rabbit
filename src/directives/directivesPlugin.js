import { useIntersectionObserver } from '@vueuse/core'
import {ref} from 'vue';

/**
 * @deiscription: 图片懒加载指令注册插件
 * @type {{install(*): void}}
 */
export const lazyLoadPlugin = {
  install(app) {
    app.directive('lazy', (el, binding) => {
      const targetIsVisible = ref(false);
      const {stop}=useIntersectionObserver(
          el,
          ([{isIntersecting}]) => {
            targetIsVisible.value = isIntersecting;
            console.log(isIntersecting);
            if (isIntersecting) {
              el.src = binding.value;
              stop()
            }
          },
      );
    });
  },
};
