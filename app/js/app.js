'use strict';


window._ = require('lodash');

/* Vue */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.devtools = true;
Vue.config.debug = true;


import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

Vue.use(VueRouter);

Vue.component('food', require('./vue/components/food.vue'));
Vue.component('mainmenu', require('./vue/components/mainmenu.vue'));

Vue.prototype.$http = axios;

window.store = new Vuex.Store({
    state: {
        cart: [],
        area:2
    },
    mutations: {
        addToCart:function(state,payload){
            state.cart.push(payload.value);
        },
        changeArea:function(state,payload){
            state.area=payload.value;
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
    computed: {
        currentArea:function(){
            return store.state.area;
        }
    },
    mounted: function () {


        this.$http.get('http://89.223.25.82:3030/api/menu/getMenuFront').then((response) => {
            this.menu = response.data.menu;

        }, (response) => {

        });

    }


});




let offsetHeight=document.querySelector('.header__topline').offsetHeight+document.querySelector('#slider').offsetHeight;


function fixedNavbar(e) {
    if (window.pageYOffset >= offsetHeight) {
        document.querySelector('#mainnavbar').classList.add("fixed");
    } else {
        document.querySelector('#mainnavbar').classList.remove("fixed");
    }
}

window.addEventListener('scroll', fixedNavbar);