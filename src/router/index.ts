import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About')
  }
];

const router = createRouter({
  // 这里采用hash模式
  // history模式比较麻烦，需要后端支持：https://router.vuejs.org/zh/guide/essentials/history-mode.html
  history: createWebHashHistory(),
  routes
});

export default router;
