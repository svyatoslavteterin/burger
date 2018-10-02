import AddressApi from '@/api/Address';

export const actions = {
  searchAddress: 'modules/address/searchAddress',
  saveAddress: 'modules/address/saveAddress',
  getSelfDeliveryAddresses: 'modules/address/getSelfDeliveryAddresses',
  setPickupAddress: 'modules/address/setPickupAddress',
};

export const mutations = {
  SET_PICKUP_ADDRESSES: 'modules/address/SET_PICKUP_ADDRESSES',
  SAVE_ADDRESS: 'modules/address/SAVE_ADDRESS',
};

export default {
  state: {
    pickupAddress: {},
    fullAddr: {}
  },
  actions: {
    async [actions.searchAddress](ctx, address) {
      const Address = new AddressApi();
      const addresses = await Address.getAddressByStreet(address);
      return addresses;
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
    [mutations.SET_PICKUP_ADDRESSES](state, address) {
      state.pickupAddress = address;
    },
    [mutations.SAVE_ADDRESS](state, fullAddr) {
      state.fullAddr = fullAddr;
    }
  },
  getters: {
    addressBeforeLogin(state) {
      return state.fullAddr;
    },
    pickupAddress(state) {
      return state.pickupAddress;
    }
  }
};
