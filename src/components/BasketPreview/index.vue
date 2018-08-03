<template>
  <div class="basket-block">
    <div class="triangle"></div>
    <CartItem
      v-for="(item, index) in cartItems"
      :key="index"
      :data="item"
    />
  </div>  
</template>

<script>
import CartItem from '@/components/cartitem'

export default {
  name: "BasketPreview",
  components: { CartItem },
  computed: {
    cartItems() {
      console.log(this.$store.state.cart)
      return this.$store.state.cart;
    }
  }
};
</script>

