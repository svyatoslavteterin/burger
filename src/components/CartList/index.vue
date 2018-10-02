<template>
  <div>
    <ol class=cart-block>
      <List
        v-for="(item, index) in cart"
        :key="`CartListItem-${item.id}-${index+1}`"
        :categ="item"
      />
    </ol>
    <h3 class="drink-title">Рекомендуем к пицонни:</h3>
    <h3 class="">Напитки</h3>
    <!-- Напитки -->
    <div class="drinks">
      <Dish
        v-if="getDrinks"
        v-for="categ in getDrinks"
        :key="`dish-${categ.categName}`"
        :categ="categ"
        :fromCart="true"
      />
    </div>
    
    <h3 class="">Соусы</h3>
    <div class="sauces">
      <Dish
        v-if="getSauces"
        v-for="categ in getSauces"
        :key="`dish-${categ.categName}`"
        :categ="categ"
        :fromCart="true"
      />
    </div>

    <CartDeliveryPay />
    <Bonus />
  </div>

</template>
<script>
import Dish from "@/components/Dish";
import List from "@/components/CartList/list.vue";
import CartDeliveryPay from "@/components/CartDeliveryPay";
import Bonus from "@/components/Bonus";
import { actions as cartActions } from '@/modules/cart';

export default {
  name: "CartList",
  components: { Dish, List, CartDeliveryPay, Bonus },
  data() {
    return {
     
    };
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartSumm() {
      return this.$store.getters.cartSumm;
    },
    menu() {
      return this.$store.getters.menu;
    },
    getDrinks() {
      const { menu } = this.$store.getters;
      console.log(menu);
      if (menu[8]) {
        console.log(menu[8]);
        return menu[8].categs;
      }
      return false
    },
    getSauces() {
      if (this.$store.getters.menu[5]) {
        return this.$store.getters.menu[5].categs;
      }
      return false;
    }
  },
};
</script>
<style lang="scss">
@import './_styles.scss';
</style>

