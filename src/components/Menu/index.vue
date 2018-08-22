<template>
  <section class="menu">
    <ul class="categ-names">
      <li
        v-for="(area, i) in menu"
        :key="area.areasName"
        v-text="area.areasName"
        :class="{'active': activeArea === i}"
        @click="activeArea = i"
      />
    </ul>

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

export default {
  name: 'Menu',
  props: {
    menu: Array,
  },
  components: { Dish },
  data() {
    return {
      activeArea: 2,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

