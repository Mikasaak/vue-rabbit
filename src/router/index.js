import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory(),
    // history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            component: () => import('@/views/Layout/index.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/views/Layout/Home/Home.vue'),
                },
                {
                    path: 'category/:id',
                    component: () => import('@/views/Layout/Category/Category.vue'),
                },
                {
                    path:'category/sub/:id',
                    component: () => import('@/views/Layout/SubCategory/SubCategory.vue'),
                },
                {
                    path: 'detail/:id',
                    component: () => import('@/views/Layout/Detail/Detail.vue'),
                },
                {
                    path: 'cartlist',
                    component: () => import('@/views/Layout/CartList/CartList.vue'),
                }
            ],

        },
        {
            path: '/login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/Login/index.vue'),
        },
    ],

    //路由跳转后滚动条回到顶部
    scrollBehavior() {
        return {top: 0};
    }
});

export default router;
