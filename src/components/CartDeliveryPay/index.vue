<template>
  <div class="delivery-pay-block">
    <div class="dp-wrapper">
      <label  for="">Адрес доставки</label>
      <div class="select-wrapper">
        <div class="arrow"></div>
        <div class="select" @click="showAddresses = !showAddresses" v-text="beautyAddress"></div>
        <ul class="options" v-if="showAddresses">
          <li v-if="getAdresses.length > 0"><b>Доставка</b></li>
          <li
            v-for="address in getAdresses"
            :key="`address-${address.id}`"
            v-text="displayAddress(address)"
            @click="setAddress(address)"
          />
          <li><b>Самовывоз</b></li>
          <li
            v-for="selfAddress in selfDeliveryAddress"
            :key="`selfAddress-${selfAddress.id}`"
            v-text="displayAddress(selfAddress)"
            @click="setAddress(selfAddress)"
          />
        </ul>
      </div>
      <button v-if="getAdresses.length <= 0" class="add-delivery" @click="$modal.show('delivery')">Выберите адрес</button>
    </div>
    <div class="dp-wrapper">
      <label>Способ оплаты</label>
      <div class="select-wrapper">
        <div class="arrow" @click="showPayments = !showPayments"></div>
        <div class="select" @click="showPayments = !showPayments">{{payments[0].Descr}}</div>
        <ul class="options" v-if="showPayments">
          <li
            v-for="(payment, index) in payments"
            :key="`payment-${payment.id}`"
            v-text="payment.Descr"
            @click="setPayment(payment.Name, index)"
          />
        </ul>
      </div>
    </div>
    <div class="dp-wrapper">
      <label  class="delivery-free-label">Доставка бесплатная!</label>
    </div>
  </div> <!--delivery-pay-block-->
</template>
<script>
import { actions as addressActions } from '@/modules/address';
import { actions as paymentActions } from '@/modules/payment';
import DeliveryForm from "@/components/DeliveryForm";

export default {
  name: "CartDeliveryPay",
  components: { DeliveryForm },
  data() {
    return {
      showPayments: false,
      showAddresses: false,
      selectedAddress: {},
      selfDeliveryAddress: [],
      payments: [{Descr: "Картой"}],
      beautyAddress: "Адрес доставки"
    };
  },
  mounted() {
    this.$store.dispatch(addressActions.getSelfDeliveryAddresses)
      .then(res => {
        this.selfDeliveryAddress = res;
      });
    this.$store.dispatch(paymentActions.getPayTypes)
      .then(res => {
        this.payments = res;
      });
  },
  computed: {
    getAdresses() {
      let savedAddresses = [];
      const deliveryAddress = this.$store.getters.addressBeforeLogin;
      if (Object.keys(deliveryAddress).length) {
        savedAddresses.unshift(deliveryAddress);
      }
      return savedAddresses;
    },
  },
  methods: {
    setAddress(address) {
      this.selectedAddress = address;
      this.showAddresses = false;
      this.beautyAddress = this.displayAddress(address);
    },
    displayAddress(address) {
      let beautyAddress = "";
      for (const key in address) {
        switch (key) {
          case "Street":
            if (address[key] != "") {
              beautyAddress += address[key] + " ";
            }
            break;
          case "House":
            if (address[key] != "") {
              beautyAddress += "д." + address[key] + " ";
            }
            break;
          case "Housing":
            if (address[key] != "") {
              beautyAddress += "корп." + address[key] + " ";
            }
            break;
          case "Structure":
            if (address[key] != "") {
              beautyAddress += "стр." + address[key] + " ";
            }
            break;
          case "Office":
            if (address[key] != "") {
              beautyAddress += "оф." + address[key] + " ";
            }
            break;
          case "Entrance":
            if (address[key] != "") {
              beautyAddress += "под." + address[key] + " ";
            }
            break;
          case "Floor":
            if (address[key] != "") {
              beautyAddress += "эт." + address[key] + " ";
            }
            break;
          case "Apartment":
            if (address[key] != "") {
              beautyAddress += "кв." + address[key] + " ";
            }
            break;
          default:
            break;
        }
      }
      return beautyAddress;
    },
  }
}
</script>

