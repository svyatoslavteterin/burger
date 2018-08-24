import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import CartPage from './views/CartPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/cart',
      name: 'CartPage',
      component: CartPage,
    },
  ],
});
