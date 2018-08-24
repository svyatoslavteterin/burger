<template>
  <modal
    name="delivery"
    class="delivery"
    height="auto"
    :classes="'v--modal with-overflow-off'"
    @opened="openedModal"
    @closed="closedModal"
    adaptive
    v-cloak
  >
    <div class="modal-header">
      <button @click="$modal.hide('delivery')" class="info-modal-close"></button>

      <div class="info-yellow-block">Способ покупки</div>

      <button
        :class="{
          'tab-name': true, 
          'active': activeTab == 1 
        }"
        @click="activeTab = 1"
        v-text="'Доставка'"
      />
      <button
        :class="{
          'tab-name': true, 
          'active': activeTab == 2 
        }"
        @click="activeTab = 2"
        v-text="'Самовывоз'"
      />
    </div>

    <div v-if="activeTab === 1" class="modal-wrapper delivery">

      <div class="hello-message">Введите ваш адрес и мы сообщим, входит ли он в зону доставки</div>
      <Delivery />

      <div v-if="okDelivery" class="thank-you-message">
        <p>Спасибо!</p>
        <p>Ваш адрес входит в зону нашей доставки.</p>
        <p>Нажмите ОК, если подтверждаете доставку по адресу:</p>
        <p class="address">г. Санкт-Петербург, ул. Петрозаводская 13, кв. 48, подъезд 14, этаж 21</p>
        <p>Мы доставим ваше заказ в течении 30 минут</p>
        <button @click="okDelivery = !okDelivery">ОК</button>
      </div>

    </div> <!--modal-wrapper-->

    <Pickup v-if="activeTab === 2" />

  </modal>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import modalActions from '@/mixins/modalActions';
import Login from '@/components/Login';
import Delivery from './delivery';
import Pickup from './pickup';
import './style.scss';

export default {
  name: 'DeliveryForm',
  components: {
    VuePerfectScrollbar,
    Login,
    Delivery,
    Pickup
  },
  mixins: [modalActions],
  data() {
    return {
      okButton: false,
      okDelivery: false,
      okSelfDelivery: false,
      deliveryInfo: {
        Street: '',
        House: '',
        Housing: '',
        Structure: '',
        Office: '',
        Entrance: '',
        DoorphoneСode: '',
        Floor: '',
        Apartment: '',
      },
      activeTab: 1,
      addresses: [],
      houses: [],
      house: '',
      q: '',
      address: '',
      street: '',
    };
  },
  methods: {

    checkAddress(e) {
      const container = e.target.parentNode;

      const addressValue = container.querySelector('.address-value').innerText;
      this.address = addressValue;
    },
    clearSearch() {
      this.q = '';
    },
    setStreet(street) {
      this.deliveryInfo.Street = street;
    },
    setHouse(house) {
      this.deliveryInfo.House = house;
    },
    async getAdresses() {
      try {
        const response = await this.$http.get(`https://apitest.burgerpizzoni.ru/api/Address/get?street=${
          this.q
        }&access_token=${
          this.$store.state.authUser.id}`);
        return response.data;
      } catch (e) {
        this.errors.address.request = 'Ошибка при получении адресов';
      }
    },
    showAddresses() {
      this.getAdresses(this.q).then((addresses) => {
        if (typeof addresses !== 'undefined') {
          this.addresses = addresses;
        }
      });
    },
  },
  computed: {
    fullAddress() {
      return `${this.deliveryInfo.Street},${this.deliveryInfo.House}`;
    },
    query: {
      set(newValue) {
        this.showAddresses();
        this.q = newValue;

        if (this.deliveryInfo.Street && this.deliveryInfo.House) {
          const addressArr = this.q.split(',');
          const house = addressArr[1];
          const street = addressArr[0];

          if (!street) {
            this.deliveryInfo = {};
            return;
          }
          if (this.addresses[street]) {
            this.deliveryInfo.House = '';
          } else if (this.addresses[street].houses.indexOf(house) < 0) {
            this.deliveryInfo.House = '';
          }
        } else if (this.deliveryInfo.Street) {
          if (this.addresses.indexOf(this.deliveryInfo.Street) < 0) {
            this.deliveryInfo.Street = '';
            this.deliveryInfo.House = '';
          }
        } else {
          this.deliveryInfo.Street = '';
          this.deliveryInfo.House = '';
        }
      },
      get() {
        if (this.deliveryInfo.Street) {
          if (this.deliveryInfo.House) {
            return this.fullAddress;
          }
          return this.deliveryInfo.Street;
        }
        return this.q;
      },
    },
  },
};
</script>

