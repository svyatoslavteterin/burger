import UserApi from '@/api/User';

export const actions = {
  login: 'modules/user/login',
  regStep1: 'modules/user/regStep1',
  regStep2: 'modules/user/regStep2',
  resetPass: 'modules/user/resetPass',
  checkCode: 'modules/user/checkCode',
};

const mutations = {
  SET_USER: 'modules/user/SET_USER',
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
      commit(mutations.SET_USER, user);
      return true;
    },
    async [actions.regStep1](ctx, credentials) {
      const User = new UserApi();
      const data = await User.regStep1(credentials);
      return data;
    },
    async [actions.regStep2]({ dispatch }, credentials) {
      const User = new UserApi();
      const data = await User.regStep2(credentials);
      if (data) {
        const userCred = {
          username: credentials.phone,
          password: credentials.password,
        };
        setTimeout(() => {
          dispatch(actions.login, userCred);
        }, 1500);
      }
      return data;
    },
    async [actions.resetPass](ctx, phone) {
      const User = new UserApi();
      const data = await User.resetPass(phone);
      return data;
    },
    async [actions.checkCode](ctx, credentials) {
      const User = new UserApi();
      const data = await User.checkCodeResetPassword(credentials);
      return data;
    },
  },
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user.userInfo;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
