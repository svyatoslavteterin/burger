import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Cart from './views/Cart';

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
      name: 'Cart',
      component: Cart,
    },
  ],
});
