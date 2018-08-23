<template>
  <section class="menu">

    <div class="menu-header">

      <Search />

      <ul class="menu-header__categ-names">
        <li
          v-for="(area, i) in menu"
          :key="area.areasName"
          v-text="area.areasName"
          :class="{'active': activeArea === i}"
          @click="activeArea = i"

        />
      </ul>
    </div>

    <ul
      v-for="(area, i) in menu"
      :key="area.id"
      class="categ-items"
      v-show="activeArea === i"
    >
      <Dish
        v-for="categ in area.categs"
        :key="`dish-${categ.categName}`"
        :categ="categ"
      />
    </ul>

  </section>
</template>

<script>
import Dish from '@/components/Dish';
import Search from './search';

export default {
  name: 'Menu',
  props: {
    menu: Array,
  },
  components: { Dish, Search },
  data() {
    return {
      activeArea: 2,
    };
  },
  // watch() {
  //   const nav = document.querySelector('.menu-header__categ-names');
  //   console.log(nav);
  // },
  computed: {
    filterDishes() {
      return this.$store.getters.filterDishes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

