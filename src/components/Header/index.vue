<template>

  <header>

    <router-link to="/" class="logo">
      <img src="@/assets/images/logo.svg" alt="Burger&Pizzoni">
    </router-link>

    <a class="phone" href="tel:8(800)250-80-70">
      <b>8&nbsp;(800)&nbsp;250-80-70</b>
      <br>
      <span>звонок бесплатный</span>
    </a>

    <div class="cart-info" >
      <span class="cart-info__summ" v-html="$options.filters.Rub(cartSumm)" />

      <div class="cart-info__preview">
        <router-link to="/cart" class="cart-info__preview__link">корзина</router-link>
        <CartPreview v-if="cartSumm" />
      </div>

      <div class="cart-info__user">
        <button class="login">войти</button>
      </div>
    </div>

  </header>

</template>

<script>
import CartPreview from '@/components/CartPreview';

export default {
  name: 'Header',
  components: { CartPreview },
  computed: {
    cartSumm() {
      return this.$store.getters.cartSumm;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  padding: 0.25vw 10vw 0.125vw;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 3;

  .logo {
    width: 27%;
  }

  .phone {
    text-decoration: none !important;
    color: black;

    b {
      font-size: 1.8rem;
    }

    span {
      width: 100%;
      display: block;
      text-align: center;
      text-transform: uppercase;
    }
  }

  .cart-info {
    width: 27%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    &__summ {
      font-size: 1.7rem;
      width: 100%;
      text-align: center;
    }

    &__preview {
      position: relative;

      &:hover {
        & > div {
          display: flex;
        }
      }

      &__link {
        font-size: 1.1rem;
        background: #ffd60f;
        text-transform: uppercase;
        text-decoration: none;
        color: black;
        padding: 0.95rem 1.4rem;
        font-weight: bold;
        border-radius: 7px;
        margin-left: 0.75rem;
      }
    }

    &__user {
      margin-left: 2.5rem;

      .login {
        font-size: 1.2rem;
        text-transform: uppercase;
        text-decoration: none;
        background: none;
        outline: none;
        border: none;
        border-bottom: 2px solid #ffd60f;
        cursor: pointer;
      }
    }
  }
}
</style>

