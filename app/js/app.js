'use strict';


window._ = require('lodash');

window.Popper = require('popper.js')


/* Vue */
import Vue from 'vue'
import VueRouter from 'vue-router'

var _ = require('lodash');
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
Vue.component('cart', require('./vue/components/cart.vue'));
Vue.component('cartitem', require('./vue/components/cartitem.vue'));
Vue.component('dishmod', require('./vue/components/dishmod.vue'));

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
        initialiseStore(state) {
            // Check if the ID exists
            let localStore = localStorage.getItem('store');

            if (localStore) {
                let store = JSON.parse(localStore);
                // Replace the state object with the stored item
                this.replaceState(
                    Object.assign(state, store)
                );
                if (store.authUser) {
                    axios.get('https://apitest.burgerpizzoni.ru/api/Profiles/getByToken?tokenId=' + store.authUser.id).then((response) => {
                        if (response.data.error) {
                            store.authUser = {};
                            this.replaceState(
                                Object.assign(state, store)
                            );
                        }

                    });
                }

            }
        },
        loadFoods: function (state, payload) {
            state.foods = payload.value;
        },
        addToCart: function (state, payload) {
            const dish = state.cart.find(p => p.id === payload.value.id);


            if (!dish) {
                state.cart.push(Object.assign(payload.value, {
                    count: 1
                }));
            } else {
                dish.count++;
            }
        },
        addModToDish: function (state, payload) {
            const dish = state.cart.find(p => p.id === payload.id);
            if (dish) {
                const mod = dish.mods.find(p => p.id === payload.modData.id);

                if (!mod) {
                    dish.mods.push(Object.assign(payload.modData, {
                        count: 1,
                        summ: payload.modData.price
                    }));
                } else {
                    mod.count++;
                    mod.summ = mod.count * mod.price | 0;
                }
            }else{
                alert('Сначала добавьте блюдо в корзину');
            }
        },
        removeModFromDish: function (state, payload) {
            const dish = state.cart.find(p => p.id === payload.id);

            const mod = dish.mods.find(p => p.id === payload.modId);

            if (mod) {
                let modifiedMods = dish.mods.filter((item) => item.id != payload.modId);
                dish.mods = modifiedMods;
            }
        },
        incModCount: function (state, payload) {
            const dish = state.cart.find(p => p.id === payload.id);
            if (dish) {
                const mod = dish.mods.find(p => p.id === payload.modId);

                if (!mod) {

                } else {
                    mod.count++;
                }
            }else{
                alert('Сначала добавьте блюдо в корзину');
            }
        },
        decModCount: function (state, payload) {
            const dish = state.cart.find(p => p.id === payload.id);

            const mod = dish.mods.find(p => p.id === payload.modId);

            if (!mod) {

            } else {
                if (mod.count > 0) {
                    mod.count--;
                }
            }
        },
        removeFromCart: function (state, dishId) {
            console.log(dishId);
            let modifiedCart = state.cart.filter((item) => item.id != dishId);

            state.cart = modifiedCart;

        },

        addEquentity: function (state, payload) {
            const dish = state.cart.find(p => p.id === payload.value.id);

            dish.count++;


        },
        removeEquentity: function (state, payload) {
            const dish = state.cart.find(p => p.id === payload.value.id);
            if (dish.count >= 2) {
                dish.count--;
            }
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
    actions: {}

});

// Subscribe to store updates
store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
});


