import UserApi from '@/api/User';

export const actions = {
  login: 'modules/actions/login',
  registration: 'modules/actions/registration',
};

const mutations = {
  SET_USER: 'modules/actions/SET_USER',
};

export default {
  state: {
    user: null,
  },
  actions: {
    async [actions.login]({ commit }, credentials) {
      const User = new UserApi();
      const user = await User.login(credentials);
      commit(mutations.SET_USER, user);
    },
    async [actions.registration]({ commit }, credentials) {
      const User = new UserApi();
      const user = await User.registration(credentials);
      commit(mutations.SET_USER, user);
    },
  },
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user.userInfo;
      console.log(state.user);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
