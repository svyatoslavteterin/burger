import UserApi from '@/api/User';

export const actions = {
  login: 'modules/actions/login',
  regStep1: 'modules/actions/regStep1',
  regStep2: 'modules/actions/regStep2',
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
      if (!user) {
        return false;
      }
      return commit(mutations.SET_USER, user);
    },
    async [actions.regStep1](ctx, credentials) {
      const User = new UserApi();
      const data = await User.regStep1(credentials);
      return data;
    },
    async [actions.regStep2]({ commit }, credentials) {
      const User = new UserApi();
      const data = await User.regStep2(credentials);
      commit(mutations.SET_USER, data);
      return data;
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
