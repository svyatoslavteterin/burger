<template>
  <div class="modal-wrapper">

    <div class="hello-message">Выберите ближайший к вам филиал</div>
    
    <div class="addresses-wrapper">
      <VuePerfectScrollbar class="modal-scrollbar" v-once>
          <div class="radio-container">
            <label class="rb-container"><span class="address-value">Мира, 71</span>
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" checked="checked" name="radio" @click="selectAddress('test')">
              <span class="checkmark"></span>
            </label>
          </div>

          <div
            v-for="address in addresses" 
            :key="address.Street" 
            class="radio-container"
          >
            <label class="rb-container">
              <span class="address-value">{{address.Street}}</span>
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" checked="checked" name="radio" @click="selectAddress(address)">
              <span class="checkmark"></span>
            </label>
          </div>
      </VuePerfectScrollbar>
    </div>
    
    <button class="selfdelivery-btn">Сохранить</button>

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
import { actions as addressActions } from '@/modules/address';

export default {
  name: 'Pickup',
  components: { VuePerfectScrollbar },
  data() {
    return {
      addresses: []
    }
  },
  mounted() {
    this.$store.dispatch(addressActions.getSelfDeliveryAddresses)
      .then(res => {
        console.log(res)
        this.addresses = res;
      })
  },
  methods: {
    selectAddress(address) {
      console.log(address);
    }
  }
}
</script>

<style lang="scss">

</style>