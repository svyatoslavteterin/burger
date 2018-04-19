'use strict';


window._ = require('lodash');

/* Vue */
import Vue from 'vue'

Vue.config.devtools = true;
Vue.config.debug = true;


import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

Vue.component('food', require('./vue/components/food.vue'));

Vue.prototype.$http = axios;

window.store = new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        addToCart:function(state,payload){
            state.cart.push(payload.value);
        }
    },
    getters: {},
    actions: {}

});


window.BurgerApp = new Vue({
    el: '#app',
    components: {},

    data: {
        "menu": []
    },
    watch: {
        show(val) {
            if (val) {


            }
        }
    },
    updated: function () {

    },
    methods: {
        beforeOpen: function () {

        },
        beforeClose: function () {

        }


    },
    created: function () {


    },
    computed: {},
    mounted: function () {


        this.$http.get('http://89.223.25.82:3030/api/menu/getMenuFront').then((response) => {
            this.menu = response.data.menu[2];

        }, (response) => {

        });

    }


});