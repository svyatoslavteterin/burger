<template>
<section id="cart">
  <div class="container">
    <CartHead/>
    <ol class=cart-block>
      <CartList
        v-for="item in orderDishes"
        :key="item.id"
        :data="item"
        :dopItems="false"
      />
      <h3 class="" v-if="haveDopSection == true">Добавлено к заказу</h3>
      <CartList
        v-for="item in orderDishes"
        :key="item.id"
        :data="item"
        :dopItems="true"
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
        <label @click="getAdresses" for="">Адрес доставки</label>
      </div>
      <div class="dp-wrapper">
        <label>Способ оплаты</label>
        <div class="select-wrapper">
          <div class="arrow"></div>
          <div class="select" @click="getPaymentTypes">ieorjg</div>
          <ul class="options" >
            <li v-for="payment in getPaymentTypes" :key="`payment-${payment.id}`" v-text="payment.Descr"></li>
          </ul>
        </div>
      </div>
      <div class="dp-wrapper">
        <label @click="showAddresses" class="delivery-free-label">Доставка бесплатная!</label>
      </div>
    </div> <!--delivery-pay-block-->
    <div class="bonus-block">
      <div class="bonus-wrapper">
        <label>Бонусов на счёте: <span v-text="userBonuses"></span></label>
        <button class="finish-order" @click="checkout">Использовать всё</button>
        <input type="text" value="150" class="bonus-input" />
      </div>
      <div class="itog">
        <span class="old-price">2956 Р</span>
        <span class="itog-price">2500 P</span>
        <button class="finish-order">Оформить заказ</button>
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
  mounted() {
    console.log("props Cart: ", this.$props);
    // document.querySelector(".basket-block").style.display = "none";
  },
  data() {
    return {
      houses: [],
      query: [],
      addresses: [],
      street: "",
      house: "",
      payment: "CARD",
      payments: [],
      haveDopSection: false
    };
  },
  computed: {
    orderDishes() {
      return this.$store.state.cart;
    },
    userBonuses() {
      return this.$store.getters.getUserBonus;
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
    checkHaveDopSection() {
      for (let i = 0; i < this.orderDishes.length; i++) {
        console.log('fromDopSec ', this.orderDishes[i].fromDopSection);
        if (this.orderDishes[i].fromDopSection === true) {
          return this.haveDopSection = true;
        }
      }
      return this.haveDopSection = false;
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
          Street: this.street,
          House: this.house,
          Housing: "2",
          Structure: "3",
          Office: "4",
          Entrance: "5",
          DoorphoneСode: "6",
          Floor: "7",
          Apartment: "8",
          needOddFrom: "",
          Comments: "Комментарий к заказу"
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
    },
    getAdresses: async function() {
      try {
        let response = await this.$http.get(
          "https://apitest.burgerpizzoni.ru/api/Address/get?street=" +
            this.query +
            "&access_token=" +
            this.$store.state.authUser.id
        );
        console.log("getAdresses:", response.data);
        return response.data;
      } catch (e) {
        this.errors.address.request = "Ошибка при получении адресов";
      }
    },
    showAddresses() {
      this.getAdresses(this.query).then(addresses => {
        if (typeof addresses != "undefined") {
          console.log(addresses);
          this.addresses = addresses;
        }
      });
    }
  }
};
</script>
