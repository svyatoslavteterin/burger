'use strict';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Subscribe to store updates
store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
});


var VueCookie = require('vue-cookie');
import VueTheMask from 'vue-the-mask';


import VModal from 'vue-js-modal'


import './registerServiceWorker'


Vue.use(VueTheMask);

Vue.use(VModal);
Vue.use(VueCookie);


import axios from "axios";

Vue.prototype.$http = axios;


Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.debug = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// let offsetHeight = document.querySelector('.header__topline').offsetHeight;

// if (document.querySelector('#slider')) {
//     offsetHeight += document.querySelector('#slider').offsetHeight;
// }


// function fixedNavbar() {
//     if (document.querySelector('#mainnavbar')) {
//         if (window.pageYOffset >= offsetHeight) {
//             document.querySelector('#mainnavbar').classList.add("fixed");
//         } else {
//             document.querySelector('#mainnavbar').classList.remove("fixed");
//         }
//     }
// }

// window.addEventListener('scroll', fixedNavbar);