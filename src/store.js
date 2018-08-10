import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import currencyFormatter from 'currency-formatter';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    area: 2,
    filters: [],
    q: '',
    authUser: {},
    deliveryInfo: {}
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


          }).catch((error) => {
            store.authUser = {};
            this.replaceState(
              Object.assign(state, store)
            );
            localStorage.setItem('store', JSON.stringify(store));
          });
        }

      }
    },
    setDeliveryInfo: function (state, payload) {
      state.deliveryInfo = payload;
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

        const mod = dish[payload.modData.modType].find(p => p.id === payload.modData.id);

        if (!mod) {
          dish[payload.modData.modType].push(Object.assign(payload.modData, {
            count: 1,
            summ: payload.modData.price
          }));
        } else {
          if (mod.modType === "mods") {
            mod.count++;
            mod.summ = mod.count * mod.price | 0;
          }
        }
      } else {
        alert('Сначала добавьте блюдо в корзину');
      }
    },
    removeModFromDish: function (state, payload) {
      const dish = state.cart.find(p => p.id === payload.id);

      const mod = dish[payload.modType].find(p => p.id === payload.modId);

      if (mod) {
        let modifiedMods = dish[payload.modType].filter((item) => item.id != payload.modId);
        dish[payload.modType] = modifiedMods;
      }
    },
    incModCount: function (state, payload) {
      const dish = state.cart.find(p => p.id === payload.id);
      if (dish) {
        const mod = dish.mods.find(p => p.id === payload.modId);

        if (mod) {
          mod.count++;
          mod.summ = mod.count * mod.price | 0;
        }
      } else {
        alert('Сначала добавьте блюдо в корзину');
      }
    },
    decModCount: function (state, payload) {
      const dish = state.cart.find(p => p.id === payload.id);

      const mod = dish.mods.find(p => p.id === payload.modId);

      if (mod) {
        if (mod.count > 0) {
          mod.count--;
          mod.summ = mod.count * mod.price | 0;
        }
      }
    },
    removeFromCart: function (state, dishId) {
      console.log(dishId);
      let modifiedCart = state.cart.filter((item) => item.id != dishId);

      state.cart = modifiedCart;

    },
    clearCart: function (state) {
      state.cart = [];
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

      let index = state.filters.indexOf(payload.value);
      if (index >= 0) {
        state.filters.splice(index, 1)
      } else {
        state.filters.push(payload.value);
      }

    },
    changeSearchQuery: function (state, payload) {
      state.q = payload.value.toLowerCase();
    },
    setAuthUser: function (state, payload) {
      state.authUser = payload.value;
    }
  },
  getters: {
    getDishSum(state) {
      const {cart} = state;
      let summ = 0;

      if (cart.length > 0) {
        cart.forEach(item => {
          summ += +item.price * item.count;
        });
      }
      return summ;
    },

    getModsSum(state) {
      const {cart} = state;
      let summ = {};

      if (cart.length > 0) {
        cart.forEach(item => {
          if (item.mods.length > 0) {
            summ[item.id] = 0;
            item.mods.forEach(mod => {
              summ[item.id] += +mod.summ;
            });
          }
        });
      }

      return summ;
    },
    getCartSum(state) {
      const {cart} = state;
      let summ = 0;

      if (cart.length > 0) {
        cart.forEach(item => {
          summ += +item.price * item.count;
          if (item.mods.length > 0) {
            item.mods.forEach(mod => {
              summ += +mod.summ;
            });
          }
        });

      }

      return currencyFormatter.format(summ, {code: 'RUB', precision: 0});
    },
  },
  actions: {}

})
