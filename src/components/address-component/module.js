export const actions = {
  searchAddress: 'modules/names/searchAddress',
  clearSearchAddress: 'modules/names/clearSearchAddress',
  saveAddress: 'modules/names/saveAddress'
};

export const mutations = {
  SET_ADDRESSES: 'modules/names/SET_ADDRESSES',
  REMOVE_ADDRESSES: 'modules/names/REMOVE_ADDRESSES',
  SAVE_ADDRESS: 'modules/names/SAVE_ADDRESS'
};

export default {
  state: {
    addresses: [],
    fullAddr: {}
  },
  actions: {
    async [actions.searchAddress]({ commit, state }, address) {
      const Address = new AddressApi();
      const addresses = await Address.getAddressByStreet(address);

      commit(mutations.SET_ADDRESSES, addresses);
    },
    [actions.clearSearchAddress]({ commit }) {
      commit(mutations.REMOVE_ADDRESSES);
    },
    [actions.saveAddress]({ commit }, fullAddr) {
      commit(mutations.SAVE_ADDRESS, fullAddr);
    }
  },
  mutations: {
    [mutations.SET_ADDRESSES](state, addresses) {
      state.addresses = Object.keys(addresses).map((key) => {
        // eslint-disable-next-line
        const houses = Object.keys(addresses[key].houses).map((hKey) => addresses[key].houses[hKey]);
        addresses[key].houses = houses;
        return addresses[key];
      });
    },
    [mutations.REMOVE_ADDRESSES](state) {
      state.addresses = [];
      state.fullAddr = {};
    },
    [mutations.SAVE_ADDRESS](state, fullAddr) {
      state.fullAddr = fullAddr;
    }
  },
  getters: {
    addresses(state) {
      return state.addresses;
    },
    addressBeforeLogin(state) {
      return state.fullAddr;
    }
  }
};
