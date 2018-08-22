import findIndex from 'lodash/findIndex';

export const actions = {
  addDishToCart: 'modules/actions/addDishToCart',
  removeDishFromCart: 'modules/actions/removeDishFromCart',
};

const mutations = {
  ADD_DISH: 'modules/actions/ADD_DISH',
  REMOVE_DISH: 'modules/actions/REMOVE_DISH',
};

export default {
  state: {
    cart: [],
  },
  actions: {
    [actions.addDishToCart]({ commit }, dish) {
      commit(mutations.ADD_DISH, dish);
    },
    [actions.removeDishFromCart]({ commit }, dish) {
      commit(mutations.REMOVE_DISH, dish);
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
  },
};
