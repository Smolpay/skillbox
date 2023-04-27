import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },

   {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFoundPage,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
