<template>
  <main>
    <section id="cart">
      <div class="container">
        <div class="cart-head">
          <!-- <router-link to="/">Меню</router-link> -->
          <h1 class="cart-title">Корзина</h1>
          <div class="cart-count">
            В заказе:
            <span v-text="`${countCart} ${pluralize(countItems, "блюдо", "блюда", "блюд") }`" />
          </div>
        </div> <!--cart-head-->
        <Cart />
      </div> <!--container-->
    </section>
  </main>
</template>

<script>
import CartList from '@/components/CartList';

export default {
  name: 'Cart',
  components: { CartList },
  computed: {
    countCart() {
      return this.$store.getters.cart.length;
    },
    pluralize() {
      return 'блюдо'
    }
  },
};
</script>
