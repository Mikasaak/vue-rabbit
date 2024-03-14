import { useIntersectionObserver } from '@vueuse/core'
import {ref} from 'vue';

export const lazyLoadPlugin = {
  install(app) {
    app.directive('lazy', (el, binding) => {
      const targetIsVisible = ref(false);
      useIntersectionObserver(
          el,
          ([{isIntersecting}]) => {
            targetIsVisible.value = isIntersecting;
            console.log(isIntersecting);
            if (isIntersecting) {
              el.src = binding.value;
            }
          },
      );
    });
  },
};
