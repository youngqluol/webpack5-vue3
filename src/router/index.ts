import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@src/views/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@src/views/About.vue')
  }
];

// 这里采用hash模式，history模式比较麻烦，需要后端支持
// https://router.vuejs.org/zh/guide/essentials/history-mode.html
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
