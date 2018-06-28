'use strict';


window._ = require('lodash');

window.Popper = require('popper.js')


/* Vue */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.devtools = true;
Vue.config.debug = true;


import Vuex from 'vuex'
import axios from 'axios'

import VModal from 'vue-js-modal'

Vue.use(VModal)

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
        area: 2,
        filters: [],
        q: '',
        authUser:{}
    },
    mutations: {
        loadFoods: function (state, payload) {
            state.foods = payload.value;
        },
        addToCart: function (state, payload) {
            state.cart.push(payload.value);
        },
        changeArea: function (state, payload) {
            state.area = payload.value;
        },
        addFilter: function (state, payload) {
            state.filters.push(payload.value);
        },
        changeSearchQuery: function (state, payload) {
            state.q = payload.value;
        },
        setAuthUser:function(state,payload){
            state.authUser=payload.value;
        }
    },
    getters: {},
    actions: {

    }

});


window.BurgerApp = new Vue({
    el: '#app',
    components: {},

    data: {
        "menu": [],
        "ready": false,
        "filters": ['Веганам', 'С рыбой', 'С говядиной', 'С курицей', 'С индейкой', 'С морепродуктами'],
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
        restorePassword:function(){

        },
        showRegister:function(){
            this.$modal.hide('login');
            this.$modal.show('register');
        },
        auth:function(){
            let formData = new FormData(document.querySelector('#auth-form'));
            let data={};
            data.username=formData.get('username');
            data.password=formData.get('password');

            this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/login',data).then((response)=>{
                console.log(response.data);
                this.$modal.hide('login');
                store.commit('setAuthUser',{'value':response.data});
            }).catch((error)=>{console.log(error)});
        },
        register:function(){
            let formData = new FormData(document.querySelector('#reg-form'));
            let data={};
            data.name=formData.get('name');
            data.phone=formData.get('phone');

            this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/regStep1',data).then((response)=>{
                console.log(response.data);
                this.$modal.hide('register');
                this.$modal.show('register2');
            }).catch((error)=>{console.log(error)});
        },
        activate:function(){
            let formData = new FormData(document.querySelector('#reg-form2'));
            let data={};
            data.code=formData.get('code');
            data.phone=formData.get('phone');
            this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/regStep2',data).then((response)=>{
                console.log(response.data);
                this.$modal.hide('register2');
                store.commit('setAuthUser',{'value':response.data});

            }).catch((error)=>{console.log(error)});
        },
        beforeOpen: function () {

        },
        beforeClose: function () {

        },
        show(modalName) {
            this.$modal.show(modalName);
        },
        hide(modalName) {
            this.$modal.hide(modalName);
        }
    },
    created: function () {


    },
    computed: {
        checkLogin:function(){
            if (Object.keys(store.state.authUser).length === 0 && store.state.authUser.constructor === Object){
                return 0;
            }else{
                return 1;
            }

        },
        userInfo:function(){
            return store.state.authUser.userInfo.FirstName;
        },


        currentArea: function () {
            return store.state.area;
        },
        foods: function () {
            if (store.state.q) {

                return this.menu[store.state.area].categs.filter(item =>
                    item.categName.toLowerCase().indexOf(store.state.q) > 0
                );

            }
            return this.menu[store.state.area].categs;
        }
    },
    mounted: function () {


        this.$http.get('http://89.223.25.82:3030/api/menu/getMenuFront').then((response) => {
            this.menu = response.data.menu;

            this.ready = true;


        }, (response) => {

        });

    }


});


let offsetHeight = document.querySelector('.header__topline').offsetHeight + document.querySelector('#slider').offsetHeight;


function fixedNavbar(e) {
    if (window.pageYOffset >= offsetHeight) {
        document.querySelector('#mainnavbar').classList.add("fixed");
    } else {
        document.querySelector('#mainnavbar').classList.remove("fixed");
    }
}

window.addEventListener('scroll', fixedNavbar);

document.querySelector('.login-link').addEventListener('click',(e)=>{
    e.preventDefault();
    BurgerApp.$modal.show('login');
});