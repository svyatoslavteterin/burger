<template>
  <main>

    <section class="home-header">
      <h1>БЕСПЛАТНАЯ ДОСТАВКА</h1>
      <h2>burgerpizzoni.ru</h2>
      <div>
        <Dish
          v-if="getPizzoni"
          :headdish="true"
          :categ="getPizzoni"
          :customImg="getPizzoniImg"
        />
        <Dish
          v-if="getBurger"
          :headdish="true"
          :categ="getBurger"
          :customImg="getBurgerImg"
        />
      </div>
    </section>

    <Menu
      v-if="menu.length"
      :menu="menu"
    />

  </main>
</template>

<script>
import { actions as menuActions } from '@/modules/menu';
import Menu from '@/components/Menu';
import Dish from '@/components/Dish';

import pizzoniImg from '@/assets/images/pizzoni_head.png';
import burgerImg from '@/assets/images/burger_head.png';

export default {
  name: 'Home',
  components: { Menu, Dish },
  created() {
    this.$store.dispatch(menuActions.getMenu);
  },
  computed: {
    menu() {
      return this.$store.getters.menu;
    },
    getPizzoni() {
      if (this.$store.getters.menu[2]) {
        return this.$store.getters.menu[2].categs[3];
      }
      return false;
    },
    getBurger() {
      if (this.$store.getters.menu[3]) {
        return this.$store.getters.menu[3].categs[0];
      }
      return false;
    },
    getPizzoniImg() {
      return pizzoniImg;
    },
    getBurgerImg() {
      return burgerImg;
    },
  },
};
</script>

<style lang="scss">
.home-header {
  height: 90vh;
  background: url('../../assets/images/bgr_head.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 3.57rem;
  margin-bottom: 2rem;

  h1 {
    width: 100%;
    text-align: center;
    font-size: 2.5rem;
    color: black;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.142857143rem;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: normal;
    width: 100%;
    text-align: center;
    margin-top: 0.25rem;
    letter-spacing: 0.142857143rem;
  }
}
</style>

