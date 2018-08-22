import Vue from 'vue';
import Vuex from 'vuex';

import menu from '@/modules/menu';
import cart from '@/modules/cart';
import user from '@/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: [
    menu,
    cart,
    user,
  ],
});
