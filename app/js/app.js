'use strict';


window._ = require('lodash');

window.Popper=require('popper.js')


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
Vue.component('filters', require('./vue/components/filter.vue'));
Vue.component('search', require('./vue/components/search.vue'));

Vue.prototype.$http = axios;

window.store = new Vuex.Store({
    state: {
        cart: [],
        area:2,
        filters:[],
        q:''
    },
    mutations: {
        loadFoods:function(state,payload){
          state.foods=payload.value;
        },
        addToCart:function(state,payload){
            state.cart.push(payload.value);
        },
        changeArea:function(state,payload){
            state.area=payload.value;
        },
        addFilter:function(state,payload){
            state.filters.push(payload.value);
        },
        changeSearchQuery:function(state,payload){
            state.q=payload.value;
        }
    },
    getters: {




    },
    actions: {}

});


window.BurgerApp = new Vue({
    el: '#app',
    components: {},

    data: {
        "menu": [],
        "ready":false,
        "filters":['Веганам','С рыбой','С говядиной','С курицей','С индейкой','С морепродуктами'],
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
        },
        foods:function(){
            if (store.state.q){

                    return this.menu[store.state.area].categs.filter(item =>
                        item.categName.toLowerCase().indexOf(store.state.q) > 0
                    );

            }
            return this.menu[store.state.area].categs;
        }
    },
    mounted: function () {


        this.$http.get('/getMenuFront.json').then((response) => {
            this.menu = response.data.menu;

            this.ready=true;


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