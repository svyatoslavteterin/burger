<template>
  <main>
    <section id="cart">
      <div class="container">
        <div class="cart-head">
          <!-- <router-link to="/">Меню</router-link> -->
          <h1 class="cart-title">Корзина</h1>
          <div class="cart-count">
            В заказе:
            <span>
              1 блюдо
              <!-- {{ countItems }} блюда -->
              <!-- {{ pluralize(countItems, "блюдо", "блюда", "блюд") }} -->
            </span>
          </div>
        </div> <!--cart-head-->
        <Cart />
      </div> <!--container-->
    </section>
  </main>
</template>

<script>
import Cart from '@/components/Cart';
export default {
  name: 'CartPage',
  components: { Cart },
  computed: {
    // количество позиций в корзине
    countItems() {
    },
  },
};
</script>
