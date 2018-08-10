<template>
<div class="cart-head">
  <!-- <router-link to="/">Меню</router-link> -->
  <h1 class="cart-title">Корзина</h1>
  <div class="cart-count">
    В заказе: 
    <span>
      {{ countItems }} блюда
      <!-- {{ pluralize(countItems, "блюдо", "блюда", "блюд") }} -->
    </span>
  </div>
</div>
</template>
<script>
export default {
  name: "CartHead",
  methods: {
    // countItems() {
    //   console.log(this.$store.state.cart);
    //   return this.$store.state.cart.lenght;
    // }
  },
  computed: {
    //количество позиций в корзине
    countItems: function() {
      console.log(this.$store.state.cart);
      return this.$store.state.cart.length;
    }
    // pluralize: function(number, one, two, five) {
    //   let n = Math.abs(number);
    //   n %= 100;
    //   if (n >= 5 && n <= 20) {
    //     return five;
    //   }
    //   n %= 10;
    //   if (n === 1) {
    //     return one;
    //   }
    //   if (n >= 2 && n <= 4) {
    //     return two;
    //   }
    //   return five;
    // }
  }
};
</script>
