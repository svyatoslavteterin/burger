import AddressApi from '@/api/Address';

export const actions = {
  searchAddress: 'modules/address/searchAddress',
  clearSearchAddress: 'modules/address/clearSearchAddress',
  saveAddress: 'modules/address/saveAddress',
  getSelfDeliveryAddresses: 'modules/address/getSelfDeliveryAddresses',
  setPickupAddress: 'modules/address/setPickupAddress',
};

export const mutations = {
  SET_ADDRESSES: 'modules/address/SET_ADDRESSES',
  SET_PICKUP_ADDRESSES: 'modules/address/SET_PICKUP_ADDRESSES',
  REMOVE_ADDRESSES: 'modules/address/REMOVE_ADDRESSES',
  SAVE_ADDRESS: 'modules/address/SAVE_ADDRESS',
};

export default {
  state: {
    addresses: [],
    pickupAddress: {},
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
    },
    async [actions.getSelfDeliveryAddresses]() {
      const Address = new AddressApi();
      const addresses = await Address.getSelfDeliveryAddresses();
      return addresses;
    },
    [actions.setPickupAddress]({ commit }, address) {
      commit(mutations.SET_PICKUP_ADDRESSES, address);
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
    [mutations.SET_PICKUP_ADDRESSES](state, address) {
      state.pickupAddress = address;
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
    },
    pickupAddress(state) {
      return state.pickupAddress;
    }
  }
};
