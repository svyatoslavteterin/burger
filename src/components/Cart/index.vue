<template>
<section id="cart">
  <div class="container">
    <CartHead/>
    <ol class=cart-block>
      <CartList
        v-for="item in orderDishes"
        :key="`CartListItem-${item.id}`"
        :data="item"
      />
    </ol>
    <h3 class="drink-title">Рекомендуем к пицонни:</h3>
    <h3 class="">Напитки</h3>
    <!-- Напитки -->
    <cartFood :foods="menu[8].categs"></cartFood>
    <h3 class="">Соусы</h3>
    <cartFood :foods="menu[5].categs" :showWeight="true"></cartFood>
    <div class="delivery-pay-block">
      <div class="dp-wrapper">
        <label  for="">Адрес доставки</label>
        <div class="select-wrapper">
          <div class="arrow"></div>
          <div class="select" @click="showAddresses = !showAddresses">доставка</div>
          <ul class="options" v-if="showAddresses">
            <li
              v-for="address in addressesList"
              :key="`payment-${address.id}`"
              v-text="address.Street"
              @click="setPayment(payment.Name)"
            />
          </ul>
        </div>
        <span v-text="getAdresses"></span>
      </div>
      <div class="dp-wrapper">
        <label>Способ оплаты</label>
        <div class="select-wrapper">
          <div class="arrow"></div>
          <div class="select" @click="showPayments = !showPayments">{{getPaymentTypes[paymentIndex].Descr}}</div>
          <ul class="options" v-if="showPayments">
            <li
              v-for="(payment, index) in getPaymentTypes"
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
    <div class="bonus-block">
      <div class="bonus-wrapper">
        <label>Бонусов на счёте: <span v-text="userBonuses"></span></label>
        <button class="finish-order" @click="checkout">Использовать всё</button>
        <input type="text" v-model.number="userBonus" @keyup="checkMaxBonus" class="bonus-input" />
      </div>
      <div class="itog" v-if="userAuthorized">
        <!-- <span class="old-price">2956 Р</span> -->
        <span class="itog-price" v-text="this.$store.getters.getCartSum"></span>
        <button class="finish-order" @click="checkout">Оформить заказ</button>
      </div>
      <div class="itog" v-else>
        <button class="finish-order" @click.prevent="$modal.show('auth')">Авторизоваться</button>
      </div>
    </div>
  </div> <!--container-->
</section>
</template>
<script>
import CartHead from "./cart-head.vue";
import CartList from "./cart-list.vue";
import cartFood from "@/components/cartFood";
import "./style.scss";

