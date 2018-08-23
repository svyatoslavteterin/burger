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

    <ul class="categ-items">
      <Dish
        v-for="categ in menu[activeArea].categs"
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

