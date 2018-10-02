<template>
  <div class="cart-preview">
    <div class="floating-top-block" v-text="'0'" />
    <div class="triangle"></div>
    <CartItem
      v-for="item in cart"
      :key="`dish-${item.id}-${item.position}`"
      :dish="item"
    />
    <div class="cart-price">
      Итого: <span v-html="$options.filters.Rub(cartSumm)"/>
    </div>
  </div>
</template>

<script>
import CartItem from './item';

export default {
  name: 'CartPreview',
  components: { CartItem },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartSumm() {
      return this.$store.getters.cartSumm;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-preview {
  display: none;
  position: absolute;
  flex-flow: column nowrap;
  border: 1px solid #CFCFCF;
  border-radius: 5px;
  right: -7.14rem;
  width: 35.7rem;
  top: 3.2rem;
  background: white;
  padding: 1.428571429rem;
  z-index: 3;

  &::after {
    position: absolute;
    display: block;
    top: -0.9rem;
    right: 10rem;
    content: '';
    background-color: white;
    border: 1px solid transparent;
    border-top-color: #CFCFCF;
    border-left-color: #CFCFCF;
    width: 1.5rem;
    height: 1.5rem;
    transform: rotateZ(45deg);
  }

  .floating-top-block {
    position: absolute !important;
    color: transparent !important;
    font-size: 0 !important;
    width: 100% !important;
    height: 1.2rem !important;
    top: -1.2rem !important;
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