export default {
  name: "Cart",
  components: { CartHead, CartList, cartFood },
  mounted() {},
  data() {
    return {
      houses: [],
      query: [],
      addresses: [],
      street: "",
      house: "",
      payment: "CARD",
      paymentIndex: 0,
      showPayments: false,
      showAddresses: false,
      selectedAddress: {},
      addressesList: this.$store.state.authUser.addressList || [],
      payments: this.getPaymentTypes,
      haveDopSection: false,
      userBonus: this.$store.getters.getUserBonus || 0
    };
  },
  computed: {
    userAuthorized() {
      const user = this.$store.state.authUser;
      console.log(user);
      return Object.keys(user).length ? true : false;
    },
    orderDishes() {
      return this.$store.getters.getCart;
    },
    userBonuses() {
      return this.$store.getters.getUserBonus;
    },
    getAdresses() {
      let address = this.$store.state.deliveryInfo;
      if (Object.keys(address).length === 0 && address.constructor === Object) {
        return false;
      } else {
        return `${address.Street},${address.House} кв ${address.Apartment}`;
      }
    }
  },
  props: ["foods", "menu"],
  asyncComputed: {
    getPaymentTypes() {
      return this.$http
        .get("https://apitest.burgerpizzoni.ru/api/Agents/getPayTypes")
        .then(response => response.data)
        .catch(() => {
          this.errors.payment.request = "Ошибка при получении вариантов оплат";
        });
    }
  },
  updated: function() {
    this.checkHaveDopSection();
  },
  methods: {
    checkMaxBonus() {
      console.log("bonuses", this.userBonus, this.userBonuses);
      return this.userBonus > this.userBonuses
        ? (this.userBonus = this.userBonuses)
        : true;
    },
    setPayment(paymentName, index) {
      this.payment = paymentName;
      this.paymentIndex = index;
      this.showPayments = false;
      console.log(this.payment);
    },
    checkHaveDopSection() {
      for (let i = 0; i < this.orderDishes.length; i++) {
        if (this.orderDishes[i].fromDopSection === true) {
          return (this.haveDopSection = true);
        }
      }
      return (this.haveDopSection = false);
    },

    clear: function() {
      this.$store.commit("clearCart");
    },

    sendOrder: async function(order) {
      try {
        let response = await this.$http.post(
          "https://apitest.burgerpizzoni.ru/api/Orders/newOrder?access_token=" +
            this.$store.state.authUser.id,
          order
        );
        return response.data;
      } catch (e) {
        this.errors.checkout.request = "Ошибка при чекауте";
      }
    },
    checkout() {
      let dishes = [];
      let cartSum = 0;
      this.$store.state.cart.forEach(item => {
        let itemPrice = +item.price;
        if (item.mods.length > 0) {
          item.mods.forEach(mod => {
            itemPrice += +mod.summ;
          });
        }
        cartSum += itemPrice * item.count;
      });

      let user = {
        Username: this.$store.state.authUser.userInfo.username,
        id_Mongo: this.$store.state.authUser.id,
        Bonus: this.$store.state.authUser.userInfo.Bonus,
        id: this.$store.state.authUser.userId,
        FirstName: this.$store.state.authUser.userInfo.FirstName,
        Phone: this.$store.state.authUser.userInfo.Phone,
        LastName: this.$store.state.authUser.userInfo.Lastname,
        MiddleName: this.$store.state.authUser.userInfo.MiddleName,
        Mail: this.$store.state.authUser.userInfo.Mail,
        PersonalPercentBonus: this.$store.state.authUser.userInfo
          .PersonalPercentBonus,
        id_Cause: 0
      };

      let order = {
        dishes: dishes,
        summ: cartSum,
        user: user,
        customerName: user.FirstName,
        status: "checked",
        address: {
          Street: this.selectedAddress.Street,
          House: this.selectedAddress.House,
          Housing: this.selectedAddress.Housing,
          Structure: this.selectedAddress.Structure,
          Office: this.selectedAddress.Office,
          Entrance: this.selectedAddress.Entrance,
          DoorphoneСode: this.selectedAddress.DoorphoneСode,
          Floor: this.selectedAddress.Floor,
          Apartment: this.selectedAddress.Apartment,
          needOddFrom: "",
          Comments: ""
        },
        bonusByOrder: 97,
        paymentInfo: {
          payment: {
            summ: cartSum,
            orderSumm: cartSum,
            bonusSumm: 0,
            odd: 0,
            type: this.payment,
            hybrid: {
              step: 0,
              cash: 0,
              card: {
                type: "",
                summ: 0
              }
            }
          }
        }
      };
      this.sendOrder(order).then(response => {
        let orderId = response;

        if (this.payment == "CARD") {
          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          this.$http
            .get(
              proxyurl +
                "https://3dsec.sberbank.ru/payment/rest/register.do?amount=" +
                cartSum * 100 +
                "&currency=643&language=ru&orderNumber=" +
                orderId +
                "&userName=burgerpizzoni-api&password=burgerpizzoni&pageView=DESKTOP&merchantLogin=burgerpizzoni&returnUrl=https://apitest.burgerpizzoni.ru/api/Acquirings/paymentSuccess"
            )
            .then(res => {
              this.clear();
              window.location.href = res.data.formUrl;
            });
        }
      });
    }
  }
};
</script>