window.BurgerApp = new Vue({
    el: '#app',
    store,
    beforeCreate() {
        this.$store.commit('initialiseStore');
    },
    components: {},

    data: {
        "menu": [],
        "ready": false,
        "filters": ['Веганам', 'С рыбой', 'С говядиной', 'С курицей', 'С индейкой', 'С морепродуктами'],
        "errors": {'register': {}, "login": {}, "register2": {}, "restorepassword": {}, "restorepassword2": {}},
        "phone": null,
        "password": null,
        "passwordConfirm": null
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


            if (typeof form.fullname != "undefined" && !form.fullname.value) {
                this.errors[formName].fullname = "Укажите имя";
            }
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
            if (typeof form.code != "undefined" && !form.code.value) {
                this.errors[formName].code = "Укажите код";
            }

            if (Object.keys(this.errors[formName]).length === 0) return true;
            e.preventDefault();
        },

        restorePassword: function () {
            this.$modal.hide('login');
            this.$modal.show('restorepassword');
        },
        getRestoreCode: function (e) {
            let formData = new FormData(document.querySelector('#restorepassword-form'));
            let data = {};
            data.phone = formData.get('phone').replace(new RegExp('-', 'g'), '');

            axios.post('https://apitest.burgerpizzoni.ru/api/Profiles/resetPass', data).then((response) => {
                if (!response.data.error) {
                    this.$modal.hide('restorepassword');
                    this.$modal.show('restorepassword2');
                } else {
                    this.errors[e.target.getAttribute('name')][response.data.error.code] = response.data.error.message;
                    this.$forceUpdate();
                }
            }).catch((error) => {
                console.log(error.message);
            });
        },
        activateNewPassword: function (e) {
            if (this.checkForm(e)) {
                let formData = new FormData(document.querySelector('#restorepassword-form2'));
                let data = {};
                data.code = formData.get('code');
                data.phone = formData.get('phone').replace(new RegExp('-', 'g'), '');
                data.password = formData.get('password');

                let credentials = {"username": data.phone, "password": data.password};

                this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/checkCodeResetPassword', data).then((response) => {

                    if (!response.data.error) {

                        this.getAuthUser(credentials).then((authUser) => {
                            console.log(authUser);
                            if (typeof authUser != "undefined") {
                                store.commit('setAuthUser', {'value': authUser});
                                this.$cookie.set('authUser', JSON.stringify(authUser), 1);
                                this.$modal.hide('restorepassword2');
                            } else {
                                this.getAuthUser(credentials).then((authUser) => {
                                    if (typeof authUser != "undefined") {
                                        store.commit('setAuthUser', {'value': authUser});
                                        this.$cookie.set('authUser', JSON.stringify(authUser), 1);
                                        this.$modal.hide('restorepassword2');
                                    }
                                });
                            }
                        });


                    } else {
                        this.errors[e.target.getAttribute('name')][response.data.error.code] = response.data.error.message;
                        this.$forceUpdate();
                    }

                }).catch((error) => {
                    console.log(error)
                });
            }
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
            this.getAuthUser(credentials).then((authUser) => {
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
                data.name = formData.get('fullname');
                data.phone = formData.get('phone').replace(new RegExp('-', 'g'), '');

                this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/regStep1', data).then((response) => {
                    if (!response.data.error) {
                        this.$modal.hide('register');
                        this.$modal.show('register2');
                    } else {
                        this.errors[e.target.getAttribute('name')][response.data.error.code] = response.data.error.message;
                        this.$forceUpdate();
                    }
                }).catch((error) => {
                    console.log(error);

                });
            }
        },
        activate: function (e) {
            if (this.checkForm(e)) {
                let formData = new FormData(document.querySelector('#reg-form2'));
                let data = {};
                data.code = formData.get('code');
                data.phone = formData.get('phone').replace(new RegExp('-', 'g'), '');
                data.password = formData.get('password');

                let credentials = {"username": data.phone, "password": data.password};

                this.$http.post('http://apitest.burgerpizzoni.ru/api/Profiles/regStep2', data).then((response) => {

                    if (!response.data.error) {

                        this.getAuthUser(credentials).then((authUser) => {
                            console.log(authUser);
                            if (typeof authUser != "undefined") {
                                store.commit('setAuthUser', {'value': authUser});
                                this.$cookie.set('authUser', JSON.stringify(authUser), 1);
                                this.$modal.hide('register2');
                            } else {
                                this.getAuthUser(credentials).then((authUser) => {
                                    if (typeof authUser != "undefined") {
                                        store.commit('setAuthUser', {'value': authUser});
                                        this.$cookie.set('authUser', JSON.stringify(authUser), 1);
                                        this.$modal.hide('register2');
                                    }
                                });
                            }
                        });


                    } else {
                        this.errors[e.target.getAttribute('name')][response.data.error.code] = response.data.error.message;
                        this.$forceUpdate();
                    }

                }).catch((error) => {
                    console.log(error)
                });
            }
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
        getCartSum: function () {
            let summ = 0;
            store.state.cart.forEach((item) => {

                let itemPrice = +item.price;
                if (item.mods.length > 0) {
                    item.mods.forEach((mod) => {
                        itemPrice += +mod.summ;
                    });
                }
                summ += itemPrice * item.count;
            });
            return summ + ' ₽';
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
            if (this.menu[store.state.area]) {
                return this.menu[store.state.area].categs;
            }

        },
        cartItems: function () {
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


let offsetHeight = document.querySelector('.header__topline').offsetHeight;

if (document.querySelector('#slider')) {
    offsetHeight += document.querySelector('#slider').offsetHeight;
}


function fixedNavbar(e) {
    if (document.querySelector('#mainnavbar')) {
        if (window.pageYOffset >= offsetHeight) {
            document.querySelector('#mainnavbar').classList.add("fixed");
        } else {
            document.querySelector('#mainnavbar').classList.remove("fixed");
        }
    }
}

window.addEventListener('scroll', fixedNavbar);


