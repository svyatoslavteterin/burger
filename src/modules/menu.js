import MenuApi from '@/api/Menu';
import axios from 'axios';

export const actions = {
  getMenu: 'modules/menu/getMenu',
};

const mutations = {
  SET_MENU: 'modules/menu/SET_MENU',
};

export default {
  state: {
    menu: [],
    menuIndexes: {},
    menuIndexesTags: [],
  },
  actions: {
    [actions.getMenu]({ commit }) {
      const Menu = new MenuApi();

      axios.all([
        Menu.getMenu(),
        Menu.getIndexes(),
        Menu.getIndexesTags(),
      ])
        .then(axios.spread((menu, menuIndexes, menuIndexesTags) => {
          commit(mutations.SET_MENU, { menu, menuIndexes, menuIndexesTags });
        }));
    },
  },
  mutations: {
    [mutations.SET_MENU](state, { menu, menuIndexes, menuIndexesTags }) {
      state.menu = menu;
      state.menuIndexes = menuIndexes;
      state.menuIndexesTags = menuIndexesTags;
    },
  },
  getters: {
    menu(state) {
      return state.menu;
    },
    menuIndexes(state) {
      return state.menuIndexes;
    },
    menuIndexesTags(state) {
      return state.menuIndexesTags;
    },
  },
};
