<template>
  <div class="modal-wrapper">

    <div class="hello-message">Выберите ближайший к вам филиал</div>
    
    <div class="addresses-wrapper">
      <Spinner v-if="!addresses.length" />
      <VuePerfectScrollbar v-if="addresses.length" class="modal-scrollbar" v-once>
          <div
            v-for="addr in addresses" 
            :key="addr.Street" 
            class="radio-container"
          >
            <label class="rb-container">
              <span class="address-value">{{addr.Name}}</span>
              <br>
              <span class="address-value">{{addr.Street}}</span>
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input 
                type="radio" 
                :checked="isChecked(addr)"
                @click="address = addr"
              >
              <span class="checkmark"></span>
            </label>
          </div>
      </VuePerfectScrollbar>
    </div>
    
    <button class="selfdelivery-btn" @click="setPickupAddress">Сохранить</button>

    <!-- <div v-if="okSelfDelivery" class="thank-you-message">
        <p>Спасибо!</p>
        <p>Вы успешно оформили заказ для самовывоза.</p>
        <p>Нажмите ОК, если Вы заберёте его по адресу:</p>
        <p class="address">г. Санкт-Петербург, ул. Петрозаводская 13, кв. 48, подъезд 14, этаж 21</p>
        <p>Заказ будет готов через 30 минут</p>
        <button @click="okSelfDelivery = !okSelfDelivery">ОК</button>
    </div> -->

  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import Spinner from '@/components/Spinner';
import { actions as addressActions } from '@/modules/address';

export default {
  name: 'Pickup',
  components: { 
    VuePerfectScrollbar,
    Spinner
  },
  data() {
    return {
      addresses: [],
      address: {}
    }
  },
  mounted() {
    this.$store.dispatch(addressActions.getSelfDeliveryAddresses)
      .then(res => {
        this.addresses = res;
      });

    if (this.pickupAddress.Street) {
      this.address = this.pickupAddress;
    } 
  },
  computed: {
    pickupAddress() {
      return this.$store.getters.pickupAddress;
    }
  },
  updated() {
    console.log(this.address);
  },
  methods: {
    isChecked(addr) {
      if (addr.Street === this.address.Street)  {
        return true;
      }
      return false;
    },
    setPickupAddress() {
      if (this.address.Street) {
        this.$store.dispatch(
          addressActions.setPickupAddress, 
          this.address
        );
      }
      this.$modal.hide('delivery');
    },
  }
}
</script>

<style lang="scss">

</style>
