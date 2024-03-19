import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Layout/Home/Home.vue'),
        }, {
          path: 'category/:id',
          component: () => import('@/views/Layout/Category/Category.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/Layout/Category/MainCategory/MainCategory.vue'),
            },
            {
              path: 'sub/:subid',
              component: () => import('@/views/Layout/Category/SubCategory/SubCategory.vue'),
            },
          ],
        }],

    },
    {
      path: '/login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Login/index.vue'),
    },
  ],
});

export default router;
