<template>
  <div class="basket-block" v-if="cartItems.length">
    <div class="floating-top-block" v-text="'0'" />
    <div class="triangle"></div>
    <CartItem
      v-for="item in cartItems"
      :key="item.id"
      :data="item"
    />
    <div class="cart-price">
      Итого: <span>{{$store.getters.getCartSum}}</span>
    </div>
  </div>  
</template>

<script>
import CartItem from "./dish";

export default {
  name: "BasketPreview",
  components: { CartItem },
  computed: {
    cartItems() {
<<<<<<< HEAD
      return this.$store.state.cart;
=======
      return this.$store.state.cart.filter(item => item.count);
>>>>>>> 19727493b7a39df2768f0fc6d2b2ae7f50078667
    }
  }
};
</script>

<style lang="scss" scoped>
.basket-block {
  .floating-top-block {
    position: absolute !important;
    color: transparent !important;
    font-size: 0 !important;
    width: 100% !important;
    height: 1.2rem !important;
    top: -1.1rem !important;
    left: 0 !important;
    background-color: transparent !important;
  }
}
.cart-price {
  margin-left: auto;
  margin-top: 1rem;
  font-size: 1.35rem;

  span {
    font-size: 2rem !important;
    margin-left: 1rem;
  }
}
</style>
