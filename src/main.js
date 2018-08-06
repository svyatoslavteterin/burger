'use strict';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import currencyFormatter from 'currency-formatter';

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});


var VueCookie = require('vue-cookie');
import VueTheMask from 'vue-the-mask';


import VModal from 'vue-js-modal';


import './registerServiceWorker';


Vue.use(VueTheMask);

Vue.use(VModal);
Vue.use(VueCookie);


import axios from "axios";

Vue.prototype.$http = axios;

Vue.prototype.$currencyFormatter = currencyFormatter;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
