'use strict';


window._ = require('lodash');

window.Popper = require('popper.js')


/* Vue */
import Vue from 'vue'
import VueRouter from 'vue-router'

var VueCookie = require('vue-cookie');

import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

Vue.config.devtools = true;
Vue.config.debug = true;


import Vuex from 'vuex'
import axios from 'axios'

import VModal from 'vue-js-modal'

Vue.use(VModal);

Vue.use(Vuex);

Vue.use(VueRouter);

Vue.use(VueCookie);

Vue.component('food', require('./vue/components/food.vue'));
Vue.component('mainmenu', require('./vue/components/mainmenu.vue'));
Vue.component('filters', require('./vue/components/filter.vue'));
Vue.component('search', require('./vue/components/search.vue'));
Vue.component('cartitem', require('./vue/components/cartitem.vue'));

Vue.prototype.$http = axios;

window.store = new Vuex.Store({
    state: {
        cart: [],
        area: 2,
        filters: [],
        q: '',
        authUser: {}
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
        setAuthUser: function (state, payload) {
            state.authUser = payload.value;
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
        "errors": {'register': {}, "login": {}},
        "phone": null
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
        checkForm: function (e) {


            let form = document.forms[e.srcElement.id.toString()];
            let formName = form.getAttribute('name');
            this.errors[formName] = {};


            if (!form.name.value) this.errors[formName].name = "Укажите имя.";
            if (!form.phone.value) {
                this.errors[formName].phone = "Укажите телефон";
            }
            if (typeof form.password != "undefined" && !form.password.value) {
                this.errors[formName].password = "Укажите пароль";
            }
            if (typeof form.password != "undefined" && form.password.length < 6) {
                this.errors[formName].password = "Длина пароля меньше 6 символов";
            }
            if (typeof form.password != "undefined" && form.password.value != form.password_confirm.value) {
                this.errors[formName].password_confirm = "Пароли не совпадают";
            }

            if (Object.keys(this.errors[formName]).length === 0) return true;
            e.preventDefault();
        },

        restorePassword: function () {

        },
        showRegister: function () {
            this.$modal.hide('login');
            this.$modal.show('register');
        },

        getAuthUser: async function (credentials) {

            try {
                let response = await this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/login', credentials);
                return response.data;
            } catch (error) {
                this.errors.login.request = "Неверные данные для входа";
                this.$forceUpdate();
            }

        },
        auth: function () {
            let formData = new FormData(document.querySelector('#auth-form'));

            let credentials = {};
            credentials.username = formData.get('username').replace(new RegExp('-', 'g'), '');
            credentials.password = formData.get('password');
            this.getAuthUser(credentials).then((authUser)=>{
                if (typeof authUser != "undefined") {
                    store.commit('setAuthUser', {'value': authUser});
                    this.$cookie.set('authUser', JSON.stringify(authUser), 1);
                    this.$modal.hide('login');
                }
            });
        },
        register: function (e) {

            if (this.checkForm(e)) {
                let formData = new FormData(document.querySelector('#reg-form'));
                let data = {};
                data.name = formData.get('name');
                data.phone = formData.get('phone').replace(new RegExp('-', 'g'), '');

                this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/regStep1', data).then((response) => {
                    if (!response.data.error) {
                        this.$modal.hide('register');
                        this.$modal.show('register2');
                    } else {
                        debugger;
                        this.errors[e.target.getAttribute('name')][response.data.error.code] = response.data.error.message;
                        this.$forceUpdate();
                    }
                }).catch((error) => {
                    console.log(error);

                });
            }
        },
        activate: function () {
            let formData = new FormData(document.querySelector('#reg-form2'));
            let data = {};
            data.code = formData.get('code');
            data.phone = formData.get('phone').replace(new RegExp('-', 'g'), '');
            data.password = formData.get('password');

            this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/regStep2', data).then((response) => {
                console.log(response.data);
                this.$modal.hide('register2');
                let credentials = {"username": data.phone, "password": data.password};
                this.getAuthUser(credentials);


            }).catch((error) => {
                console.log(error)
            });
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
        getCartSum:function(){
            let summ=0;
            store.state.cart.forEach((item)=>{
               summ+=item.price*item.count;
            });
            return summ+' ₽';
        },
        checkLogin: function () {
            if (Object.keys(store.state.authUser).length === 0 && store.state.authUser.constructor === Object) {
                return 0;
            } else {
                return 1;
            }

        },
        userInfo: function () {
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
            if (this.menu[store.state.area]){
                return this.menu[store.state.area].categs;
            }

        },
        cartItems:function(){
            return store.state.cart;
        }
    },

    mounted: function () {
        if (this.$cookie.get('authUser') != "undefined") {
            let authUser = JSON.parse(this.$cookie.get('authUser'));
            if (authUser && Object.keys(authUser).length !== 0) {
                store.commit('setAuthUser', {'value': authUser});
            }
        }

        if (this.$cookie.get('cart') != "undefined") {
            let cart = JSON.parse(this.$cookie.get('cart'));
            if (cart && Object.keys(cart).length !== 0) {
                store.state.cart = cart;
                this.$forceUpdate();
            }
        }
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


