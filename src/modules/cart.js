import findIndex from 'lodash/findIndex';
import forOwn from 'lodash/forOwn';
import { __values } from 'tslib';

export const actions = {
  addDishToCart: 'modules/actions/addDishToCart',
  removeDishFromCart: 'modules/actions/removeDishFromCart',
  toggleFilter: 'modules/actions/toggleFilter',
};

const mutations = {
  ADD_DISH: 'modules/actions/ADD_DISH',
  REMOVE_DISH: 'modules/actions/REMOVE_DISH',
  TOGGLE_FILTER: 'modules/actions/TOGGLE_FILTER',
};

export default {
  state: {
    cart: [],
    filters: {},
    filterDishes: [],
  },
  actions: {
    [actions.addDishToCart]({ commit }, dish) {
      commit(mutations.ADD_DISH, dish);
    },
    [actions.removeDishFromCart]({ commit }, dish) {
      commit(mutations.REMOVE_DISH, dish);
    },
    [actions.toggleFilter]({ commit }, tag) {
      commit(mutations.TOGGLE_FILTER, tag);
    },
  },
  mutations: {
    [mutations.ADD_DISH](state, dish) {
      dish.position = state.cart.length ?
        state.cart.length + 1 :
        1;
      state.cart.push(dish);
    },
    [mutations.REMOVE_DISH](state, dish) {
      const idx = findIndex(
        state.cart,
        { id: dish.id, position: dish.position },
      );

      dish.count = 0;
      state.cart.splice(idx, 1);
    },
    [mutations.TOGGLE_FILTER](state, tag) {
      state.filterDishes = [];

      if (state.filters[tag.tagName]) {
        state.filters = {
          ...state.filters,
          [tag.tagName]: null,
        };
        delete state.filters[tag.tagName];

        forOwn(state.filters, (value, _) => {
          state.filterDishes = state.filterDishes.concat(value);
        });

        return;
      }

      state.filters = {
        ...state.filters,
        [tag.tagName]: tag.dishes,
      };

      forOwn(state.filters, (value, _) => {
        state.filterDishes = state.filterDishes.concat(value);
      });
    },
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    cartSumm(state) {
      let summ = 0;
      state.cart.forEach((dish) => {
        summ += parseFloat(dish.Price) * dish.count;
      });
      return summ;
    },
    filters(state) {
      return state.filters;
    },
    filterDishes(state) {
      return state.filterDishes;
    },
  },
};
